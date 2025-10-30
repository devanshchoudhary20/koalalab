'use client'

import Image from 'next/image'

interface Company {
  name: string
  src: string
}

interface CompaniesScrollContainerProps {
  companies: Company[]
}

export default function CompaniesScrollContainer({ companies }: CompaniesScrollContainerProps) {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 pb-4">
      {companies.map((company) => (
        <div 
          key={company.name}
          className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-56 md:h-28 flex-shrink-0"
        >
          <Image
            src={company.src}
            alt={company.name}
            fill
            className="object-contain filter grayscale "
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
          />
        </div>
      ))}
    </div>
  )
}
