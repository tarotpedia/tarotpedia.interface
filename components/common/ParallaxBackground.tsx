'use client';
import { TarotStar } from '@/components/icons/TarotStar';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ParallaxBackground: React.FC = () => {
  const pathname = usePathname();
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [celestialObjects, setCelestialObjects] = useState<any[]>([]);

  useEffect(() => {
    const objects: any[] = [];
    for (let i = 0; i < 15; i++) {
      objects.push({
        type: 'star',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 6,
        opacity: Math.random() * 0.6 + 0.1,
        rotation: Math.random() * 360,
        floatSpeed: Math.random() * 0.3 + 0.1,
        floatRange: Math.random() * 20 + 10,
        rotationSpeed: Math.random() * 0.5 + 0.1,
      });
    }

    for (let i = 0; i < 10; i++) {
      const isLeft = i % 2 === 0;
      const x = isLeft ? Math.random() * 25 : Math.random() * 25 + 75;

      objects.push({
        type: 'card',
        x: x,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        opacity: 0.2,
        rotation: Math.random() * 360,
        floatSpeed: Math.random() * 0.15 + 0.05,
        floatRange: Math.random() * 15 + 8,
        rotationSpeed: Math.random() * 0.2 + 0.05,
        flipSpeed: Math.random() * 0.1 + 0.05,
        flipOffset: Math.random() * Math.PI * 2,
      });
    }

    setCelestialObjects(objects);
  }, []);

  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.transform = 'translateY(0px)';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!celestialObjects.length) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (bgRef.current) {
        const stars = bgRef.current.querySelectorAll('[data-celestial]');
        stars.forEach((star, index) => {
          const obj = celestialObjects[index];
          const floatY = Math.sin(elapsed * obj.floatSpeed) * obj.floatRange;
          const floatX = Math.cos(elapsed * obj.floatSpeed * 0.7) * (obj.floatRange * 0.5);
          let transform = `translate(${floatX}px, ${floatY}px)`;

          if (obj.type === 'star' || obj.type === 'moon') {
            // Both now use TarotStar, so rotation applies
            const rotation = obj.rotation + elapsed * obj.rotationSpeed * 10;
            transform += ` rotate(${rotation}deg)`;
          }

          if (obj.type === 'card') {
            const flipAngle = (elapsed * obj.flipSpeed + obj.flipOffset) % (Math.PI * 2);
            const flipRotation = Math.cos(flipAngle) * 180;
            transform += ` rotateY(${flipRotation}deg)`;
          }

          (star as HTMLElement).style.transform = transform;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [celestialObjects]);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 top-0 left-0 z-0 flex items-center justify-center pointer-events-none will-change-transform overflow-hidden"
    >
      <div className="relative w-full h-full overflow-hidden">
        {celestialObjects.map((obj, index) => {
          const baseStyle = {
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: `${obj.size}px`,
            height: `${obj.size}px`,
            position: 'absolute' as const,
          };

          if (obj.type === 'star') {
            return (
              <TarotStar
                key={index}
                data-celestial
                className="text-[#c19670] transition-opacity duration-1000"
                style={{ ...baseStyle, opacity: obj.opacity }}
              />
            );
          }

          if (obj.type === 'card') {
            return (
              <Image
                key={index}
                data-celestial
                src="/cardBack.svg"
                alt="Tarot Card Back"
                className="filter sepia brightness-125 hue-rotate-15"
                style={{ ...baseStyle, opacity: obj.opacity, transformStyle: 'preserve-3d' }}
                width={obj.size}
                height={obj.size}
              />
            );
          }

          // This handles the 'moon' type, now rendering TarotStar
          return <TarotStar key={index} data-celestial className="text-[#c19670] opacity-60" style={baseStyle} />;
        })}
      </div>
    </div>
  );
};

export default ParallaxBackground;
