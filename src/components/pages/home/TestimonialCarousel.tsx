'use client'

import React from 'react'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import { useCarousel } from '@/hooks/useCarousel'

export default function TestimonialCarousel() {
  const { currentIndex, goToSlide } = useCarousel(testimonials)

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

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl text-center">
          <blockquote 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed text-primary-testimonial_text font-heading"
            dangerouslySetInnerHTML={{
              __html: `"${formatQuote(currentTestimonial.quote, currentTestimonial.boldTexts)}"`
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row items-center gap-2 p-2 bg-gradient-fill-desktop rounded-full">
          <div className="rounded-full size-6 bg-black overflow-hidden flex-shrink-0 relative">
            <Image
              src={currentTestimonial.image}
              alt={`${currentTestimonial.name} profile picture`}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <p className='text-primary-testimonial_text font-content text-sm'>
            {currentTestimonial.name}
          </p>
        </div>
        
        <div className='flex flex-col items-center gap-2'>
          <p className='text-primary-testimonial_text font-heading font-bold text-base '>
            {currentTestimonial.title}
          </p>
          <p className='text-primary-testimonial_text font-content text-sm'>
            {currentTestimonial.company}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:ring-gradient-fill-desktop ${
              index === currentIndex 
                ? 'bg-gradient-fill-desktop scale-125' 
                : 'bg-gradient-fill-desktop/30 hover:bg-gradient-fill-desktop/60'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to testimonial ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  )
}
