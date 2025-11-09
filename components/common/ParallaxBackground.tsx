'use client';
import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Moon, Star } from 'lucide-react';

const ParallaxBackground: React.FC = () => {
  const pathname = usePathname();
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [celestialObjects, setCelestialObjects] = useState<any[]>([]);

  useEffect(() => {
    const objects: any[] = [];

    for (let i = 0; i < 20; i++) {
      objects.push({
        type: 'star',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8,
        opacity: Math.random() * 0.8 + 0.2,
        rotation: Math.random() * 360,
        floatSpeed: Math.random() * 1.5 + 0.3,
        floatRange: Math.random() * 40 + 20,
        rotationSpeed: Math.random() * 2 + 0.2,
      });
    }

    for (let i = 0; i < 30; i++) {
      objects.push({
        type: 'moon',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8,
        opacity: Math.random() * 0.8 + 0.2,
        rotation: Math.random() * 360,
        floatSpeed: Math.random() * 0.8 + 0.1,
        floatRange: Math.random() * 60 + 30,
        rotationSpeed: Math.random() * 1 + 0.1,
      });
    }

    for (let i = 0; i < 15; i++) {
      const isLeft = i % 2 === 0;
      const x = isLeft ? Math.random() * 25 : Math.random() * 25 + 75;

      objects.push({
        type: 'card',
        x: x,
        y: Math.random() * 100,
        size: Math.random() * 40 + 30,
        opacity: 0.25,
        rotation: Math.random() * 360,
        floatSpeed: Math.random() * 0.5 + 0.1,
        floatRange: Math.random() * 30 + 15,
        rotationSpeed: Math.random() * 0.8 + 0.1,
        flipSpeed: Math.random() * 0.3 + 0.1,
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
    const scrollPos = { current: 0 };
    const targetPos = { current: 0 };
    let animationFrame: number;

    const onScroll = () => {
      targetPos.current = window.scrollY * 0.3;
    };

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.02;

      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollPos.current}px)`;
        const stars = bgRef.current.querySelectorAll('[data-celestial]');
        stars.forEach((star, index) => {
          const obj = celestialObjects[index];
          const floatY = Math.sin(elapsed * obj.floatSpeed) * obj.floatRange;
          const floatX = Math.cos(elapsed * obj.floatSpeed * 0.7) * (obj.floatRange * 0.5);
          let transform = `translate(${floatX}px, ${floatY}px)`;

          if (obj.type === 'star') {
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

    window.addEventListener('scroll', onScroll);
    animate();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [celestialObjects]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <div className="relative w-full h-full">
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
              <Star
                key={index}
                data-celestial
                className="text-yellow-400 transition-opacity duration-1000"
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

          return <Moon key={index} data-celestial className="text-yellow-300 opacity-60" style={baseStyle} />;
        })}
      </div>
    </div>
  );
};

export default ParallaxBackground;
