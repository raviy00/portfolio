import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThreeScene } from '@/lib/ThreeScene';
import gsap from 'gsap';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new ThreeScene(containerRef.current);
    const scene = sceneRef.current;

    // Create background geometry
    const geometries: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const type = ['box', 'sphere', 'torus'][i % 3] as 'box' | 'sphere' | 'torus';
      const geo = scene.createWireframeGeometry(type);
      geo.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      geometries.push(geo);
    }

    // Animate geometries on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      geometries.forEach((geo, index) => {
        geo.rotation.x += 0.001 * (index + 1);
        geo.rotation.y += 0.002 * (index + 1);
        geo.position.y = (Math.random() - 0.5) * 10 + scrollY * 0.001;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        width: '100%',
        height: '100vh',
      }}
    />
  );
}
