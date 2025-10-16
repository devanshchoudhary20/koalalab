import Image from 'next/image'
import ContactFormFields from './ContactFormFields'

export default function ContactForm() {
  return (
    <section id="contact" className="w-full bg-gradient-to-br from-gray-50 to-blue-50/30 py-24 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          <div className="space-y-8">
            <ContactFormFields />
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Image
                src="/images/ContactImage.webp"
                alt="Contact illustration"
                width={500}
                height={500}
                className="w-full h-auto object-contain max-w-2xl mx-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
