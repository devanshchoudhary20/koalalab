'use client'

import React, { useState, useEffect, useRef } from "react";
import { useIntersection } from '@/hooks/useIntersection';
import TabNavigation from './TabNavigation';
import TabIndicator from './TabIndicator';
import TabContent from './TabContent';

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const { ref: sectionRef, isInView } = useIntersection();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const sectionTop = sectionRef.current?.offsetTop || 0;
        const sectionHeight = sectionRef.current?.offsetHeight || 0;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const progress = (scrollPosition - sectionTop) / (sectionHeight - windowHeight);
          const newActive = Math.min(Math.floor(progress * 3), 2);
          if (newActive !== active && newActive >= 0 && newActive <= 2) {
            setActive(newActive);
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [active, sectionRef]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      <TabNavigation active={active} onTabChange={goToSlide} />
      <TabIndicator active={active} isInView={isInView} onTabChange={goToSlide} />
      <TabContent active={active} />
    </div>
  );
}
