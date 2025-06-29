import React, { useState, useEffect, useRef } from 'react';

const SHAPES = ['square', 'triangle'];
const COLOR_DIGIT = "ABCDEF1234567890";

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, onComplete }) => {
  const [isConfettiActive, setConfettiActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger && !isConfettiActive) {
      console.log('🎉 Triggering confetti celebration...');
      setConfettiActive(true);
      generateConfetti();
    }
  }, [trigger, isConfettiActive]);

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
      console.log('🎊 Generating confetti particles...');
      
      // Clear any existing confetti
      container.innerHTML = '';
      
      // Generate confetti particles
      for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        
        // Position confetti in the central area (not too close to edges)
        const positionX = Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.2);
        const positionY = Math.random() * (window.innerHeight * 0.3) + (window.innerHeight * 0.1);
        const rotation = Math.random() * 360;
        const size = Math.floor(Math.random() * (16 - 8 + 1)) + 8; // 8-16px size
        
        // Set confetti styles
        confetti.style.left = `${positionX}px`;
        confetti.style.top = `${positionY}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.className = 'confetti ' + SHAPES[Math.floor(Math.random() * SHAPES.length)];
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = generateRandomColor();
        
        // Append confetti to the container
        container.appendChild(confetti);
        
        // Remove confetti element after animation duration (4 seconds)
        setTimeout(() => {
          if (container.contains(confetti)) {
            container.removeChild(confetti);
          }
        }, 4000);
      }
      
      console.log('✨ Confetti particles generated successfully');
      
      // Reset the confetti state and call onComplete after animation
      setTimeout(() => {
        console.log('🏁 Confetti animation complete');
        setConfettiActive(false);
        if (onComplete) {
          onComplete();
        }
      }, 4000);
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10000]" 
      ref={containerRef} 
      id="confetti-container"
    />
  );
};

export default ConfettiEffect;