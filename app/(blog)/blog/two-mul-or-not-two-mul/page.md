---
author:
 name: Egon Elbre
date: '2025-02-28 00:00:00'
heroimage: ./gopher-math.jpeg
layout: blog
metadata:
 description: "Low level optimizations are tricky and sometimes unintuitive.
 We'll take a look at a story of optimizing ed25519 signing and verification."
 title: "Two mul or not two mul: how I found a 20% improvement in ed25519 in golang"
title: "Two mul or not two mul: how I found a 20% improvement in ed25519 in golang"
---

One of the heavy CPU uses in the Storj network is Edwards 25519 signature scheme.
Downloading and uploading data needs to send signed messages from Satellite (server)
to the Storage Node (computers holding data). The signing ensures that the messages
aren't tampered with. Hence, the Satellite needs to do a lot of signing and verification;
the same goes for Uplink (client application) and Storage Node.
Full details of the protocol can be read in the [whitepaper](https://storj.io/storjv3.pdf),
but it's not that relevant to this optimization story.


## Profiling

After profiling signing and verifying, I landed in [edwards25519/field](https://github.com/golang/go/blob/4a3cef2036097d323b6cc0bbe90fc4d8c7588660/src/crypto/internal/fips140/edwards25519/field/fe_generic.go#L34).

The code implements multiplication over field elements. For our optimization
purposes, you can think of field element as a large number represented as:

```
a0 + a1*2^51 + a2*2^(51*2) + a3*2^(51*3) + a4*2^(51*4)
```

For the multiplication there are helpful diagrams directly in the source code:

```
                       a4   a3   a2   a1   a0  x
                       b4   b3   b2   b1   b0  =
                      ------------------------
                     a4b0 a3b0 a2b0 a1b0 a0b0  +
                a4b1 a3b1 a2b1 a1b1 a0b1       +
           a4b2 a3b2 a2b2 a1b2 a0b2            +
      a4b3 a3b3 a2b3 a1b3 a0b3                 +
 a4b4 a3b4 a2b4 a1b4 a0b4                      =
----------------------------------------------
   r8   r7   r6   r5   r4   r3   r2   r1   r0
```

After simplifying these, you end up with a computation:

```
a4b0    a3b0    a2b0    a1b0    a0b0  +
a3b1    a2b1    a1b1    a0b1 19×a4b1  +
a2b2    a1b2    a0b2 19×a4b2 19×a3b2  +
a1b3    a0b3 19×a4b3 19×a3b3 19×a2b3  +
a0b4 19×a4b4 19×a3b4 19×a2b4 19×a1b4  =
-------------------------------------
  r4      r3      r2      r1      r0
```

So you would compute the new `r0` value as (ignoring carry-over):

```
r0 := a0×b0 + 19×a1×b4 + 19×a2×b3 + 19×a3×b2 + 19×a4×b1
```

Which in code looks like:

```
a1_19 := a1 * 19
a2_19 := a2 * 19
a3_19 := a3 * 19
a4_19 := a4 * 19

r0 := mul64(a0, b0)
r0 = addMul64(r0, a1_19, b4)
...
```


## Optimizing

There seemed some amount of performance possible; some inlining, some reordering
of the operation chains, but one thing caught my eye while comparing assembly
between AMD64 and ARM64. The multiplication by 19.

```
func mul19(x uint64) uint64 {
    return x * 19
}

// arm64
MOVD    $19, R1
MUL     R1, R0, R0

// amd64
LEAQ    (AX)(AX*8), CX
LEAQ    (AX)(CX*2), AX
```

_Helpful tools for examining assembly are [godbolt](https://go.godbolt.org/z/cTa3cq16z),
[lensm](docId:lensm) and [objdump](https://pkg.go.dev/cmd/objdump)._

For arm64, the code looks obvious; take two numbers and then multiply them.
However, for amd64 it's less so. If you are wondering, `LEAQ` instruction allows
to do a computation `LEAQ (Base)(Offset*Scale), Result`, which is equivalent to `Result := Base + Offset * Scale`.
It's really helpful for indexing into arrays and sometimes to do an `x + y * k` operation.

If you decipher the amd64 code you end up with:

```
func mul19(x uint64) uint64 {
    return x + (x + x * 8) * 2
}

// which is equivalent to
func mul19(x uint64) uint64 {
    return x + (x + x<<3)<<1
}
```

At the time I was thinking, "Oh, just some optimization rules are missing from the arm64
backend." I'll test how this optimization affects things by manually replacing the 
`x * 19` with `mul19`:

```
func mul19(v uint64) uint64 {
	return v + (v+v<<3)<<1
}

...
r0 = addMul64(r0, mul19(a1), b4)
r0 = addMul64(r0, mul19(a2), b3)
```

I also removed the initial caching of `a1 * 19` values as well to reduce register usage,
which seemed to help as well. And I got these results:

```
pkg: filippo.io/edwards25519/field
           │     OLD     │                NEW                 │
           │   sec/op    │   sec/op     vs base               │
Add-4        43.05n ± 0%   43.34n ± 0%  +0.69% (p=0.000 n=10)
Multiply-4   432.9n ± 0%   419.5n ± 0%  -3.10% (p=0.000 n=10)
Square-4     277.9n ± 0%   259.3n ± 0%  -6.68% (p=0.000 n=10)
Invert-4     76.01µ ± 0%   71.93µ ± 0%  -5.36% (p=0.000 n=10)
Mult32-4     68.66n ± 0%   68.64n ± 0%       ~ (p=0.928 n=10)
geomean      485.7n        471.4n       -2.94%
```

Great, 3-6% improvement to multiplication, squaring and inverting on Mac M1.

I did a bunch of other optimizations, which overall resulted in a ~20% improvement for
arm64. Of course, one thing did bother me before trying to get things merged -- the
compiler should have done the `*19` optimization, not me.

## Trying to optimize the compiler

I thought about the optimization a bit to generalize it; some general rules
for converting multiplication into additions and shifts.

For example:

```
x * c, where
    c = 1 + 2^N + 2^(N+M), N != M;
    N > 1, M > 1

Then the multiplication can be rewritten as:
    x + (x + x << M) << N

This can be checked with:
    (c-1)&1 == 0 && bits.OnesCount(c - 1) == 2

Which holds for numbers like:
    7, 11, 13, 19, 21, 25, 35, 37, 41, 49, 67, 69, 73, 81, 97, 131, 133, 137, 145, 161, 193...
```

There's another variant of it:

```
x * c, where
    c = 1 + 2^N + 2^M + 2^(N+M), N < M
    N > 1  // not sure whether this restriction is necessary

Then the multiplication can be rewritten as:
    x = x + x<<N; x = x + x<<M

This can be checked with:
    (c-1)&1 == 0 && bits.OnesCount(c - 1) == 3 && highbit - lowbit == midbit

Which holds for numbers like:
    15, 23, 27, 29, 39, 43, 51, 53, 57, 71, 75, 83, 89, 99, 101, 135, 139, 147, 163, 169, 177, 195...
```

And additionally:

```
c = 1 + 2^H - 2^L, where L < H
  => (x + x<<L) - x<<H

c = 2^H - 2^L, where L < H
  => (x<<L) - x<<H

c = 2^L + 2^H, where L < H
  => (x<<L) + x<<H
```

So, I created an issue report and discuss things further in [Go Issue 67575](https://github.com/golang/go/issues/67575).

It did seem like a trivial optimization at this point, however, then Erifan and Randall
pointed out that they are not really seeing the performance improvements. Also, that the
cost of the shift operation can depend on the size of the shift.

I did a quick benchmark myself by testing these functions:

```
TEXT ·Mul19(SB),0,$0-0
	MOVD	$65536, R2
	MOVD	$218643, R0
loop:
	MOVD    $19, R1
	MUL     R1, R0, R0
	SUB	$1, R2, R2
	CBNZ	R2, loop
	RET

TEXT ·Mul19shift(SB),0,$0-0
	MOVD	$65536, R2
	MOVD	$218643, R0
loop:
	ADD	R0<<3, R0, R1
	ADD	R1<<1, R0, R0
	SUB	$1, R2, R2
	CBNZ	R2, loop
	RET
```

And got these results:

```
Mac M1:
    Mul19-10        61.14µ ± 1%
    Mul19shift-10   81.64µ ± 1%

RPi4:
    Mul19-4        218.8µ ± 0%
    Mul19shift-4   175.1µ ± 3%
```

Which is annoying. On one ARM device, multiplication is faster and on the other,
shifting and adding. And there isn't a really nice way to conditionalize
per target CPU in the `gc` compiler.

After discussing this optimization, it seemed like a good idea to leave the
multiplication as is for now. You can still do the replacement manually, when
it matters for your specific platform and application.

## But, wait? It did help before!

The manual `*19` optimization to ed25519 helped the performance by a significant
margin and on both platforms. What gives?

One thing to notice about the ed25519 code is that it's quite heavy on multiplication already.
This got me thinking about: how many instructions can you do in parallel.

_One amazing collection of suggestions for low-level optimizations are [Agner Fog's resources](https://www.agner.org/optimize/)._

There are three main considerations on how many instructions we can do in parallel:

* Are we waiting for data from RAM or caches to arrive.
* Whether there are dependency chains.
* Which instructions can be done in parallel.

Waiting data from RAM is the obvious thing. If we don't have data, we cannot
calculate things.

The second idea is dependency chains. When a calculation takes 3 cycles and another
instruction needs to wait for the result, then they cannot run in parallel.

A trivial example would be the difference between:

```
r := x * y
r = r * z // needs to wait for `r`
r = r * w // needs to wait for `r`

vs.

u := x * y
v := z * w
r := u * v // needs to wait for `u` and `v`
```

In practice, of course, this kind of reordering may not help, because the compilers
are quite clever; and similarly the CPUs are clever and may reorder things to be better.

And the third is, how many ops can we do in parallel on a single core? Every modern core
has multiple execution units. The execution units aren't equal either; there are two or
more integer units, one or two floating-point addition units, and one or two
floating-point multiplication units. So, you can perform an integer addition, a
floating-point addition, and a floating-point multiplication at the same time. Of course,
the internal details of cores can vary wildly. See more details in
[Optimizing C++ by Agner Fog](https://www.agner.org/optimize/optimizing_cpp.pdf).

I didn't measure exactly which execution units were overwhelmed and which ones weren't;
either way -- we got a performance improvement.

## Back to the original plan

After all of this, the original changes were already a good solution.

I redid my optimizations and benchmarked on different platforms. And roughly
ended up with ~20% total improvement on ARM64 and ~8% amd64. Of course your results
may vary depending on your CPU.

These improvements will be coming to you soon; in Go 1.25.

_For future work, there are additional optimizations possible. For example, there are also AVX2 and AVX512 implementations that perform better._
