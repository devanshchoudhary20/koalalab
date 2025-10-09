'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntersection } from '@/hooks/useIntersection';
import TabNavigation from './TabNavigation';
import TabIndicator from './TabIndicator';
import TabContent from './TabContent';

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const { ref: sectionRef, isInView } = useIntersection();
  const autoSwitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setActive(index);
    setUserInteracted(true);
    
    // Clear any existing user interaction timeout
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    
    // Reset user interaction flag after 5 seconds of no interaction
    userInteractionTimeoutRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 5000);
  }, []);

  // Auto-switching logic
  useEffect(() => {
    if (isInView && !userInteracted) {
      // Start auto-switching with slow, smooth transitions
      autoSwitchIntervalRef.current = setInterval(() => {
        setActive(prev => (prev + 1) % 3);
      }, 2000); // Switch every 2 seconds for a smooth experience
    } else {
      if (autoSwitchIntervalRef.current) {
        clearInterval(autoSwitchIntervalRef.current);
      }
    }

    return () => {
      if (autoSwitchIntervalRef.current) {
        clearInterval(autoSwitchIntervalRef.current);
      }
    };
  }, [isInView, userInteracted]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (autoSwitchIntervalRef.current) {
        clearInterval(autoSwitchIntervalRef.current);
      }
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      <TabNavigation active={active} onTabChange={goToSlide} />
      <TabIndicator active={active} isInView={isInView} onTabChange={goToSlide} />
      <TabContent active={active} />
    </div>
  );
}
