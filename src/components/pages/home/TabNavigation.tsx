'use client'

import React from 'react'
import { TAB_DATA } from '@/data/featureTabs'

const TabIcon = ({ active }: { active: boolean }) => (
 <svg
   className={`w-6 h-6 transition-colors ${active ? "text-[#3A4EAA]" : "text-[#C4C4C4]"}`}
   viewBox="0 0 25 25"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
   aria-hidden
 >
   <g clipPath="url(#a)">
     <path
       d="M24.929 1.06c.081 1.324.081 2.651 0 3.98.02.134.044.273.071.419v.21c.062 4.79-3.264 8.418-6.671 11.493-.256 1.67-.514 3.34-.773 5.014-.314 1.214-1.316 2.549-2.572 2.827H14c-.713-.354-1.61-1.15-2.099-1.781-.424-.547-.517-1.197.034-1.707.992-.918 1.848.142 2.521.835.229-.247.501-.4.579-.748.398-1.803.246-4.89 1.415-6.266 1.362-1.605 3.189-2.84 4.374-4.646 1.641-2.502 1.861-5.229 1.723-8.161-3.232-.184-6.186.154-8.82 2.135-1.575 1.184-2.803 2.954-4.278 4.114C8.264 9.708 5.033 9.595 3.467 10.003c-.377.098-.557.316-.813.585.675.691 1.69 1.376.876 2.409-.468.592-1.126.601-1.712.166C1.173 12.685.005 11.479 0 10.65-.006 9.682 1.56 8.11 2.426 7.778c1.552-.598 3.882-.465 5.534-.923C10.44 4.417 12.516 2.046 15.926.85 18.182.059 21.466-.132 23.846.08c.594.053 1.032.374 1.083.98Z"
       fill="currentColor"
     />
     <path d="M24.999 5.038c-.02.061-.043.06-.07 0-.015-1.271.105-2.74 0-3.978h.07v3.978Z" fill="currentColor" />
     <path d="M24.999 5.457c-.117-.075-.068-.286-.07-.418h.07v.418Z" fill="currentColor" />
     <path
       d="M14.477 6.03c.5-.04 1.089.355 1.228.835.316 1.088-.704 1.255-.657 2.114.086 1.584 2.556 1.347 2.37-.188-.06-.5-.436-.638-.598-1.014-.559-1.294 1-2.396 2.118-1.205 1.386 1.476 1.083 3.83-.423 5.093-2.73 2.288-6.744-.436-5.709-3.804.208-.676.889-1.77 1.669-1.834Z"
       fill="currentColor"
     />
   </g>
   <defs>
     <clipPath id="a">
       <rect width="25" height="25" fill="#fff" />
     </clipPath>
   </defs>
 </svg>
);

interface TabNavigationProps {
  active: number
  onTabChange: (index: number) => void
}

export default function TabNavigation({ active, onTabChange }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-center gap-4 sm:gap-6 w-fit mx-auto">
          {TAB_DATA.map((t, i) => {
            const isActive = active === i;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(i)}
                aria-current={isActive}
                aria-controls={t.id}
                className={`flex items-center gap-3 px-6 sm:px-8 py-5 rounded-lg border transition-all w-full sm:w-auto min-w-[175px] justify-center
                ${isActive ? "border-[#4EF0D2] shadow-sm" : "border-[#C4C4C4] hover:border-gray-400"}`}
              >
                <TabIcon active={isActive} />
                <span className={`text-base ${isActive ? "text-[#5B5B5B]" : "text-[#C4C4C4]"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}
