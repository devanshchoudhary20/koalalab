'use client'

import React from 'react'
import { Button, Input } from '@/components/shared/ui'
import { FormErrors } from '@/utils/validation'

interface ContactFormFieldsProps {
  formState: {
    email: string
    setEmail: (email: string) => void
    inquiry: string
    setInquiry: (inquiry: string) => void
    errors: FormErrors
    isSubmitting: boolean
    isSuccess: boolean
    handleSubmit: (e: React.FormEvent) => void
  }
}

export default function ContactFormFields({ formState }: ContactFormFieldsProps) {
  const { email, setEmail, inquiry, setInquiry, errors, isSubmitting, isSuccess, handleSubmit } = formState

  const calendlyLink = "https://calendly.com/koalalab-abhi/30min"

  // Hide form fields after successful submission
  if (isSuccess) {
    return null
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
    >

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

      <div className="text-sm text-primary-text_blue font-content font-light">
        Let&apos;s chat. <a href={calendlyLink} target="_blank" rel="noreferrer nofollow" className="text-gradient-fill-blueText hover:underline font-medium">Click here</a> to grab a quick slot and we&apos;ll take it from there.
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
