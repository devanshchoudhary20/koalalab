import TestimonialCarousel from './TestimonialCarousel'

export default function TestimonialSection() {
  return (
    <section className='w-full bg-[#E8F8F5]' aria-label="Customer testimonials">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-12">
            What industry leaders are saying..
          </h2>
        </div>
        <TestimonialCarousel />
      </div>
    </section>
  )
}

