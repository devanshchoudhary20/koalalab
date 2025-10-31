'use client'

import React from 'react'
import { TAB_DATA } from '@/data/featureTabs'

const AccelerateIcon = ({ active }: { active: boolean }) => (
  <svg 
    width="25" 
    height="25" 
    viewBox="0 0 25 25" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-colors"
    aria-hidden
  >
    <path 
      d="M13.5925 11.2173L2.50918 22.3006M14.7807 2.51214C16.2017 3.45504 17.5675 4.56667 18.8439 5.843C20.1312 7.13033 21.251 8.50873 22.1991 9.94297M9.22331 7.59609L5.86929 6.47809C5.48303 6.34933 5.05758 6.43126 4.74676 6.69426L1.41341 9.51479C0.730994 10.0922 0.92487 11.1911 1.76368 11.5001L4.92208 12.6638M12.0537 19.7952L13.2174 22.9536C13.5264 23.7924 14.6253 23.9863 15.2027 23.3039L18.0232 19.9705C18.2862 19.6597 18.3682 19.2343 18.2394 18.848L17.1214 15.494M20.9992 1.03311L15.275 1.98714C14.6569 2.09016 14.0899 2.39397 13.6619 2.85158L5.94661 11.0989C3.94676 13.2367 4.00238 16.5752 6.07234 18.6451C8.1423 20.7151 11.4808 20.7707 13.6186 18.7709L21.8659 11.0556C22.3235 10.6275 22.6273 10.0606 22.7303 9.44251L23.6844 3.71829C23.9476 2.13904 22.5784 0.769898 20.9992 1.03311Z" 
      stroke={active ? "#3A4EAA" : "#C4C4C4"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const UnlockIcon = ({ active }: { active: boolean }) => (
  <svg 
    width="20" 
    height="25" 
    viewBox="0 0 20 25" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-colors"
    aria-hidden
  >
    <path 
      d="M3.57143 9.47368V7.05263C3.57143 3.70986 6.4496 1 10 1C12.1032 1 13.9705 1.95093 15.1433 3.42105M10 14.3158V16.7368M19 15.5263C19 20.2062 14.9706 24 10 24C5.02944 24 1 20.2062 1 15.5263C1 10.8464 5.02944 7.05263 10 7.05263C14.9706 7.05263 19 10.8464 19 15.5263Z" 
      stroke={active ? "#3A4EAA" : "#C4C4C4"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const LoveIcon = ({ active }: { active: boolean }) => (
  <svg 
    width="25" 
    height="24" 
    viewBox="0 0 25 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-colors"
    aria-hidden
  >
    <path 
      d="M9.05 10.9623L11.35 13.4528L16.525 7.84906M12.4921 3.6597C10.1929 0.748951 6.35871 -0.0340309 3.4779 2.63134C0.59709 5.29671 0.191513 9.75307 2.45383 12.9054C4.1626 15.2864 9.01699 20.0665 11.2902 22.2631C11.7081 22.6669 11.917 22.8688 12.1617 22.9483C12.3741 23.0172 12.6101 23.0172 12.8225 22.9483C13.0672 22.8688 13.2762 22.6669 13.694 22.2631C15.9673 20.0665 20.8216 15.2864 22.5304 12.9054C24.7927 9.75307 24.4367 5.26867 21.5063 2.63134C18.576 -0.00599384 14.7914 0.748951 12.4921 3.6597Z" 
      stroke={active ? "#3A4EAA" : "#C4C4C4"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

interface TabNavigationProps {
  active: number
  onTabChange: (index: number) => void
}

const getTabIcon = (label: string, active: boolean) => {
  switch (label) {
    case 'Accelerate':
      return <AccelerateIcon active={active} />
    case 'Unlock':
      return <UnlockIcon active={active} />
    case 'Love':
      return <LoveIcon active={active} />
    default:
      return <AccelerateIcon active={active} />
  }
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
                className={`flex items-center gap-3 px-6 sm:px-8 py-5 rounded-lg border transition-all duration-500 ease-in-out w-full sm:w-auto min-w-[175px] justify-center
                ${isActive ? "border-[#4EF0D2] shadow-sm" : "border-[#C4C4C4] hover:border-gray-400"}`}
              >
                {getTabIcon(t.label, isActive)}
                <span className={`text-base transition-colors duration-500 ease-in-out ${isActive ? "text-[#5B5B5B]" : "text-[#C4C4C4]"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}
