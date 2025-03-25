

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeartsAnimation from './EmojiRain';


interface SurpriseProps {
  isVisible: boolean;
  onClose: () => void;
}

const Surprise: React.FC<SurpriseProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [showSpotify, setShowSpotify] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      const rickRollAudio = new Audio('/audio/rick-roll-v-2 (1).mp3');
      rickRollAudio.play().catch(err => console.error("Audio error:", err));
      setCurrentAudio(rickRollAudio);
      
      return () => {
        rickRollAudio.pause();
        setCurrentAudio(null);
      };
    } else {
      if (currentAudio) currentAudio.pause();
      setShowSpotify(false);
    }
  }, [isVisible]);

  const handleNextClick = () => {
    if (currentAudio) currentAudio.pause();
    
    const tupacAudio = new Audio('/audio/2pac-hit-em-up.mp3');
    tupacAudio.play().catch(err => console.error("Audio error:", err));
    setCurrentAudio(tupacAudio);
    setShowSpotify(true);
  };
  
  const handleReturnHome = () => {
    onClose();
    navigate('/');
  };

  if (!isVisible) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/100 z-50 flex flex-col items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <HeartsAnimation />
        {!showSpotify ? (
          <motion.div
          className="flex flex-col items-center justify-center text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif" 
            alt="Surprise GIF" 
            className="max-h-[40vh] w-auto rounded-lg mb-6"
          />
          <p className="w-[500px] text-white text-lg mb-6 text-center">
            Okej, här är sanningen: Jag orkade inte bygga ett helt fungerande bokningssystem... Ni får helt enkelt bli snabbare om ni vill haffa honom. Git gud, så att säga.
          </p>
          <motion.button
            className="bg-brand-primary text-white px-4 py-2 rounded-sm font-medium text-lg w-fit"
            onClick={handleNextClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nästa
          </motion.button>
        </motion.div>
        
          
        ) : (
          <motion.div
            className="text-center max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white text-xl mb-4">Hjälplinje:</h3>
            <a href="tel:0800-123456" className="text-brand-primary text-lg mb-6 block hover:underline">
              0800-123456
            </a>
            <p className="text-white text-lg mb-8">
              För dagar utan Olle, ring någon och prata. Du klarar detta.
            </p>
            
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                className="bg-brand-secondary text-white px-4 py-2 rounded-sm font-medium text-lg"
                onClick={handleReturnHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tillbaka till början
              </motion.button>
              
              {/* <motion.button
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Stäng
              </motion.button> */}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body // ✅ This makes sure it's not trapped inside Calendar
  );
};

export default Surprise;
