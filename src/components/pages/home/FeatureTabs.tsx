'use client'

import React, { useState, useRef, useEffect } from "react";
import type { EmblaCarouselType } from 'embla-carousel'
import { useIntersection } from '@/hooks/useIntersection';
import TabNavigation from './TabNavigation';
import TabIndicator from './TabIndicator';
import TabContent from './TabContent';

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const { ref: sectionRef, isInView } = useIntersection();
  const emblaApiRef = useRef<EmblaCarouselType | null>(null);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  const handleEmblaApi = (api: EmblaCarouselType | null) => {
    emblaApiRef.current = api;
    setEmblaApi(api);
  }

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActive(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    
    // Set initial scroll position
    emblaApi.scrollTo(active, false)
    
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const changeTab = (index: number) => {
    if (emblaApiRef.current) {
      emblaApiRef.current.scrollTo(index, true)
    } else {
      setActive(index)
    }
  }

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen bg-white relative"
    >
      <TabNavigation active={active} onTabChange={changeTab} />
      <TabIndicator active={active} isInView={isInView} onTabChange={changeTab} />
      <TabContent active={active} onEmblaApi={handleEmblaApi} />
    </div>
  );
}
