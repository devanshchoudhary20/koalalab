export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateInquiry = (inquiry: string): boolean => {
  return inquiry.trim().length >= 10
}

export interface FormErrors {
  email?: string
  inquiry?: string
}

export const validateForm = (email: string, inquiry: string): FormErrors => {
  const errors: FormErrors = {}
  
  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!inquiry.trim()) {
    errors.inquiry = 'Inquiry is required'
  } else if (!validateInquiry(inquiry)) {
    errors.inquiry = 'Please provide more details (at least 10 characters)'
  }
  
  return errors
}
