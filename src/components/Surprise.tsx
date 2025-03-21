
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
      // Play Rick Roll immediately
      const rickRollAudio = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Never+Gonna+Give+You+Up-+Original&filename=mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3');
      rickRollAudio.play().catch(error => console.error("Audio playback error:", error));
      setCurrentAudio(rickRollAudio);
      
      return () => {
        if (rickRollAudio) {
          rickRollAudio.pause();
        }
      };
    } else {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      setShowSpotify(false);
    }
  }, [isVisible]);

  const handleNextClick = () => {
    // Stop the Rick Roll audio
    if (currentAudio) {
      currentAudio.pause();
    }
    
    // Play Tupac
    const tupacAudio = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Hit+Em+Up+Intro&filename=mz/Mzg1ODMxNTIzMzg1ODUy_JzthsfvUY24.MP3');
    tupacAudio.play().catch(error => console.error("Audio playback error:", error));
    setCurrentAudio(tupacAudio);
    setShowSpotify(true);
  };
  
  const handleReturnHome = () => {
    onClose();
    navigate('/');
  };

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
        
        {!showSpotify ? (
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
            <h2 className="text-white text-2xl mb-6">Git Gud</h2>
            <motion.button
              className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
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
            <iframe 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX59NCqCqJtoH" 
              width="100%" 
              height="380" 
              frameBorder="0" 
              allow="encrypted-media"
              className="mb-8 rounded-lg"
            ></iframe>
            
            <h3 className="text-white text-xl mb-4">Hjälplinje:</h3>
            <p className="text-white text-lg mb-8">
              För dagar utan Olle, ring någon och prata. Du klarar detta.
            </p>
            
            <a href="tel:0800-123456" className="text-brand-primary text-lg mb-6 block hover:underline">
              0800-123456
            </a>
            
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-medium"
                onClick={handleReturnHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tillbaka till början
              </motion.button>
              
              <motion.button
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Stäng
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Surprise;
