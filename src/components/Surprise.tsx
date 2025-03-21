
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurpriseProps {
  isVisible: boolean;
  onClose: () => void;
}

const Surprise: React.FC<SurpriseProps> = ({ isVisible, onClose }) => {
  const [showRickRoll, setShowRickRoll] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (isVisible) {
      let audio: HTMLAudioElement | null = null;
      
      if (showRickRoll) {
        audio = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Never+Gonna+Give+You+Up-+Original&filename=mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3');
      } else {
        audio = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Hit+Em+Up&filename=nt/NTI1NTQyNTI1NTQ3_hbf8YrJi6mU.MP3');
      }
      
      audio.loop = true;
      audio.play().catch(error => console.error("Audio playback error:", error));
      setAudioPlaying(audio);
      
      if (showRickRoll) {
        const timer = setTimeout(() => {
          setShowRickRoll(false);
          audio?.pause();
          setAudioPlaying(null);
        }, 10000);
        
        return () => clearTimeout(timer);
      }
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
  }, [isVisible, showRickRoll, audioPlaying]);

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
        
        {showRickRoll ? (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif" 
              alt="Surprise GIF" 
              className="max-h-[50vh] rounded-lg mb-6"
            />
            <h2 className="text-white text-2xl mb-6">You Just Got Rick Rolled!</h2>
            <motion.button
              className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
              onClick={() => setShowRickRoll(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Fortsätt till överraskning
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center max-w-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://media.tenor.com/VX4P3-GKJzQAAAAM/tupac-dancing.gif" 
              alt="Tupac GIF" 
              className="max-h-[50vh] rounded-lg mb-6 mx-auto"
            />
            
            <h2 className="text-white text-2xl mb-4">Git Gud - Sadboy Edition</h2>
            
            <div className="glass-panel p-6 mb-6">
              <p className="text-brand-dark mb-4">
                För dagar utan Olle, ring någon och prata. Du klarar detta.
              </p>
              <div className="text-xl font-mono bg-black/20 p-3 rounded-lg text-brand-primary">
                070-123 45 67
              </div>
            </div>
            
            <a 
              href="https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Lyssna på Spotify
            </a>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Surprise;
