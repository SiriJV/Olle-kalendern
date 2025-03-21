import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BookingButtonProps {
  onClick: () => void;
  text: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ onClick, text }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomPosition = () => {
    if (!containerRef.current || !buttonRef.current) return { x: 0, y: 0 };
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    return {
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    };
  };

  const handleClick = () => {
    setAttempts(attempts + 1);
    
    // After 5 attempts or 20% random chance after 3 attempts, let them click it
    if (attempts >= 5 || (attempts >= 3 && Math.random() < 0.2)) {
      onClick();
      return;
    }
    
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 500);
    setPosition(getRandomPosition());
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !containerRef.current || !isMoving) return;
      
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
      );
      
      // If mouse is getting close to the button, move it away
      if (distance < 200) {
        const angle = Math.atan2(mouseY - buttonCenterY, mouseX - buttonCenterX);
        const moveAwayX = Math.cos(angle + Math.PI) * 100;
        const moveAwayY = Math.sin(angle + Math.PI) * 100;
        
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        let newX = position.x + moveAwayX;
        let newY = position.y + moveAwayY;
        
        // Keep button within container bounds
        newX = Math.max(-maxX / 2, Math.min(newX, maxX / 2));
        newY = Math.max(-maxY / 2, Math.min(newY, maxY / 2));
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position, isMoving]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[300px] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        ref={buttonRef}
        className="absolute"
        animate={{
          x: position.x,
          y: position.y,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <motion.button
          onClick={handleClick}
          className="bg-brand-secondary text-white px-8 py-4 rounded-lg font-medium shadow-button transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {text}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookingButton;
