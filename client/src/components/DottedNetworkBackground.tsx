import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function DottedNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with DPI scaling for sharpness
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Create dots
    const dotsCount = 50;
    const dots: Dot[] = [];
    const connectionDistance = 150;

    for (let i = 0; i < dotsCount; i++) {
      dots.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    // Animation loop
    const animate = () => {
      // Get current theme
      const isDark = document.documentElement.classList.contains('dark');
      const dotColor = isDark ? 'rgba(255, 100, 100, 0.5)' : 'rgba(200, 50, 50, 0.4)';
      const lineColor = isDark ? 'rgba(255, 100, 100, 0.1)' : 'rgba(200, 50, 50, 0.1)';
      const bgColor = isDark ? 'rgba(13, 13, 13, 0.02)' : 'rgba(255, 255, 255, 0.02)';

      // Clear canvas with fade effect
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw dots
      dots.forEach((dot, i) => {
        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x - dot.radius < 0 || dot.x + dot.radius > window.innerWidth) {
          dot.vx *= -1;
          dot.x = Math.max(dot.radius, Math.min(window.innerWidth - dot.radius, dot.x));
        }
        if (dot.y - dot.radius < 0 || dot.y + dot.radius > window.innerHeight) {
          dot.vy *= -1;
          dot.y = Math.max(dot.radius, Math.min(window.innerHeight - dot.radius, dot.y));
        }

        // Draw dot
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[j].x - dot.x;
          const dy = dots[j].y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}
