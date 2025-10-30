'use client'

import React from 'react'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import { useCarousel } from '@/hooks/useCarousel'
import LinkedInButton from '@/components/shared/common/LinkedInButton'

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
    <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
      {/* Main Quote */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl text-center">
          <blockquote 
            className="text-xl sm:text-2xl md:text-2xl lg:text-2xl leading-relaxed text-[#1E3A8A] font-heading"
            dangerouslySetInnerHTML={{
              __html: `"${formatQuote(currentTestimonial.quote, currentTestimonial.boldTexts)}"`
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
                src={currentTestimonial.image}
                alt={`${currentTestimonial.name} profile picture`}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Name within the teal banner */}
            <span className="text-gray-900 text-sm font-medium">
              {currentTestimonial.name}
            </span>
            <LinkedInButton url={currentTestimonial.linkedinUrl} />
          </div>
          
          {/* LinkedIn button as separate dark blue circle */}
         
        </div>
        
        {/* Title and Company - Centered below */}
        <div className="text-center">
          <p className="text-[#1E3A8A] font-bold text-lg">
            {currentTestimonial.title}
          </p>
          <p className="text-[#1E3A8A] text-base">
            {currentTestimonial.company}
          </p>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#4FD1C7] scale-110' 
                : 'bg-[#4FD1C7]/30 hover:bg-[#4FD1C7]/60'
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
