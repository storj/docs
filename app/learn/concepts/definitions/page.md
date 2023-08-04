---
title: Definitions
docId: zdT8t_UAROwruiARiquHr
redirects:
  - /dcs/concepts/definitions
---

The Storj DCS service uses an array of different technologies such as strong encryption and erasure codes to ensure a differentiated level of privacy and security across a network of peer classes. Some of the terms we use may be familiar and some may be new, but if you see a word you don't recognize or see a familiar word in a different context, you'll probably find a useful definition here:

1.  **Peer Class** A cohesive collection of network services and responsibilities. There are three different peer classes that represent services in our network: storage nodes, Uplinks, and Satellites.

2.  **Storage Node** This peer class stores data for others, and gets paid for storage and bandwidth. All data stored on storage nodes is client-side encrypted and erasure coded.

3.  **Uplink** This peer class represents any application or service that implements libuplink and stores and/or retrieves data. This peer class is not necessarily expected to remain online like the other two classes and is relatively lightweight. This peer class performs encryption, erasure encoding, and coordinates with the other peer classes on behalf of the customer/client. Object data stored by the Uplink client is encrypted by the Uplink client, including metadata.

    1.  **Libuplink** A library which provides all necessary functions to interact with storage nodes and Satellites directly. This library will be available in a number of different programming languages.

    2.  **Gateway** A service which provides a compatibility layer between other object storage services such as Amazon S3 and libuplink exposing an Amazon S3-compatible API.

        1.  **Gateway ST -** a single-tenant, self-hosted S3-compatible gateway service provided as part of the Storj DCS developer tools/SDK

        2.  **Gateway MT** **-** a multi-tenant, multi-region, cloud-hosted S3-compatible gateway service provided as part of the Storj DCS service. We consider this service server-side encrypted instead of end-to-end encrypted because this service temporarily manages encryption for you. While more complex, this can be run on your own infrastructure.

        3.  **Linksharing/webhosting -** a gateway for standard HTTP requests, so you can share objects with users via a web browser or even host full websites. This can also be run on your own infrastructure if preferred.

    3.  **Uplink** **CLI** A command line interface for uploading and downloading files from the network, managing permissions and sharing, and managing accounts.

4.  **Satellite** - A peer class and one of the primary components of the Storj network. The satellite participates in the node discovery system, caches node address information, stores per-object metadata, maintains storage node reputation, aggregates billing data, pays storage nodes, performs audits and repair, and manages authorization and user accounts. Users have accounts on and trust specific Satellites. Any user can run their own Satellite, but we expect many users to elect to avoid the operational complexity and create an account on another Satellite hosted by a trusted third party such as Storj Labs, a friend, group, or workplace. Storj Labs satellites are operated under the Storj DCS brand. This component has a couple of main responsibilities:&#x20;

    1.  developer account registration & management,&#x20;

    2.  API credential & access management,&#x20;

    3.  billing & payment,&#x20;

    4.  audit & repair,

    5.  garbage collection & other chores.

5.  **Satellite Developer Account** - Basic information about users is stored and used to allow users to access Storj DCS. User account data includes user name, email, password, and payment methods. User account data is not client-side encrypted so that it may be rendered in the satellite user interface.

6.  **Strong Encryption** - a strong encryption algorithm is one that can guarantee the confidentiality of sensitive data. The time and cost of the compute resources required to decrypt data encrypted via a strong encryption method is either not possible, feasible, or economically justifiable, within the usable lifespan of the data.

7.  **Weak Encryption** - a weak encryption algorithm is one that cannot guarantee the confidentiality of sensitive data. Antiquated encryption algorithms such as DES (or even 3DES) no longer provide sufficient protection for use with sensitive data. Encryption algorithms rely on key size as one of the primary mechanisms to ensure cryptographic strength. Cryptographic strength is often measured by the time and computational power needed to generate a valid key. Advances in computing power and cryptanalytic techniques have made it possible to obtain small encryption keys in a reasonable amount of time. For example, the 56-bit key used in DES posed a significant computational hurdle in the 1970s when the algorithm was first developed, but today DES can be cracked in less than a day using commonly available equipment.

8.  **Backdoor** - A backdoor refers to any method by which authorized and unauthorized users are able to get around normal security measures and gain high level user access (aka root access) on a computer system, network or software application.&#x20;

9.  **Open-source** - Open source software is software with source code that anyone can inspect, modify, and enhance.

10. **Privacy Policy** - A privacy policy is a statement or a legal document that discloses some or all of the ways a party gathers, uses, discloses, and manages a customer or client's data. Personal information can be anything that can be used to identify an individual, not limited to the person's name, address, date of birth, marital status, contact information, ID issue, and expiry date, financial records, credit information, medical history, where one travels, and intentions to acquire goods and services. It is often a statement that declares a party's policy on how it collects, stores, and releases personal information it collects. It informs the user what specific information is collected, and whether it is kept confidential, shared with partners, or sold to other firms or enterprises. Privacy policies typically represent a broader, more generalized treatment, as opposed to data use statements, which tend to be more detailed and specific.

11. **Data Element Definitions** - Object data stored on the network is structured in a way that maps to constructs consistent with traditional object storage generally, with aspects that also include attributes adapted to the distributed storage model.&#x20;

    1.  **Project** - A project is the basic unit for aggregating usage, calculating billing, invoicing fees, and collecting payment. Currently, user accounts are limited to a handful of Projects by default, but users can request and pay for more. Multiple users may be added to a project team. Within a Project, usage is tracked at the bucket level and aggregated for invoicing to the project. Project names are not client-side encrypted so that they may be rendered in the satellite user interface.

    2.  **Bucket** - A bucket is an unbounded but named collection of files identified by paths. Every object has a unique object key (or path) within a bucket. Bucket names are not client-side encrypted so that they may be rendered in the satellite user interface.

    3.  **Object Key (or Path)** - An object key is a unique identifier for an object (or file) within a bucket. An object key is an arbitrary string of bytes. Object keys contain forward slashes at access control boundaries. Forward slashes (referred to as the path separator) separate path components. An example path might be videos/carlsagan/gloriousdawn.mp4, where the path components are videos, carlsagan, and gloriousdawn.mp4. Object keys are client-side encrypted.

    4.  **Object or file** - An object (or file) is the main data type in our system. An object is referred to by an object key, contains an arbitrary amount of bytes, and has no minimum or maximum size. An object is represented by an ordered collection of one or more segments. Segments have a fixed maximum size. An object also supports a limited amount of key/value user- defined fields in which to store user metadata. Like object keys, the object data is client-side encrypted.

    5.  **Segment** - A segment represents a single array of bytes, between 0 and a system-configurable maximum segment size. The max Segment size on Storj DCS Satellites is 64MB. An object smaller than 64MB is stored as one segment. Objects larger than 64MB are stored in multiple 64MB Segments. Each Segment is stored as 80 pieces on the network. Only 29 Pieces of the 80 are required to reconstitute a Segment. All Segments are required to reconstitute an Object. Segment data is client-side encrypted.

        1.  **Remote Segment** - A remote segment is a segment that will be erasure encoded and distributed across the network. A remote segment is larger than the metadata required to keep track of its bookkeeping, which includes information such as the IDs of the nodes that the data is stored on. Remote segment data is client-side encrypted.

        2.  **Inline Segment** - An inline segment is a segment that is small enough where the data it represents takes less space than the corresponding data a remote segment will need to keep track of which nodes had the data. In these cases, the data is stored “inline” instead of being stored on nodes. Inline segment data is client-side encrypted.

    6.  **Stripe** - A stripe is a further subdivision of a segment. A stripe is a fixed amount of bytes that is used as an encryption and erasure encoding boundary size. Erasure encoding happens on stripes individually, whereas encryption may happen on a small multiple of stripes at a time. All segments are encrypted, but only remote segments erasure encode stripes. A stripe is the unit on which audits are performed. See whitepaper section 4.8.3 for more details. Stripe data is client-side encrypted.

    7.  **Erasure Share** - When a stripe is erasure encoded, it generates multiple pieces called erasure shares. Only a subset of the erasure shares is needed to recover the original stripe. Each erasure share has an index identifying which erasure share it is (e.g., the first, the second, etc.). Data is client-side encrypted before it is erasure coded into erasure shares.

    8.  **Piece** - When a remote segment’s stripes are erasure encoded into erasure shares, the erasure shares for that remote segment with the same index are concatenated together, and that concatenated group of erasure shares is called a piece. If there are _n_ erasure shares after erasure encoding a stripe, then there are _n_ pieces after processing a remote segment. The \_i_th piece is the concatenation of all of the \_i_th erasure shares from that segment’s stripes. See whitepaper section 4.8.5 for more details. Pieces are client-side encrypted before they are erasure coded into erasure shares.

    9.  **Metadata** - Metadata is data that is stored about the objects stored on the service. Metadata includes object key data, pointer data, the encrypted per-object randomized salted encryption key-related data, and user-defined metadata. Metadata is client-side encrypted.

    10. **Pointer** - A pointer is a subset of metadata that is data structure that either contains the inline segment data, or keeps track of which storage nodes the pieces of a remote segment were stored on, along with other per-file metadata. Pointer data is not client side encrypted, so that a Satellite can repair a segment and replace the location of pieces.

12. **Erasure Code Definitions** - Data redundancy on the network is achieved using erasure codes. Erasure coding is a means of data protection in which data is broken into pieces, where each piece is expanded and encoded with redundant data. The pieces are then stored across a set of different storage locations to reduce the risk of data loss due to the loss of any one data location.&#x20;

    1.  **Erasure Code Ratio** - An erasure code is often described as a ratio of two numbers, _k_ and _n_. If a block of data is encoded with a _k_, _n_ erasure code, there are _n_ total generated erasure shares, where only any _k_ of them are required to recover the original block of data! It doesn’t matter if you recover all of the even numbered shares, all of the odd numbered shares, the first _k_ shares, the last _k_ shares, whatever. Any _k_ shares can recover the original block.

    2.  **Expansion Factor** - The amount of extra data stored to achieve redundancy based on achievement of a target durability. Expansion factor for a durability measurement achieved via erasure codes is calculated by dividing _n_ by _k_. Expansion factor for a durability measurement achieved via replication is calculated by multiplying the number of replicas by 100%. At any given expansion factor, erasure codes have a significantly higher durability than replication.

    3.  **Erasure Code Variables**

        1.  **\*k\*\*\*** = 29\*\* – This is the number of pieces required to recreate a Segment. Any 29 of the pieces of a Segment can be used to reconstitute a Segment

        2.  **\*l\*\*\*** = 39\*\* – This is the number of pieces an Uplink will attempt to download when downloading a Segment. The Uplink will cut off any piece downloads after 29 pieces have been downloaded. The Uplink attempts to download more pieces than needed to eliminate the long tail effect of dependency on the slowest Storage Node.

        3.  **\*m\*\*\*** = 52\*\* – This is the repair threshold for a Segment. Satellites track when Storage Nodes fail or leave the network making pieces unavailable. If too many storage nodes become unavailable, putting the potential durability of a Segment at risk, the Satellite will recreate the missing pieces via file repair and store the repaired pieces on diverse, health storage nodes.

        4.  **\*n\*\*\*** = 80\*\* – The maximum number of pieces stored for a Segment&#x20;

        5.  **\*o\*\*\*** = 130\*\* – The number of pieces an Uplink attempts to upload to diverse Storage Nodes when uploading a Segment.&#x20;

13. **Multipart Upload** Multipart Upload is a function that allows large files to be broken up into smaller pieces for more efficient uploads. When an object is uploaded using Multipart Upload, a file is first broken into parts, each part of a Multipart Upload is also stored as one or more Segments. With Multipart Upload, a single object is uploaded as a set of parts. Each part is an integral portion of the data comprising the object. The object parts may be uploaded independently, in parallel, and in any order. Uploads may be paused and resumed by uploading an initial set of parts, then resuming and uploading the remaining parts. If the upload of any part fails, that part may be re-uploaded without impacting the upload of other parts. All of these parts are broken into one or more Segments by the Storj DCS Gateway based on whether the Part Size is smaller or larger than the default Segment size. While Multipart Upload is most appropriate for files larger than the 64MB default Segment size, the Part Size is configurable in applications that use Multipart Upload.&#x20;

    1.  **Part** - a single piece of an object that has been separated into multiple piece during a MultiPart Upload.

14. **Graceful Exit** A function by which a storage node can transition the data it stores to other nodes on the network, without triggering the repair process for the purpose of exiting the network.

15. **Value Attribution** Through our partner program, we offer a variety of programs for partners who refer business to us. We track referrals using Value Attribution.

    1.  **Value Attribution Code** Partners have a code that is passed by and to a User Agent to track Storj DCS usage associated with a partner's application.

16. **Encryption-related Terms**

    1.  **Segment**: The largest subdivision of an object or part. All the segments of an object or part are usually the same size. In most cases, the last segment will be smaller than the rest.

    2.  **Object key or path**: The representation for a object's "location." Paths are essentially an arbitrary number of strings delimited by slashes (e.g. this/is/an/object.txt). On the Storj network, the Satellite uses object keys to keep track of object metadata as well as pointers to storage nodes that possess encrypted object content.

    3.  **Root Secret**: The private client-side encryption key defined in the client configuration that used to derive keys for encrypting and decrypting data stored on the service.

    4.  **Object encryption key**: A key derived from the root secret and the object key. There is a different path key for every path component in a forward-slash separated object key, and each path component is used to derive new path keys for lower level path items.

    5.  **Random Key**: A randomly generated key used to encrypt segment content and metadata.

    6.  **Derived key**: A key derived from the path key for the lowest level path element. The derived key is used to encrypt the random key before it is stored in a segment’s metadata.

    7.  **HMAC**: Hash-based message authentication code. We generate HMACs using path elements and encryption keys in order to derive new keys for lower levels of the path. Using hashes makes it easy to generate lower level keys from higher levels without making it possible to generate higher level keys from lower level ones.

    8.  **AES-GCM**: An authenticated encryption algorithm that makes use of the Advanced Encryption Standard and uses the Galois/Counter mode for encrypting blocks.

    9.  **Secretbox**: An authenticated encryption algorithm from the NaCl library that combines the Salsa20 encryption cipher and Poly1305 message authentication code.

17. **Access Management-related Terms**

    1.  **Access Grant:** An encoded string that contains an API Key, an Encryption store, and the address of the Satellite storing the object metadata for the purpose of sharing access to objects stored on Storj DCS.

    2.  **API Key**: A string generated for a project to authorize access management to data on the service. The API key is an authorization token based on an implementation called macaroons and is sent to the Satellite in order to authorize requests.

    3.  **Encryption store**: a collection of encryption key information used to allow a user to access one or more objects, object key prefixes, or buckets.

    4.  **Restricted Access Grant**: An access grant derived from another access grant with one or more restrictions applied to the internal API key, encryption store, or most commonly both.

    5.  **Caveat**: an access restriction that is encoded into an API key that is generated client side and is interpreted by a satellite. Current supported restrictions are:

        1.  **Specific Operations**​: Caveats can restrict whether an API Key can perform any of the following operations: Read, Write, Delete, List.

        2.  **Bucket**:​Caveats can restrict whether an API Key can perform operations on one or more Buckets.

        3.  **Path and Path Prefix**:​ Caveats can restrict whether an API Key can perform operations on objects within a specific path in the object hierarchy. These caveats are also applied to the encryption store, when added, thus removing unnecessary decryption information from restricted access grants.

        4.  **Time Window**​: Caveats can restrict when an API Key can perform operations on objects stored on the service, either before or after a specified date/time or between to dates/times.
