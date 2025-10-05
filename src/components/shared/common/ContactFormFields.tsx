'use client'

import React from 'react'
import { Button, Input } from '@/components/shared/ui'
import { useForm } from '@/hooks/useForm'

export default function ContactFormFields() {
  const { email, setEmail, inquiry, setInquiry, errors, isSubmitting, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        label="Your work E-mail"
        placeholder="john.doe@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <Input
        type="text"
        label="What would you want to know about?"
        value={inquiry}
        onChange={(e) => setInquiry(e.target.value)}
        placeholder="Hardened containers, custom images, tinkering with Koala images..."
        error={errors.inquiry}
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
