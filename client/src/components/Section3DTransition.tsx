import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Section3DTransitionProps {
  children: React.ReactNode;
  sectionId: string;
  delay?: number;
}

export default function Section3DTransition({
  children,
  sectionId,
  delay = 0,
}: Section3DTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create scroll-triggered animation
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: 15,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        delay,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
          markers: false,
        },
      }
    );

    // Parallax effect
    gsap.to(sectionRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      id={sectionId}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
