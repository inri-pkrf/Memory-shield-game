import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Clock, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatTime } from '@/lib/memoryData';

const stars = [
  { x: '15%', y: '15%', delay: 0, size: 36 },
  { x: '85%', y: '12%', delay: 0.2, size: 28 },
  { x: '70%', y: '85%', delay: 0.4, size: 32 },
  { x: '20%', y: '80%', delay: 0.1, size: 24 },
  { x: '50%', y: '5%', delay: 0.3, size: 30 },
  { x: '10%', y: '45%', delay: 0.5, size: 20 },
  { x: '90%', y: '50%', delay: 0.35, size: 26 },
];

export default function WinScreen({ time, difficulty, onPlayAgain }) {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    setShowStars(true);
    const colors = ['#F48C4F', '#EB5D6D', '#F6C64F', '#39B07C', '#E8521A'];

    // Initial burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors,
    });

    // Continuous side cannons
    const duration = 5000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      {/* Floating stars */}
      {showStars && stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: star.x, top: star.y }}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.8 + star.delay }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -10, 8, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Star
              size={star.size}
              fill="#F6C64F"
              stroke="#F6C64F"
              strokeWidth={0.5}
            />
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="text-7xl sm:text-8xl mb-4"
      >
        🏆
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-heading text-6xl sm:text-7xl md:text-8xl mb-4"
        style={{ color: '#F48C4F' }}
      >
        כל הכבוד!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="font-body text-lg sm:text-xl text-gray-300 mb-6"
      >
        סיימתם את דרגת {difficulty.label}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <Clock className="w-8 h-8" style={{ color: '#F6C64F' }} />
        <span className="font-heading text-4xl sm:text-5xl" style={{ color: '#F6C64F' }}>
          {formatTime(time)}
        </span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayAgain}
        className="flex items-center gap-3 px-12 py-6 rounded-2xl font-heading text-3xl sm:text-4xl text-white shadow-2xl tracking-wide"
        style={{ backgroundColor: '#39B07C', minHeight: '72px' }}
      >
        <RotateCcw className="w-8 h-8" />
        יאללה שוב
      </motion.button>
    </div>
  );
}