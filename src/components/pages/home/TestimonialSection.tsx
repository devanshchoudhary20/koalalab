import TestimonialCarousel from './TestimonialCarousel'

export default function TestimonialSection() {
  return (
    <section className='w-full bg-primary-background_green' aria-label="Customer testimonials">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-28">
        <TestimonialCarousel />
      </div>
    </section>
  )
}

