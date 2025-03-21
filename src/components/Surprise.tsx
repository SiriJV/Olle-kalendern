
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurpriseProps {
  isVisible: boolean;
  onClose: () => void;
}

const Surprise: React.FC<SurpriseProps> = ({ isVisible, onClose }) => {
  const [audioPlaying, setAudioPlaying] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (isVisible) {
      const audio = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Never+Gonna+Give+You+Up-+Original&filename=mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3');
      audio.loop = true;
      audio.play().catch(error => console.error("Audio playback error:", error));
      setAudioPlaying(audio);
    } else {
      if (audioPlaying) {
        audioPlaying.pause();
        setAudioPlaying(null);
      }
    }
    
    return () => {
      if (audioPlaying) {
        audioPlaying.pause();
        setAudioPlaying(null);
      }
    };
  }, [isVisible, audioPlaying]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          X
        </motion.button>
        
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif" 
            alt="Surprise GIF" 
            className="max-h-[70vh] rounded-lg mb-6"
          />
          <h2 className="text-white text-2xl mb-6">DU BLEV RICK-ROLLAD!</h2>
          <motion.button
            className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nästa skämt tack!
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Surprise;
