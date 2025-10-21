'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/shared/ui'
import { TAB_DATA } from '@/data/featureTabs'

const SplitTitle = ({ title }: { title: string }) => {
  const [first, rest] = useMemo(() => {
    const parts = title.split(" ");
    return [parts[0], parts.slice(1).join(" ")];
  }, [title]);
  
  return (
    <h1 className="text-3xl sm:text-[40px] lg:text-[56px] font-extrabold leading-tight mb-6">
      <span className="text-[#4EF0D2]">{first} </span>
      <span className="text-[#2D3748]">{rest}</span>
    </h1>
  );
};

interface TabContentProps {
  active: number
}

export default function TabContent({ active }: TabContentProps) {
  return (
    <main className="relative min-h-screen sm:pt-0">
      {TAB_DATA.map((t, i) => (
        <section
          id={t.id}
          key={t.id}
          className={`absolute inset-0 min-h-screen flex items-start transition-all duration-700 ease-in-out ${
            active === i 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 w-full">
            <div className="flex flex-col lg:hidden gap-8">
              <div className="text-center">
                <SplitTitle title={t.title} />
                <p className="text-[16px] sm:text-[24px] text-[#4A5568] leading-relaxed mb-8">{t.description}</p>
              </div>

              <div className="relative flex justify-center">
                <Image
                  src={t.image}
                  alt={`${t.label} illustration`}
                  width={210}
                  height={200}
                  className="rounded-xl select-none pointer-events-none"
                  priority={i === 0}
                />
              </div>

              <div className="flex flex-col gap-4 justify-center mb-8">
                <Button variant="primary" className="w-max-content mx-auto sm:w-full min-w-[188px]">
                  {t.cta1}
                </Button>
                <Link href="/" className="w-max-content mx-auto sm:w-full min-w-[188px]">
                  <Button variant="outline" className="w-full">
                    {t.cta2}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="text-left">
                <SplitTitle title={t.title} />
                <p className="text-xl text-[#4A5568] leading-relaxed mb-8">{t.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  <Button variant="primary">
                    {t.cta1}
                  </Button>
                  <Link href="/">
                    <Button variant="outline">
                      {t.cta2}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center">
                <Image
                  src={t.image}
                  alt={`${t.label} illustration`}
                  width={620}
                  height={615}
                  className="rounded-xl select-none pointer-events-none"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
