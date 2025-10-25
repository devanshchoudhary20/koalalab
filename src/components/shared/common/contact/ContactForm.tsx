'use client'

import Image from 'next/image'
import ContactFormFields from './ContactFormFields'
import { useForm } from '@/hooks/useForm'

export default function ContactForm() {
  const formState = useForm()
  const { isSuccess } = formState

  return (
    <section id="contact" className="w-full bg-gradient-to-br from-gray-50 to-blue-50/30 pb-0 pt-10 md:py-24 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          <div className="space-y-8">
            <div className="space-y-4">
              {!isSuccess ? (
                <>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">
                    Ask, plug in, <span className="text-gradient-fill-desktop">collaborate</span>
                  </h2>
                  <p className="text-lg text-gray-600 font-content">
                    Let us know how we can help you reduce CVEs, meet compliance, and ship safer code.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading leading-tight">
                    Thank you for<br />
                    your response.
                  </h2>
                  <p className="text-lg text-gray-600 font-content">
                    While we intend to respond at the earliest,<br />
                    you can always set up a quick chat with us.
                  </p>
                  <p className="text-lg text-gray-600 font-content">
                    <a href="#" className="text-primary-text_blue hover:underline">
                      Click here
                    </a> to grab a quick slot and we&apos;ll take it from there.
                  </p>
                </>
              )}
            </div>

            <ContactFormFields formState={formState} />
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-md ">
              <Image
                src="/images/ContactImage.webp"
                alt="Contact illustration"
                width={500}
                height={500}
                className="w-full h-auto object-contain max-w-2xl mx-auto md:my-0 mb-[-140px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
