
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showQuizIntro, setShowQuizIntro] = useState(false);
  
  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  const handleNextClick = () => {
    setShowQuizIntro(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  const HomeAudio = 'public/audio/rat-dance-music.mp3';

    useEffect(() => {
      const audio = new Audio(HomeAudio);
      audio.loop = true;
      audio.volume = 0.5;
    
      const playAudio = () => {
        audio.play().catch(err => console.log("Autoplay blocked:", err));
      };
    
      document.addEventListener('DOMContentLoaded', playAudio); // Ensure it plays on page load
    
      playAudio(); // Try playing immediately
    
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }, []);
    
    

  return (
    <div className="min-h-screen flex flex-col p-4 justify-center">
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          className="text-center max-w-xl glass-panel p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {!showQuizIntro ? (
            <>
              <div className="glass-card overflow-hidden">
                <h3 className="text-brand-light mb-6">Hej virgins!</h3>
                <p className="text-lg text-left text-brand-light/70 mb-5">
                  En liten fågel viskade i mitt öra att ni är butthurt över att förlora tid med er homeboy. Don't fret! Lösningen är här.<p/>
                </p>
                <p className="text-lg text-left text-brand-light/70">
                  Eftersom Olles tid är mycket eftertraktad har jag fixat en kalender där ni kan boka honom.
                </p>
              </div>
              
              <motion.button
                onClick={handleNextClick}
                className="bg-brand-secondary text-white mt-6 px-4 py-2 rounded-sm font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nästa
              </motion.button>
            </>
          ) : (
            <>
              <div className="glass-card overflow-hidden">
                <p className="text-lg text-brand-light/70 text-left">
                  Men först... Vänligen bevisa att ni inte är incels genom att svara på dessa frågor om kvinnor i historien.
                </p>
              </div>
              
              <motion.button
                onClick={handleStartQuiz}
                className="bg-brand-primary text-white mt-6 px-4 py-2 rounded-sm font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Starta quiz
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
