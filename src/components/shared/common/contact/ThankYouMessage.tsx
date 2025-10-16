import React from 'react'

export default function ThankYouMessage() {
  return (
    <div className="space-y-6">
      {/* Main heading */}
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading leading-tight">
          Thank you for<br />
          your response.
        </h2>
        
        <p className="text-lg text-gray-600 font-content">
          While we intend to respond at the earliest,<br />
          you can always set up a quick chat with us.
        </p>
        
        <p className="text-lg text-gray-600 font-content">
          <a href="#" className="text-primary-text_blue hover:underline">
            Click here
          </a> to grab a quick slot and we'll take it from there.
        </p>
      </div>

      {/* Koala-style icon */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative w-full max-w-md">
          <svg 
            width="400" 
            height="400" 
            viewBox="0 0 400 400" 
            className="w-full h-auto"
            fill="none"
          >
            {/* Envelope base */}
            <path 
              d="M80 120 L320 120 L320 280 L80 280 Z" 
              stroke="#9CA3AF" 
              strokeWidth="3" 
              fill="none"
            />
            {/* Envelope flap */}
            <path 
              d="M80 120 L200 200 L320 120" 
              stroke="#9CA3AF" 
              strokeWidth="3" 
              fill="none"
            />
            
            {/* Speaker/Microphone circle */}
            <circle 
              cx="200" 
              cy="180" 
              r="40" 
              stroke="#9CA3AF" 
              strokeWidth="3" 
              fill="none"
            />
            <circle 
              cx="200" 
              cy="180" 
              r="20" 
              stroke="#9CA3AF" 
              strokeWidth="2" 
              fill="none"
            />
            <circle 
              cx="200" 
              cy="180" 
              r="8" 
              stroke="#9CA3AF" 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Sound waves */}
            <path 
              d="M240 180 Q260 160 280 180 Q260 200 240 180" 
              stroke="#9CA3AF" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="4,4"
            />
            <path 
              d="M280 180 Q300 160 320 180 Q300 200 280 180" 
              stroke="#9CA3AF" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="4,4"
            />
            
            {/* Koala ears */}
            <path 
              d="M160 140 Q150 120 140 140 Q150 160 160 140" 
              stroke="#9CA3AF" 
              strokeWidth="3" 
              fill="none"
            />
            <path 
              d="M240 140 Q250 120 260 140 Q250 160 240 140" 
              stroke="#9CA3AF" 
              strokeWidth="3" 
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
