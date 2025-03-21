
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const getNavLinkClass = (path: string) => {
    const baseClasses = "px-4 py-2 rounded-full transition-all duration-300";
    return location.pathname === path 
      ? `${baseClasses} bg-brand-primary text-white font-medium` 
      : `${baseClasses} text-brand-dark/70 hover:text-brand-primary hover:bg-brand-primary/10`;
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pastel-blue/30 to-pastel-pink/30">
      <header className="py-4 px-6 w-full">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center gap-2 sm:gap-4 glass-panel py-2 px-3 sm:px-6">
            <Link to="/" className={getNavLinkClass("/")}>Hem</Link>
            <Link to="/quiz" className={getNavLinkClass("/quiz")}>Quiz</Link>
            <Link to="/calendar" className={getNavLinkClass("/calendar")}>Kalender</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      
      <footer className="w-full py-4 bg-white/50 backdrop-blur-sm border-t border-white/30">
        <div className="container mx-auto text-center text-sm text-brand-dark/60">
          <p>© {new Date().getFullYear()} | Designed with ♥ och sarkasm</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
