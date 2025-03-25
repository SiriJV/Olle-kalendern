
// import React from 'react';
// import { motion } from 'framer-motion';

// export interface QuizOption {
//   id: string;
//   text: string;
//   isCorrect: boolean;
// }

// interface QuizQuestionProps {
//   question: string;
//   options: QuizOption[];
//   selectedOption: string | null;
//   onSelect: (optionId: string) => void;
// }

// const QuizQuestion: React.FC<QuizQuestionProps> = ({
//   question,
//   options,
//   selectedOption,
//   onSelect,
// }) => {
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 },
//   };

//   return (
//     <motion.div
//       className="glass-card my-6"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.h3 
//         className="text-xl font-medium mb-6 text-brand-light"
//         variants={itemVariants}
//       >
//         {question}
//       </motion.h3>
//       <motion.div className="space-y-4" variants={itemVariants}>
//         {options.map((option) => (
//           <motion.div
//             key={option.id}
//             className={`
//               p-4 rounded-lg cursor-pointer transition-all duration-300
//               ${selectedOption === option.id ? 
//                 'bg-brand-primary text-white' : 
//                 'bg-white hover:bg-brand-primary/10 border border-gray-200'
//               }
//             `}
//             onClick={() => onSelect(option.id)}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             variants={itemVariants}
//           >
//             <div className="flex items-center">
//               <div 
//                 className={`
//                   w-5 h-5 rounded-full mr-3 flex items-center justify-center border
//                   ${selectedOption === option.id ? 
//                     'bg-white border-white' : 
//                     'border-gray-300'
//                   }
//                 `}
//               >
//                 {selectedOption === option.id && (
//                   <motion.div 
//                     className="w-3 h-3 rounded-full bg-brand-primary"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ duration: 0.2 }}
//                   />
//                 )}
//               </div>
//               <span className={selectedOption === option.id ? 'text-white' : 'text-gray-700'}>
//                 {option.text}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default QuizQuestion;

import React from 'react';
import { motion } from 'framer-motion';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelect,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="glass-card my-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="text-lg font-medium mb-6 text-brand-light"
        variants={itemVariants}
      >
        {question}
      </motion.h3>
      <motion.div className="space-y-4" variants={itemVariants}>
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-300 border border-gray-200
              ${selectedOption === option.id ? 
                'bg-white text-gray-900' : 
                'bg-brand-primary/10 text-gray-700 hover:bg-brand-primary/20'
              }
            `}
            onClick={() => onSelect(option.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div 
                className={`
                  w-5 h-5 rounded-full mr-3 flex items-center justify-center border
                  ${selectedOption === option.id ? 
                    'bg-white border-gray-300' : 
                    'border-white'
                  }
                `}
              >
                {selectedOption === option.id && (
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-brand-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
              <span className={selectedOption === option.id ? 'text-gray-900' : 'text-white'}>
                {option.text}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default QuizQuestion;
