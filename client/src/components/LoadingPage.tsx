import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';

interface LoadingPageProps {
  onComplete: () => void;
}

export default function LoadingPage({ onComplete }: LoadingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quick fade out and complete
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center overflow-hidden">
      <Enhanced3DBackground />
      
      {/* Loading Content - Minimal */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-widest text-foreground">
          Loading
        </h1>
      </div>
    </div>
  );
}
