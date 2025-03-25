
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek, addWeeks, isSameDay, isAfter, isBefore, isSameMonth } from 'date-fns';
import { sv } from 'date-fns/locale';

interface CalendarViewProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onSelectDate, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-2">
        <motion.button
          className="p-2 rounded-sm bg-brand-primary/10 text-brand-light/70 hover:bg-brand-primary hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentMonth(addWeeks(currentMonth, -1))}
        >
          &lt;
        </motion.button>
        <h2 className="text-lg font-medium text-brand-light/70">
          {format(currentMonth, 'MMMM yyyy', { locale: sv })}
        </h2>
        <motion.button
          className="p-2 rounded-sm bg-brand-primary/10 text-brand-light/70 hover:bg-brand-primary hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentMonth(addWeeks(currentMonth, 1))}
        >
          &gt;
        </motion.button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEEEEE'; // Use shortened day names
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-medium text-brand-light/70 text-xs py-1" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: sv })}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = addDays(startDate, 13); // Show only 2 weeks instead of 4
    const rows = [];
    let days = [];
    let day = startDate;
    const today = new Date();

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isToday = isSameDay(day, today);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isPast = isBefore(day, today) && !isSameDay(day, today);
        const isFuture = isAfter(day, today);
        const isCurrentMonth = isSameMonth(day, currentMonth);
        
        days.push(
          <motion.div 
            className={`
              relative p-1 h-12 sm:h-16 rounded-lg text-center cursor-pointer transition-colors duration-300
              ${isToday ? 'border-2 border-brand-primary' : 'border border-gray-200'}
              ${isSelected ? 'bg-white text-white' : (isPast ? 'bg-gray-100' : 'bg-white')}
              ${!isCurrentMonth ? 'opacity-50' : ''}
              hover:border-brand-primary
            `}
            key={day.toString()}
            onClick={() => onSelectDate(cloneDay)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={`text-xs ${isSelected ? 'text-black' : 'text-black'}`}>
              {format(day, 'd', { locale: sv })}
            </span>
            
            {isFuture && (
              <div className="mt-1 text-[8px]">
                {Math.random() > 0.7 ? (
                  <div className="bg-pastel-green text-brand-dark/70 rounded px-1 py-0.5">Ledig</div>
                ) : (
                  <div className="bg-pastel-pink text-brand-secondary/80 rounded px-1 py-0.5">Upptagen</div>
                )}
              </div>
            )}
            
            {isPast && (
              <div className="mt-1 text-[8px]">
                <div className="bg-gray-200 text-gray-500 rounded px-1 py-0.5">Passerad</div>
              </div>
            )}
            
            {isToday && (
              <div className="mt-1 text-[8px]">
                <div className="bg-brand-accent/20 text-brand-accent rounded px-1 py-0.5">Idag</div>
              </div>
            )}
          </motion.div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="p-3 rounded-sm">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CalendarView;

// whole calendar
//p-3 border-0 bg-brand-primary/10