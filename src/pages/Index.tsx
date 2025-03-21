
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AnimatedText from '../components/AnimatedText';

const Index = () => {
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
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          className="text-center max-w-4xl glass-panel p-8 md:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-2">
              Välkommen
            </span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              Humoristiskt Quiz & Kalender
            </h1>
            
            <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto">
              En lekfull upplevelse med överraskningar vid varje klick
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="glass-card p-6 md:p-8 mb-8 overflow-hidden"
          >
            {visible && (
              <AnimatedText 
                text="Hej virgins. En liten fågel viskade i mitt öra att ni är butthurt över att jag snor eran HB. Don't fret! Lösningen är här."
                className="text-xl text-left"
              />
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => navigate('/quiz')}
              className="btn-accent text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Starta Quizet
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
