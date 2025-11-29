'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
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
    const saved = localStorage.getItem('animations-enabled');
    if (saved !== null) {
      setAnimationsEnabled(saved === 'true');
    } else if (isMobile) {
      setAnimationsEnabled(false);
    }
  }, [isMobile]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('animations-enabled', String(newValue));
      return newValue;
    });
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>{children}</AnimationContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
}
