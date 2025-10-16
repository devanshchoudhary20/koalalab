import { useState } from 'react'
import { validateForm, FormErrors } from '@/utils/validation'

export function useForm() {
  const [email, setEmail] = useState('')
  const [inquiry, setInquiry] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Always prevent default to avoid page reload
    const formErrors = validateForm(email, inquiry)
    setErrors(formErrors)
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      setIsSuccess(false)
      
      try {
        // Submit to Formspree
        const formspreeEndpoint = 'https://formspree.io/f/mpwybprg'
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            inquiry,
            _subject: 'New Contact Form Submission',
            _replyto: email,
          }),
        })
        
        if (response.ok) {
          console.log('Form submitted successfully to Formspree')
          setIsSuccess(true)
          setEmail('')
          setInquiry('')
          setErrors({})
        } else {
          const errorData = await response.json()
          console.error('Form submission failed:', errorData)
          throw new Error('Form submission failed')
        }
      } catch (error) {
        console.error('Form submission error:', error)
        setErrors({ email: 'Failed to submit. Please try again.' })
      }
      
      setIsSubmitting(false)
    }
  }

  return {
    email,
    setEmail,
    inquiry,
    setInquiry,
    errors,
    isSubmitting,
    isSuccess,
    handleSubmit
  }
}
