
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BookingButtonProps {
  onClick: () => void;
  text: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ onClick, text }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [canMove, setCanMove] = useState(true);
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

  const handleHover = () => {
    if (!canMove) return;
    
    setHoverCount(prev => prev + 1);
    setPosition(getRandomPosition());
    
    // Stop moving after 3 hovers
    if (hoverCount >= 2) {
      setCanMove(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[200px] flex items-center justify-center overflow-hidden"
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
          onClick={onClick}
          onHoverStart={canMove ? handleHover : undefined}
          className="bg-brand-secondary text-white px-8 py-4 rounded-lg font-medium shadow-button transition-all"
          whileHover={{ scale: canMove ? 1.05 : 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {text}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookingButton;
