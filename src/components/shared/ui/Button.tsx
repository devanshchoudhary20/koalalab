import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-medium transition-colors rounded-lg flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-gradient-fill-mobile md:bg-gradient-fill-desktop text-gradient-fill-submitButton hover:bg-gradient-fill-desktop/90',
    secondary: 'bg-gradient-fill-desktop text-white hover:bg-gradient-fill-desktop/90',
    outline: 'border border-[#3A4EAA] text-[#3A4EAA] hover:bg-[#3A4EAA] hover:text-white'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
