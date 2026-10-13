import React from 'react';
import { motion } from 'framer-motion';

export default function DifficultyScreen({ difficulties, onSelect, onNavigateHome }) {
  const diffList = Object.values(difficulties);

  return (
    <div className="relative flex flex-col min-h-screen px-8 py-6" style={{ backgroundColor: '#0a0a0a' }}>
      {/* No background pattern */}
      <div className="flex items-start justify-end">
        <button
          onClick={onNavigateHome}
          style={{ width: 'clamp(50px, 7vw, 75px)', height: 'clamp(50px, 7vw, 75px)', backgroundColor: 'rgba(247, 179, 124, 0.9)' }}
          className="rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-10 flex-shrink-0"
        >
          <img src="https://media.base44.com/images/public/user_6885e537f90714e91be36212/5d2d4d14b_home-btn.png" alt="בית" className="w-[70%] h-[70%] object-cover" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-0">
        <motion.img
          src="https://media.base44.com/images/public/6a40cacdaf5a6e5cd59dda94/1742a7f8b_inri-logo-white22.svg"
          alt="המכללה הלאומית לאיתנות ישראלית"
          className="h-[12vh] sm:h-[14vh] object-contain"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />

        <motion.h1
          className="font-heading text-[min(8vw,5rem)] text-white mb-2 tracking-wide"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ color: '#F48C4F' }}
        >
          משחק הזיכרון
        </motion.h1>

        <motion.p
          className="font-body text-[min(3vw,1.1rem)] text-gray-300 mb-1 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          הפכו את הקלפים ומצאו את הזוגות המתאימים
        </motion.p>
        <motion.p
          className="font-body text-[min(2.4vw,0.95rem)] text-gray-400 mb-[3vh] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          יש להתאים את קלף הלוגו לתיאור
        </motion.p>

        <div className="flex flex-col gap-[1.6vh] w-full max-w-[min(440px,85vw)]">
          {diffList.map((diff, i) => (
            <motion.button
              key={diff.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(diff)}
              className="flex items-center gap-4 p-[min(3.5vh,1.25rem)] rounded-2xl shadow-2xl text-right transition-shadow"
              style={{ backgroundColor: diff.color }}
            >
              <span className="text-[min(6vw,2.8rem)] flex-shrink-0">{diff.icon}</span>
              <div className="flex flex-col items-start">
                <span className="font-heading text-[min(4.5vw,1.8rem)] text-white tracking-wide">
                  דרגה {diff.label}
                </span>
                <span className="font-body text-[min(2.4vw,0.9rem)] text-white/90">
                  {diff.description}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <motion.p
        className="font-body text-[min(2vw,0.8rem)] text-gray-500 text-center py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        המכללה הלאומית לאיתנות ישראלית
      </motion.p>
    </div>
  );
}