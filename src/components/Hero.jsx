import Image from 'next/image'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import Fence, { transparent } from './Fence'
import { HeroCode } from '@/components/HeroCode'

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero({ className }) {
  return (
    <div
      className={clsx(
        'overflow-hidden',
        className
      )}
    >
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <h1 className="inline font-semibold text-3xl tracking-tight">
                Make the world your datacenter
              </h1>
              <p className="mt-3 text-xl tracking-tight text-slate-700 dark:text-slate-400">
                Store every byte with Storj&apos;s distributed nodes, ensuring
                your data is everywhere, even before you need it.
              </p>
              <div className="mt-6 flex gap-4 md:justify-center lg:justify-start">
                <Button href="/dcs/getting-started">Quick Start</Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(white,transparent)] md:[mask-image:linear-gradient(white,white,transparent)] lg:[mask-image:linear-gradient(white,transparent,white)]">
              <HeroBackground className="dark:opacity-30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <Image
                className="absolute -right-64 -top-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -bottom-40 -right-44"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="pl-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <HeroCode
                    className="w-full"
                    languages={['rclone', 'aws cli', 'uplink']}
                  >
                    <Fence
                      theme={transparent}
                      className="pb-1.5"
                      copy={false}
                      language="shell"
                    >
                      rclone copy storj-tree.png storj:my-bucket/
                    </Fence>
                    <Fence theme={transparent} copy={false} language="shell">
                      aws s3 --endpoint-url=https://gateway.storjshare.io cp
                      storj-tree.png s3://my-bucket
                    </Fence>
                    <Fence
                      theme={transparent}
                      className="pb-1.5"
                      copy={false}
                      language="shell"
                    >
                      uplink cp storj-tree.png sj://my-bucket
                    </Fence>
                  </HeroCode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
