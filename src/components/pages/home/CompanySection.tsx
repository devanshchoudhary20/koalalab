import Image from 'next/image'

const companies = [
  { name: 'Bankless Venture', src: '/images/Bankless venture.webp' },
  { name: 'Primus', src: '/images/primus.webp' },
  { name: 'Stakestone', src: '/images/stakestone.webp' },
  { name: 'Lista', src: '/images/lista.webp' },
  { name: 'Draper Dragon', src: '/images/Draper dragon.webp' },
  { name: 'Bedrock', src: '/images/Bedrock.webp' },
  { name: 'Hypersphere', src: '/images/hypersphere.webp' },
  { name: 'Levitate', src: '/images/levitate.webp' },
  { name: 'Stakeease', src: '/images/stakeease.webp' },
  { name: 'Mishti', src: '/images/mishti.webp' },
]

const CompanySection = () => {
  return (
    <div className="py-8 sm:py-16 bg-[#F7F7F7]">
      <div className="text-center text-gradient-fill-blueText text-xs sm:text-sm mb-8">
        <p>KoalaLabs is trusted by 5000+ companies of all sizes</p>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-12 px-6">
          {companies.map((company) => (
            <div 
              key={company.name}
              className="w-32 h-12 relative"
            >
              <Image
                src={company.src}
                alt={company.name}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                sizes="128px"
              />
            </div>
          ))}
        </div>

        {/* Mobile View with Manual Scroll */}
        <div className="md:hidden relative w-full">
          <div className="flex space-x-12 overflow-x-auto scrollbar-hide px-6 pb-4">
            {companies.map((company) => (
              <div 
                key={company.name}
                className="inline-flex w-32 h-12 relative flex-shrink-0"
              >
                <Image
                  src={company.src}
                  alt={company.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  sizes="128px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanySection