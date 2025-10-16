import { useState } from 'react'
import { validateForm, FormErrors } from '@/utils/validation'

export function useForm() {
  const [email, setEmail] = useState('')
  const [inquiry, setInquiry] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)
    
    const formErrors = validateForm(email, inquiry)
    setErrors(formErrors)
    
    if (Object.keys(formErrors).length === 0) {
      try {
        // For Netlify Forms, we let the form submit naturally
        // The form will be handled by Netlify's servers
        console.log('Form submitted to Netlify Forms:', { email, inquiry })
        
        // Show success message
        setIsSuccess(true)
        setEmail('')
        setInquiry('')
        setErrors({})
      } catch (error) {
        console.error('Form submission error:', error)
        setErrors({ email: 'Failed to submit. Please try again.' })
      }
    }
    
    setIsSubmitting(false)
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
