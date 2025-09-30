'use client'

import React, { useState } from "react";
import { useIntersection } from '@/hooks/useIntersection';
import TabNavigation from './TabNavigation';
import TabIndicator from './TabIndicator';
import TabContent from './TabContent';

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const { ref: sectionRef, isInView } = useIntersection();

  const goToSlide = (index: number) => {
    setActive(index);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      <TabNavigation active={active} onTabChange={goToSlide} />
      <TabIndicator active={active} isInView={isInView} onTabChange={goToSlide} />
      <TabContent active={active} />
    </div>
  );
}
