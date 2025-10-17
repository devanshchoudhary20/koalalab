import React from 'react'
import Image from 'next/image'

const HowItWorksSection = () => {
  const features = [
    {
      icon: '/images/0-deb.webp',
      title: '0-deb: ',
      description: 'Linux for Hardened Containers'
    },
    {
      icon: '/images/apt-based.webp',
      title: 'apt-based',
      description: 'workflows with distroless security'
    },
    {
      icon: '/images/futureHardening.webp',
      title: 'Further hardening',
      description: 'before enterprise release'
    }
  ]

  return (
    <div className='w-full bg-primary-background_purple px-6 py-20'>
        <h1 className='text-center text-4xl font-bold text-primary-text_blue font-size-[40px] sm:font-size-[56px]'>0-Deb: Our container-first <span className='text-black'>linux distro <br /> for hardened containers.</span></h1>
        <div className='max-w-5xl mx-auto mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {features.map((feature, index) => (
            <div 
              key={index}
              className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-row items-center justify-center gap-4 max-w-[18rem] sm:max-w-xs mx-auto'
            >
              {/* Icon */}
              <div className='mb-4'>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className='w-16 h-16 object-contain'
                />
              </div>
              <div>

              
              
              {/* Title */}
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                <span className='font-bold'>{feature.title}</span>  {feature.description}
              </h3>
              </div>
            </div>
          ))}
        </div>
        </div>
        <Image
        src='/images/HowItWorks.webp' 
        alt='How It Works' 
        width={1000} 
        height={1000} 
        className='w-full h-full object-cover max-w-4xl mx-auto mt-20'
        />
        
    </div>
  )
}

export default HowItWorksSection