import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showResult?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep = 0,
  totalSteps = 6,
  showResult,
  className = "",
}) => {
  const progressPercentage = showResult ? 100 : (currentStep / totalSteps) * 100; // Ensure 100% on results

  // Calculate the progress as a percentage
  const progress = ((currentStep -1) / totalSteps) * 100;

  return (
    <div className={`w-full bg-white rounded-full h-4 overflow-hidden shadow-inner ${className}`}>
      <motion.div
        className="h-full bg-[#a9ca47] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
    // <div className="w-full bg-gray-200 rounded-full h-2.5">
    //   <div
    //     className="bg-brand-primary h-2.5 rounded-full transition-all duration-300"
    //   />
    // </div>
  );
};

export default ProgressBar;

