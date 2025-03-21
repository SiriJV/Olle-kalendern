
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';

const Home = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
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
          <motion.div variants={itemVariants} className="mb-2">
            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-2">
              Välkommen
            </span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              Välkomna till Olle-Kalendern
            </h1>
            
            <p className="text-lg text-brand-dark/70 max-w-md mx-auto">
              En lekfull upplevelse med överraskningar vid varje klick
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="glass-card p-6 mb-6 overflow-hidden"
          >
            {visible && (
              <AnimatedText 
                text="Hej virgins. En liten fågel viskade i mitt öra att ni är butthurt över att jag snor eran HB. Don't fret! Lösningen är här."
                className="text-xl text-left"
              />
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex gap-4 justify-center">
            <motion.button
              onClick={() => navigate('/quiz')}
              className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Starta Quizet
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/calendar')}
              className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Till Kalendern
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
