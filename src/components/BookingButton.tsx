
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BookingButtonProps {
  onClick: () => void;
  text: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ onClick, text }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [canMove, setCanMove] = useState(true);

  const getRandomPosition = () => {
    // Get viewport dimensions for full screen movement
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    
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
    <motion.div
      className="relative"
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
  );
};

export default BookingButton;
