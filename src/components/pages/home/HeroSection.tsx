import Image from 'next/image'
import { CTAButtons } from '@/components/shared/common'

export default function HeroSection() {
  return (
    <div className="bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/30"></div>
      <div className="relative isolate pt-0 overflow-hidden min-h-[70vh]">
        <div className="mx-auto max-w-fit px-6 py-16 sm:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto text-center lg:text-left">
            <h1 className="mt-10 text-pretty text-4xl font-bold tracking-tight  md:text-5xl sm:text-6xl sm:leading-[1.3] leading-[1.2] text-gradient-fill-desktop">
            Hardened distroless <br /> containers
              <span className='text-gray-900'> with a <br /> distro experience.</span>
            </h1>
            <p className="mt-8 text-pretty text-lg  text-gray-500 sm:text-xl/8">
            Koala’s Hardened “out-of-the-box” containers enable <br />
            continuous compliance & reduce CVE sprawl.
            </p>
            <div className="mt-10">
              <CTAButtons className="justify-center lg:justify-start" />
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:grow relative">
            {/* Background circles - Left side */}
            <div className="absolute -left-[50px] -bottom-[100px] w-[200px] h-auto xl:-left-[100px]">
              <Image src="/images/heroBackCircle.webp" alt="Background circle" width={96} height={96} 
                className='w-full h-full object-contain'/>
            </div>

            {/* Background circles - Right side */}
            <div className="absolute -right-[150px] -top-[150px] w-[350px] sm:w-[350px] w-[250px] -top-[200px] sm:-top-[150px] h-auto xl:-right-[200px]">
              <Image src="/images/heroBackCircle.webp" alt="Background circle" width={96} height={96}   
                className='w-full h-full object-contain'/>
            </div>
            {/* Background circles - Bottom right side */}
            <div className="absolute -right-[80px] w-[150px] md:w-[300px] -bottom-[50px] md:-bottom-[300px] h-auto xl:-right-[130px] hidden sm:block">
              <Image src="/images/heroBackCircle.webp" alt="Background circle" width={88} height={88} 
                className='w-full h-full object-contain'/>
            </div>

            {/* Main hero graph image */}
            <div className="relative z-10 sm:w-[500px] sm:h-[421px] w-full h-full">
              {/* Mobile image */}
              <Image 
                src="/images/heroGraph.png" 
                alt="Hero" 
                width={500} 
                height={500} 
                className='w-full h-full object-cover sm:hidden'
                priority
              />
              {/* Desktop image */}
              <Image 
                src="/images/heroGraph.png" 
                alt="Hero" 
                width={500} 
                height={421} 
                className='w-full h-full object-cover hidden sm:block'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}