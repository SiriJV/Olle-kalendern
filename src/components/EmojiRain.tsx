import { useEffect, useRef } from 'react';

const HeartsAnimation = () => {
  const heartContainerRef = useRef<HTMLDivElement | null>(null);

  const createHearts = () => {
    if (!heartContainerRef.current) return;

    const emojis = ['\u{1F595}'];
    
    for (let i = 0; i < 200; i++) {
      const heart = document.createElement('span');
      heart.classList.add('absolute', 'text-2xl', 'animate-fall');

      // Random emoji from the array
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const randomX = Math.random() * window.innerWidth;
      const randomSize = Math.random() * 30 + 20;
      const duration = Math.random() * 3 + 2;
      const startY = Math.random() * -100 - 50;

      heart.style.left = `${randomX}px`;
      heart.style.fontSize = `${randomSize}px`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.top = `${startY}px`;

      heartContainerRef.current.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }
  };

  useEffect(() => {
    createHearts();
  }, []);

  return <div ref={heartContainerRef} className='absolute inset-0 pointer-events-none' />;
};

export default HeartsAnimation;
