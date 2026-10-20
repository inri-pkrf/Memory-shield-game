import React, { useState } from 'react';
import DifficultyScreen from '@/components/memory/DifficultyScreen';
import GameBoard from '@/components/memory/GameBoard';
import WinScreen from '@/components/memory/WinScreen';
import { DIFFICULTIES } from '@/lib/memoryData';

export default function MemoryGame() {
  const [screen, setScreen] = useState('difficulty');
  const [difficulty, setDifficulty] = useState(null);
  const [finalTime, setFinalTime] = useState(0);

  const handleSelectDifficulty = (diff) => {
    setDifficulty(diff);
    setScreen('playing');
  };

  const handleWin = (time) => {
    setFinalTime(time);
    setScreen('win');
  };

  const handlePlayAgain = () => {
    setScreen('difficulty');
    setDifficulty(null);
    setFinalTime(0);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen text-white font-body"
      style={{ background: 'radial-gradient(ellipse at top, #1a1208 0%, #0a0a0a 60%)' }}
    >
      {screen === 'difficulty' && (
        <DifficultyScreen difficulties={DIFFICULTIES} onSelect={handleSelectDifficulty} onNavigateHome={() => window.location.href = 'https://inri-pkrf.github.io/Totem-Pro-Final/'} />
      )}
      {screen === 'playing' && difficulty && (
        <GameBoard difficulty={difficulty} onWin={handleWin} onBack={() => setScreen('difficulty')} />
      )}
      {screen === 'win' && difficulty && (
        <WinScreen time={finalTime} difficulty={difficulty} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}