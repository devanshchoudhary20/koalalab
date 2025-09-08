import React, { useState } from 'react'
import Image from 'next/image'

const ContactForm = () => {
  const [email, setEmail] = useState('')
  const [inquiry, setInquiry] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="w-full bg-white py-24 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">
                Ask, plug in, <span className="text-gradient-fill-desktop">collaborate</span>
              </h2>
              <p className="text-lg text-gray-600 font-content">
                Let us know how we can help you reduce CVEs, meet compliance, and ship safer code.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-content">
                  Your work E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gradient-fill-desktop/30 rounded-lg focus:border-gradient-fill-desktop focus:outline-none transition-colors font-content"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 font-content">
                  What would you want to know about?
                </label>
                <input
                  type="text"
                  id="inquiry"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="Hardened containers, custom images, tinkering with Koala images..."
                  className="w-full px-4 py-3 border-2 border-gradient-fill-desktop/30 rounded-lg focus:border-gradient-fill-desktop focus:outline-none transition-colors font-content"
                />
              </div>

              <div className="text-sm text-gray-600 font-content">
                Let&apos;s chat. <a href="#" className="text-gradient-fill-blueText hover:underline">Click here</a> to grab a quick slot and we&apos;ll take it from there.
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-fill-desktop text-gradient-fill-submitButton py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gradient-fill-desktop/90 transition-colors flex items-center justify-center gap-2 font-content"
              >
                Submit<span aria-hidden="true">→</span>
              </button>
            </form>
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

export default ContactForm
