
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  className = "" 
}) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={`w-full bg-white/50 rounded-full h-4 overflow-hidden shadow-inner ${className}`}>
      <motion.div 
        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <div className="flex justify-between px-2 -mt-4 text-xs text-brand-dark/70">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ 
              opacity: index < currentStep ? 1 : 0.3,
              y: 0
            }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            {index + 1}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
