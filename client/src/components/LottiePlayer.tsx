import { useEffect, useRef } from 'react';

interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  className?: string;
}

export default function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  className = '',
}: LottiePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load lottie-web script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      // Create lottie-player element dynamically
      const player = document.createElement('lottie-player');
      player.setAttribute('src', src);
      player.setAttribute('background', 'transparent');
      player.setAttribute('speed', speed.toString());
      player.setAttribute('style', 'width: 100%; height: 100%;');
      if (loop) player.setAttribute('loop', '');
      if (autoplay) player.setAttribute('autoplay', '');

      // Clear previous content and add new player
      playerRef.current.innerHTML = '';
      playerRef.current.appendChild(player);
    }
  }, [src, loop, autoplay, speed]);

  return <div ref={playerRef} className={className} />;
}
