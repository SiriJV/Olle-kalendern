
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
      <div className="flex items-center justify-between mb-4">
        <motion.button
          className="p-2 rounded-full bg-white/70 text-brand-dark hover:bg-brand-primary hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentMonth(addWeeks(currentMonth, -1))}
        >
          &lt;
        </motion.button>
        <h2 className="text-xl font-medium text-brand-dark">
          {format(currentMonth, 'MMMM yyyy', { locale: sv })}
        </h2>
        <motion.button
          className="p-2 rounded-full bg-white/70 text-brand-dark hover:bg-brand-primary hover:text-white transition-all duration-300"
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
    const dateFormat = 'EEEE';
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-medium text-brand-dark/70 text-sm py-2" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: sv })}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = addDays(startDate, 27);
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
              relative p-4 h-24 sm:h-32 rounded-lg text-center cursor-pointer transition-colors duration-300
              ${isToday ? 'border-2 border-brand-primary' : 'border border-gray-200'}
              ${isSelected ? 'bg-brand-primary text-white' : (isPast ? 'bg-gray-100' : 'bg-white')}
              ${!isCurrentMonth ? 'opacity-50' : ''}
              hover:border-brand-primary
            `}
            key={day.toString()}
            onClick={() => onSelectDate(cloneDay)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={`text-sm ${isSelected ? 'text-white/80' : 'text-brand-dark/60'}`}>
              {format(day, 'd', { locale: sv })}
            </span>
            
            {isFuture && (
              <div className="mt-2 text-xs">
                {Math.random() > 0.7 ? (
                  <div className="bg-pastel-green text-brand-dark/70 rounded px-1 py-0.5">Tillgänglig</div>
                ) : (
                  <div className="bg-pastel-pink text-brand-secondary/80 rounded px-1 py-0.5">Upptagen</div>
                )}
              </div>
            )}
            
            {isPast && (
              <div className="mt-2 text-xs">
                <div className="bg-gray-200 text-gray-500 rounded px-1 py-0.5">Passerad</div>
              </div>
            )}
            
            {isToday && (
              <div className="mt-2 text-xs">
                <div className="bg-brand-accent/20 text-brand-accent rounded px-1 py-0.5">Idag</div>
              </div>
            )}
          </motion.div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="glass-panel p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CalendarView;
