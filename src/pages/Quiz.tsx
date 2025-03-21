
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import QuizQuestion, { QuizOption } from '../components/QuizQuestion';

interface Question {
  id: string;
  text: string;
  options: QuizOption[];
}

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  
  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Vilket år fick kvinnor rösträtt i Sverige?',
      options: [
        { id: 'q1-a', text: '1921', isCorrect: true },
        { id: 'q1-b', text: '1963', isCorrect: false },
        { id: 'q1-c', text: '2003', isCorrect: false },
        { id: 'q1-d', text: 'Vet ej, min mamma brukar rösta åt mig.', isCorrect: false },
      ],
    },
    {
      id: 'q2',
      text: 'Vilket land var först i världen med att ge kvinnor rösträtt?',
      options: [
        { id: 'q2-a', text: 'Nya Zeeland', isCorrect: true },
        { id: 'q2-b', text: 'USA', isCorrect: false },
        { id: 'q2-c', text: 'Frankrike', isCorrect: false },
        { id: 'q2-d', text: 'Ingen aning, men de borde ha väntat lite längre.', isCorrect: false },
      ],
    },
    {
      id: 'q3',
      text: 'Vem var den första kvinnan att vinna ett Nobelpris?',
      options: [
        { id: 'q3-a', text: 'Marie Curie', isCorrect: true },
        { id: 'q3-b', text: 'Oprah Winfrey', isCorrect: false },
        { id: 'q3-c', text: 'Din mamma', isCorrect: false },
      ],
    },
    {
      id: 'q4',
      text: 'Vem var den första kvinnliga premiärministern i världen?',
      options: [
        { id: 'q4-a', text: 'Sirimavo Bandaranaike', isCorrect: true },
        { id: 'q4-b', text: 'Margaret Thatcher', isCorrect: false },
        { id: 'q4-c', text: 'Jag vet inte, men hon gjorde säkert ett dåligt jobb', isCorrect: false },
      ],
    },
    {
      id: 'q5',
      text: 'Vad hände när kvinnor började jobba i fabriker under andra världskriget?',
      options: [
        { id: 'q5-a', text: 'De höll ekonomin igång medan männen var i krig', isCorrect: true },
        { id: 'q5-b', text: 'Allt kollapsade för att kvinnor suger på att jobba', isCorrect: false },
        { id: 'q5-c', text: 'De fick högre lön än män och världen gick under', isCorrect: false },
      ],
    },
    {
      id: 'q6',
      text: 'Vem var den första kvinnan i rymden?',
      options: [
        { id: 'q6-a', text: 'Valentina Teresjkova', isCorrect: true },
        { id: 'q6-b', text: 'Sandra Bullock', isCorrect: false },
        { id: 'q6-c', text: 'Elon Musks flickvän', isCorrect: false },
        { id: 'q6-d', text: 'Vet ej, men hon var säkert dålig på att fickparkera där uppe också', isCorrect: false },
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = { ...answers };
      newAnswers[questions[currentQuestionIndex].id] = selectedOption;
      setAnswers(newAnswers);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        calculateScore(newAnswers);
        setShowResult(true);
      }
    }
  };

  const calculateScore = (finalAnswers: Record<string, string>) => {
    let correctCount = 0;
    
    questions.forEach(question => {
      const selectedOptionId = finalAnswers[question.id];
      const selectedOption = question.options.find(option => option.id === selectedOptionId);
      
      if (selectedOption && selectedOption.isCorrect) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    
    if (percentage < 33) {
      setResultMessage('Ouch, bättre lycka nästa gång!');
    } else if (percentage < 66) {
      setResultMessage('Inte illa! Du är på god väg.');
    } else {
      setResultMessage('Bra jobbat! Du har tillräckligt med kunskap för att inte vara en incel.');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setShowResult(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Kunskapsquiz</h1>
        
        <ProgressBar 
          currentStep={currentQuestionIndex + 1} 
          totalSteps={questions.length} 
          className="mb-8"
        />
        
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <QuizQuestion
                question={questions[currentQuestionIndex].text}
                options={questions[currentQuestionIndex].options}
                selectedOption={selectedOption}
                onSelect={handleOptionSelect}
              />
              
              <div className="flex justify-center mt-8">
                <motion.button
                  onClick={handleNext}
                  className={`btn-primary px-8 py-3 ${!selectedOption && 'opacity-50 cursor-not-allowed'}`}
                  disabled={!selectedOption}
                  whileHover={selectedOption ? { scale: 1.05 } : {}}
                  whileTap={selectedOption ? { scale: 0.95 } : {}}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Nästa fråga' : 'Visa resultat'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="glass-panel p-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white text-4xl font-bold mx-auto">
                  {score}%
                </div>
              </motion.div>
              
              <motion.h2
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {resultMessage}
              </motion.h2>
              
              <motion.p
                className="mb-8 text-brand-dark/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Du fick {score}% rätt! {score < 50 ? 'Det finns rum för förbättring.' : 'Bra jobbat!'}
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.button
                  onClick={handleRestart}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Börja om
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/calendar')}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Till kalendern
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Quiz;
