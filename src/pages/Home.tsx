
import React, { useState } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pastel-blue/30 to-pastel-pink/30 p-4">
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          className="text-center max-w-xl glass-panel p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {!showQuizIntro ? (
            <>
              <div className="glass-card p-6 mb-6 overflow-hidden">
                <p className="text-lg text-brand-dark">
                  Hej virgins. En liten fågel viskade i mitt öra att ni är butthurt över att jag snor eran HB. Don't fret! Lösningen är här.
                </p>
              </div>
              
              <motion.button
                onClick={handleNextClick}
                className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nästa
              </motion.button>
            </>
          ) : (
            <>
              <div className="glass-card p-6 mb-6 overflow-hidden">
                <p className="text-lg text-brand-dark">
                  Men först... Vänligen bevisa att ni inte är incels genom att svara på dessa frågor om kvinnor i historien.
                </p>
              </div>
              
              <motion.button
                onClick={handleStartQuiz}
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
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
