import React from 'react'
import Image from 'next/image'
const HowItWorksContentSection = () => {
  return (
    <div className='px-6 py-20 hidden md:block  bg-primary-background_purple'>
        <div className='flex flex-row  md:items-center sm:items-start justify-center mx-auto gap-16'>
        <div className='sm:max-w-lg md:max-w-sm'>
        <h1 className='text-start text-4xl font-bold mb-12'>How does Koala build its <span className='text-primary-text_blue'>Golden images?</span></h1>
        <p className='text-start text-lg text-primary-text_gray text-xl '>Koala builds its Golden Images by processing upstream sources through DEBFLOW, creating a trusted and curated Package Universe. <br /> <br />
       From this universe, lightweight Dockerfiles pull only the required components (e.g., Python, Go, Nginx) using a common secure base. <br /> <br />
       Each image is then assembled with minimal steps, ensuring consistency and traceability. <br /> <br />
        Finally, these standardized, production-ready images are stored in the Container Registry for reliable use across deployments.</p>
        </div>
        <div>
            <Image
             src='/images/HowItWorks2.webp' 
             alt='How It Works' 
             width={1000} 
             height={1000} 
             className='w-full h-full object-cover max-w-3xl mx-auto'
             />
        </div>
        </div>
    </div>
  )
}

export default HowItWorksContentSection