'use client'

import React from 'react'
import { TAB_DATA } from '@/data/featureTabs'

interface TabIndicatorProps {
  active: number
  isInView: boolean
  onTabChange: (index: number) => void
}

export default function TabIndicator({ active, isInView, onTabChange }: TabIndicatorProps) {
  return (
    <div className={`hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 transition-opacity duration-300 ${
      isInView ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div className="flex flex-col gap-3 pr-16">
        {TAB_DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => onTabChange(i)}
            aria-label={`Go to ${TAB_DATA[i].label}`}
            aria-current={active === i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${active === i ? "bg-[#3A4EAA] scale-110" : "bg-[#C4C4C4]"}`}
          />
        ))}
      </div>
    </div>
  )
}
