import React from 'react'
import Image from 'next/image'
const HowItWorksSection = () => {
  return (
    <div className='w-full bg-primary-background_purple px-6 py-20 hidden md:block'>
        <h1 className='text-center text-4xl font-bold'>How does Koala build its <span className='text-primary-text_blue'>Golden images?</span></h1>
        <Image
        src='/images/HowItWorks1.webp' 
        alt='How It Works' 
        width={1000} 
        height={1000} 
        className='w-full h-full object-cover max-w-4xl mx-auto mt-20'
        />
        
    </div>
  )
}

export default HowItWorksSection