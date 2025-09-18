import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    quote: "Managing non-alpine edge-cases in golden containers really tough. Require tooling for creating custom images, hence want familiar packages/familiar Linux distro.",
    boldTexts: ["non-alpine edge-cases in golden containers", "want familiar packages/familiar Linux distro"],
    name: "Ramasri Iyer",
    title: "VP-Devops",
    company: "European Bulge-Bracket Bank",
    image: "/images/testimonialImage.webp"
  },
  {
    id: 2,
    quote: "The security improvements we've seen with Koala Lab's hardened containers have been remarkable. Our vulnerability management process is now 90% more efficient.",
    boldTexts: ["security improvements", "90% more efficient"],
    name: "Sarah Chen",
    title: "Security Engineer",
    company: "TechCorp Solutions",
    image: "/images/testimonialImage.webp"
  },
  {
    id: 3,
    quote: "Switching to Koala Lab's open source containers saved us hundreds of engineering hours. The familiar Linux distro support made the transition seamless.",
    boldTexts: ["hundreds of engineering hours", "familiar Linux distro support"],
    name: "Michael Rodriguez",
    title: "DevOps Lead",
    company: "Innovation Labs",
    image: "/images/testimonialImage.webp"
  }
]

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }, [])


  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => {
        setIsAutoPlaying(true)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isAutoPlaying])

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
    <section className='w-full bg-primary-background_green' aria-label="Customer testimonials">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-28">
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
              <p className='text-primary-testimonial_text font-heading font-bold text-base'>
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
      </div>
    </section>
  )
}

export default TestimonialSection