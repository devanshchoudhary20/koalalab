import React, { useId } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ 
  label, 
  error, 
  className = '', 
  id,
  ...props 
}: InputProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-light font-content"
          style={{ color: '#3547A1' }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 border-2 border-gradient-fill-desktop/30 rounded-lg focus:border-gradient-fill-desktop focus:outline-none transition-colors font-content ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 font-content">{error}</p>
      )}
    </div>
  )
}
