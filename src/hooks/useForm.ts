import { useState } from 'react'
import { validateForm, FormErrors } from '@/utils/validation'

export function useForm() {
  const [email, setEmail] = useState('')
  const [inquiry, setInquiry] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formErrors = validateForm(email, inquiry)
    setErrors(formErrors)
    
    if (Object.keys(formErrors).length === 0) {
      try {
        await submitForm({ email, inquiry })
        setEmail('')
        setInquiry('')
        setErrors({})
      } catch (error) {
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
    handleSubmit
  }
}

async function submitForm(data: { email: string; inquiry: string }) {
  await new Promise(resolve => setTimeout(resolve, 1000))
}
