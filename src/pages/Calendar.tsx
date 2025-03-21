
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pastel-blue/30 to-pastel-pink/30 p-4">
      <motion.div
        className="max-w-lg mx-auto pt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            Välkomna till Olle-Kalendern
          </h1>
          <p className="text-brand-dark/70 max-w-md mx-auto">
            Försök fånga den mystiska Olle genom att trycka på knappen (om du kan)!
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="max-h-[250px] overflow-y-auto mb-4">
          <CalendarView 
            onSelectDate={handleDateSelect} 
            selectedDate={selectedDate} 
          />
        </motion.div>
        
        {selectedDate && (
          <motion.div
            className="mt-4 flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookingButton 
              onClick={handleBookingClick} 
              text="Fånga Olle (om du kan)" 
            />
          </motion.div>
        )}
      </motion.div>
      
      <Surprise 
        isVisible={showSurprise}
        onClose={closeSurprise}
      />
    </div>
  );
};

export default Calendar;
