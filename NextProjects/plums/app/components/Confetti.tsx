import React, {useEffect, useRef } from 'react';

const SHAPES = ['square', 'triangle'];
const COLOR_DIGIT = "ABCDEF1234567890";

const Confetti = ({ isActive }: { isActive: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      generateConfetti();
    }
  });

  const generateRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)];
    }
    return color;
  };

  const generateConfetti = () => {
    const container = containerRef.current;
    if (container) {
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const positionX = Math.random() * window.innerWidth;
        const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

        // Set confetti styles
        confetti.style.position = 'absolute';
        confetti.style.left = `${positionX}px`;
        confetti.style.top = `-${size}px`; // Start from the top
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = generateRandomColor();
        confetti.style.borderRadius = SHAPES[Math.random() < 0.5 ? 0 : 1] === 'square' ? '0%' : '50%'; // Square or circle
        confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear`;

        container.appendChild(confetti);

        // Remove confetti element after animation ends
        setTimeout(() => {
          container.removeChild(confetti);
        }, 5000);
      }
    }
  };

  return <div ref={containerRef} className="confetti-container" />;
};

export default Confetti;
