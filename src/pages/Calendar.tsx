import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Surprise from '../components/Surprise';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [vibe, setVibe] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showSurprise, setShowSurprise] = useState(false); // State to show/hide Surprise

  const handleHover = () => {
    const isFormComplete = selectedDate && vibe; // Check if all inputs are filled

    if (!isFormComplete) {
      alert('Fyll i alla fält innan du kan boka!'); // Show an alert if form is incomplete
      return;
    }

    if (hoverCount < 0) {
      setButtonPosition({
        x: Math.random() * 100 - 600, // Små rörelser åt sidorna
        y: Math.random() * 100 - 200,
      });
      setHoverCount(hoverCount + 1);
    } else if (hoverCount === 0) {
      // Efter 3:e hover: Visa Surprise
      setShowSurprise(true);
    }
  };
  

  // const handleCheckboxChange = (activity: string) => {
  //   setActivities(prev =>
  //     prev.includes(activity)
  //       ? prev.filter(a => a !== activity)
  //       : [...prev, activity]
  //   );
  // };

  const closeSurprise = () => {
    setShowSurprise(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 glass-panel rounded-lg ">
      <h1 className="text-2xl font-bold text-left text-red-500 mb-4">
       Välkomna till Olle-kalendern
      </h1>
      <p className="text-brand-light/70 text-left text-lg mb-6">
       ❤️ Vi alla vet att bromance är viktigt. Därför kan du nu boka en exklusiv dejt med Olle. Välj ett datum och säkra din plats! ❤️
      </p>

      {/* Välj datum */}
      <label className="block font-medium mb-1 text-left text-brand-light/70">Välj datum:</label>
      <input
        type="date"
        className="w-full border p-2 text-brand-light/70 rounded-sm mb-4 bg-brand-primary/10"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Aktiviteter att kryssa i */}
      {/* <label className="block font-medium mb-1 text-left text-brand-light/70">Vad vill du göra?</label>
      <div className="mb-4 text-brand-light/70">
        {['Middag', 'Bowling', 'Promenad vid vattnet', 'Netflix & chill'].map((activity) => (
          <label key={activity} className="flex items-center space-x-2">
            <input
              type="radio"
              checked={activities.includes(activity)}
              // onChange={() => handleCheckboxChange(activity)}
            />
            <span>{activity}</span>
          </label>
        ))} */}

        {/* Aktiviteter att kryssa i */}
  <label className="block font-medium mb-1 text-left text-brand-light/70">Vad vill du göra?</label>
  <div className="mb-4 text-brand-light/70">
    {['Middag', 'Bowling', 'Promenad vid vattnet', 'Netflix & chill'].map((activity) => (
      <label key={activity} className="flex items-center space-x-2">
        <input
          type="radio"
          name="activity" // This ensures only one option can be selected at a time
          value={activity}
          // checked={selectedActivity === activity}
          // onChange={() => setSelectedActivity(activity)}
        />
        <span>{activity}</span>
      </label>
    ))}

      </div>

      {/* Välj stämning */}
      <label className="block font-medium mb-1 text-left text-brand-light/70">Välj stämning:</label>
      <select
        className="w-full border p-2 rounded-md mb-4 text-brand-light/70 bg-brand-primary/10"
        value={vibe}
        onChange={(e) => setVibe(e.target.value)}
      >
        <option value="" className="text-black">Välj...</option>
        <option value="romantisk" className="text-black">Romantisk 🌹</option>
        <option value="chill" className="text-black">Chill 🍕</option>
        <option value="äventyrlig" className="text-black">Äventyrlig 🎢</option>
      </select>

      {/* Special requests */}
      <label className="block font-medium mb-1 text-left text-brand-light/70">Önskemål eller special requests:</label>
      <input
        className="w-full border p-2 rounded-md mb-4 text-brand-light/70 bg-brand-primary/10"
        // rows={3}
        type="text"
        placeholder="Skriv något speciellt..."
        value={specialRequest}
        onChange={(e) => setSpecialRequest(e.target.value)}
      ></input>

      {/* Bokningsknapp med rörelse */}
      {/* <motion.div
        className="flex justify-center"
        animate={{ x: buttonPosition.x, y: buttonPosition.y }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <motion.button
          className="bg-red-500 text-white px-4 py-2 rounded-sm text-lg font-medium transition-all"
          onHoverStart={handleHover}
        >
          Boka
        </motion.button>
      </motion.div> */}

      {/* Bokningsknapp med rörelse */}
<motion.div
  className="flex justify-end" // Changed from 'justify-center' to 'justify-end' to move it to the right
  animate={{ x: buttonPosition.x, y: buttonPosition.y }}
  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
>
  <motion.button
    className="bg-red-500 text-white px-4 py-2 rounded-sm text-lg font-medium transition-all"
    onHoverStart={handleHover}
  >
    Boka
  </motion.button>
</motion.div>


      {/* Surprise Modal */}
      {showSurprise && <Surprise isVisible={showSurprise} onClose={closeSurprise} />}
    </div>
  );
};

export default Calendar;
