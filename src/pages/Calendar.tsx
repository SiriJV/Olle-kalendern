
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import BookingButton from '../components/BookingButton';
import Surprise from '../components/Surprise';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingArea, setShowBookingArea] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowBookingArea(true);
  };
  
  const handleBookingClick = () => {
    setShowSurprise(true);
  };
  
  const closeSurprise = () => {
    setShowSurprise(false);
  };

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
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            Boka en Tid
          </h1>
          <p className="text-brand-dark/70 max-w-2xl mx-auto">
            Välj ett datum för att boka en tid. Se om du har tur att kunna fånga honom!
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <CalendarView 
            onSelectDate={handleDateSelect} 
            selectedDate={selectedDate} 
          />
        </motion.div>
        
        {showBookingArea && (
          <motion.div
            className="mt-8 glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium mb-4 text-center">
              Boka för {selectedDate && new Intl.DateTimeFormat('sv-SE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }).format(selectedDate)}
            </h2>
            
            <p className="text-center mb-6 text-brand-dark/70">
              Försök att fånga Olle genom att klicka på knappen nedan!
            </p>
            
            <BookingButton 
              onClick={handleBookingClick} 
              text="Boka honom" 
            />
            
            <p className="text-center mt-4 text-sm text-brand-dark/60 italic">
              Knappen kanske är lite blyg och försöker komma undan...
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <Surprise 
        isVisible={showSurprise}
        onClose={closeSurprise}
      />
    </Layout>
  );
};

export default Calendar;
