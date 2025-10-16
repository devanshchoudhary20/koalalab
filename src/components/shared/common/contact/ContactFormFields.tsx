'use client'

import React from 'react'
import { Button, Input } from '@/components/shared/ui'
import { useForm } from '@/hooks/useForm'
import ThankYouMessage from './ThankYouMessage'

export default function ContactFormFields() {
  const { email, setEmail, inquiry, setInquiry, errors, isSubmitting, isSuccess, handleSubmit } = useForm()

  // Show thank you message after successful submission
  if (isSuccess) {
    return <ThankYouMessage />
  }

  return (
    <form 
      name="contact" 
      method="POST" 
      data-netlify="true" 
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      {/* Hidden field for Netlify Forms */}
      <input type="hidden" name="form-name" value="contact" />
      
      {/* Honeypot field for spam protection */}
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <Input
        type="email"
        name="email"
        label="Your work E-mail"
        placeholder="john.doe@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />

      <Input
        type="text"
        name="inquiry"
        label="What would you want to know about?"
        value={inquiry}
        onChange={(e) => setInquiry(e.target.value)}
        placeholder="Hardened containers, custom images, tinkering with Koala images..."
        error={errors.inquiry}
        required
      />

      <div className="text-sm text-gray-600 font-content">
        Let&apos;s chat. <a href="#" className="text-gradient-fill-blueText hover:underline">Click here</a> to grab a quick slot and we&apos;ll take it from there.
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}<span aria-hidden="true">→</span>
      </Button>
    </form>
  )
}
