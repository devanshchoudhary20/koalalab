import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto text-center lg:text-left">
            <h1 className="mt-10 text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-[1.3] leading-[1.2]">
            Distro-less Containers with a 
              <span className='text-gradient-fill-mobile md:text-gradient-fill-desktop '> Distro-like Experience</span>
            </h1>
            <p className="mt-8 text-pretty text-lg  text-gray-500 sm:text-xl/8">
              Secure your software stack with our <br />
              open source containers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-6">
              <a
                href="#"
                className="rounded-md bg-gradient-fill-mobile md:bg-gradient-fill-desktop px-4 py-2.5 text-sm"
              >
                Talk to an expert <span aria-hidden="true">→</span>
              </a>
              <a href="#" className="text-sm/6 text-gradient-fill-blueText border border-gradient-fill-blueText px-2.5 py-1.5 rounded-md">
                Explore directories <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:grow ">
            <Image src="/images/heroGraph.webp" alt="Hero" width={500} height={500} 
              className='w-full h-full object-cover'
              priority/>
          </div>
        </div>
      </div>
    </div>
  )
}