'use client';
import React, { useEffect, useRef } from 'react';

const ParallaxBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const scrollPos = useRef(0);
  const targetPos = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      targetPos.current = window.scrollY * 0.3; // much smaller multiplier = slower movement
    };

    const animate = () => {
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.02; // smaller easing = slower follow
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollPos.current}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll);
    animate();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <img
        src="/background.png"
        alt="background overlay"
        className="max-w-[65%] w-full h-auto opacity-50 object-contain"
      />
    </div>
  );
};

export default ParallaxBackground;
