'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { testimonials } from '@/data/testimonials'
import { TESTIMONIAL_CONFIG } from '@/constants/carousel'
import LinkedInButton from '@/components/shared/common/LinkedInButton'

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'x',
      loop: true,
      align: 'center'
    },
    [Autoplay({ delay: TESTIMONIAL_CONFIG.AUTO_PLAY_INTERVAL, stopOnInteraction: true })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index)
  }

  const formatQuote = (quote: string, boldTexts: string[]) => {
    let formattedQuote = quote
    boldTexts.forEach((boldText) => {
      formattedQuote = formattedQuote.replace(
        boldText,
        `<strong>${boldText}</strong>`
      )
    })
    return formattedQuote
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
            <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
              {/* Main Quote */}
              <div className="w-full flex justify-center">
                <div className="w-full max-w-5xl text-center">
                  <blockquote 
                    className="text-xl sm:text-2xl md:text-2xl lg:text-2xl leading-relaxed text-[#1E3A8A] font-heading"
                    dangerouslySetInnerHTML={{
                      __html: `"${formatQuote(testimonial.quote, testimonial.boldTexts)}"`
                    }}
                  />
                </div>
              </div>

              {/* Attribution Section */}
              <div className="flex flex-col items-center gap-4">
                {/* Profile Picture, Name, and LinkedIn - Horizontal Layout */}
                <div className="flex items-center gap-2">
                  {/* Teal pill-shaped banner with embedded profile picture */}
                  <div className="bg-gradient-fill-mobile rounded-full px-2 py-1 flex items-center gap-2">
                    {/* Profile picture embedded in the teal banner */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.name} profile picture`}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Name within the teal banner */}
                    <span className="text-gray-900 text-sm font-medium">
                      {testimonial.name}
                    </span>
                    <LinkedInButton url={testimonial.linkedinUrl} />
                  </div>
                  
                  {/* LinkedIn button as separate dark blue circle */}
                 
                </div>
                
                {/* Title and Company - Centered below */}
                <div className="text-center">
                  <p className="text-[#1E3A8A] font-bold text-lg">
                    {testimonial.title}
                  </p>
                  <p className="text-[#1E3A8A] text-base">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-[#4FD1C7] scale-110' 
                : 'bg-[#4FD1C7]/30 hover:bg-[#4FD1C7]/60'
            }`}
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Go to testimonial ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  )
}
