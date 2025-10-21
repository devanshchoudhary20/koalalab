'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from 'lodash';
import { useIntersection } from '@/hooks/useIntersection';
import TabNavigation from './TabNavigation';
import TabIndicator from './TabIndicator';
import TabContent from './TabContent';

interface ScrollState {
  lastScrollTime: number;
  accumulatedDelta: number;
  lastScrollY?: number;
  lastTouchY?: number;
}

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const { ref: sectionRef, isInView } = useIntersection();
  const scrollStateRef = useRef<ScrollState>({
    lastScrollTime: 0,
    accumulatedDelta: 0
  });
  
  // Constants for scroll behavior
  const SCROLL_ZONE_WIDTH = 0.6; // 60% of viewport
  const WHEEL_THRESHOLD = 50;
  const SCROLL_THRESHOLD = 100;
  const SCROLL_COOLDOWN = 800;
  const SCROLL_DEBOUNCE = 300;

  const isMouseInScrollZone = useCallback((e: MouseEvent | TouchEvent) => {
    if (!sectionRef.current) return false;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const viewportWidth = window.innerWidth;
    const zoneStart = viewportWidth * ((1 - SCROLL_ZONE_WIDTH) / 3);
    const zoneEnd = viewportWidth * ((1 + SCROLL_ZONE_WIDTH) / 3);
    
    return clientX >= zoneStart && clientX <= zoneEnd;
  }, []);

  const changeTab = useCallback((direction: 1 | -1) => {
    const now = Date.now();
    if (now - scrollStateRef.current.lastScrollTime < SCROLL_COOLDOWN) return;
    
    setActive(prev => {
      const next = prev + direction;
      return Math.max(0, Math.min(2, next));
    });
    scrollStateRef.current.lastScrollTime = now;
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isMouseInScrollZone(e)) return;
    
    const delta = e.deltaY;
    const direction = delta > 0 ? 1 : -1;
    
    // Allow scrolling down on last tab
    if (active === 2 && direction === 1) return;
    // Allow scrolling up on first tab
    if (active === 0 && direction === -1) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    scrollStateRef.current.accumulatedDelta += delta;
    
    if (Math.abs(scrollStateRef.current.accumulatedDelta) >= WHEEL_THRESHOLD) {
      changeTab(direction);
      scrollStateRef.current.accumulatedDelta = 0;
    }
  }, [isMouseInScrollZone, changeTab, active]);

  const handleScroll = debounce((e: Event) => {
    const scrollDelta = window.scrollY - (scrollStateRef.current.lastScrollY || 0);
    if (Math.abs(scrollDelta) >= SCROLL_THRESHOLD) {
      changeTab(scrollDelta > 0 ? 1 : -1);
    }
    scrollStateRef.current.lastScrollY = window.scrollY;
  }, SCROLL_DEBOUNCE);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isMouseInScrollZone(e)) return;
    
    const touch = e.touches[0];
    const delta = touch.clientY - (scrollStateRef.current.lastTouchY || 0);
    const direction = delta < 0 ? 1 : -1;
    
    // Allow scrolling down on last tab
    if (active === 2 && direction === 1) return;
    // Allow scrolling up on first tab
    if (active === 0 && direction === -1) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (Math.abs(delta) >= SCROLL_THRESHOLD) {
      changeTab(direction);
      scrollStateRef.current.lastTouchY = touch.clientY;
    }
  }, [isMouseInScrollZone, changeTab, active]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Cancel any pending debounced calls
    };
  }, [handleWheel, handleTouchMove, handleScroll]);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen bg-white relative"
    >
      <TabNavigation active={active} onTabChange={setActive} />
      <TabIndicator active={active} isInView={isInView} onTabChange={setActive} />
      <TabContent active={active} />
    </div>
  );
}
