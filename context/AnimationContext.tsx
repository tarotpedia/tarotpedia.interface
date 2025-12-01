'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  isMobile: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setAnimationsEnabled(false);
      localStorage.setItem('animations-enabled', 'false');
    } else {
      const saved = localStorage.getItem('animations-enabled');
      if (saved !== null) {
        setAnimationsEnabled(saved === 'true');
      }
    }
  }, [isMobile]);

  const toggleAnimations = () => {
    if (isMobile) {
      return;
    }

    setAnimationsEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('animations-enabled', String(newValue));
      return newValue;
    });
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations, isMobile }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
}
