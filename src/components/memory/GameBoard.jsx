import React, { useState, useEffect, useCallback } from 'react';
import { Home, Clock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import MemoryCard from './MemoryCard';
import { MEMORY_PAIRS, shuffleArray, formatTime } from '@/lib/memoryData';
import { playFlip, playMatch, playWrong } from '@/lib/sounds';

function calcGrid(cardCount, containerW, containerH) {
  const aspect = 5 / 6;
  const gap = 10;
  const padding = 8;
  const usableW = containerW - padding * 2;
  const usableH = containerH - padding * 2;

  // Column counts that produce full, symmetric rows (divisors of cardCount)
  const divisors = [];
  for (let c = 1; c <= cardCount; c++) {
    if (cardCount % c === 0) divisors.push(c);
  }

  // Try largest first — big cards for the totem screen
  const sizes = [230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80];
  for (const w of sizes) {
    const h = w / aspect;
    const cw = w + gap;
    const ch = h + gap;
    const maxCols = Math.floor(usableW / cw);
    const maxRows = Math.floor(usableH / ch);
    const validCols = divisors.filter((c) => c <= maxCols && cardCount / c <= maxRows);
    if (validCols.length > 0) {
      // Pick the cols whose grid aspect best matches the container aspect
      const targetAspect = usableW / usableH;
      let cols = validCols[0];
      let bestDiff = Infinity;
      for (const c of validCols) {
        const r = cardCount / c;
        const gridAspect = (c * cw) / (r * ch);
        const diff = Math.abs(gridAspect - targetAspect);
        if (diff < bestDiff) { bestDiff = diff; cols = c; }
      }
      const rows = cardCount / cols;
      const totalW = cols * cw - gap;
      const totalH = rows * ch - gap;
      const offsetX = (containerW - totalW) / 2;
      const offsetY = (containerH - totalH) / 2;
      const positions = [];
      for (let i = 0; i < cardCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions.push({
          x: offsetX + col * cw,
          y: offsetY + row * ch,
        });
      }
      return { cardWidth: w, positions };
    }
  }
  // Fallback — smallest with scroll, symmetric
  const w = sizes[sizes.length - 1];
  const h = w / aspect;
  const cw = w + gap;
  const ch = h + gap;
  const cols = divisors.reduce((best, c) => (c * cw <= usableW ? c : best), 1);
  const rows = Math.ceil(cardCount / cols);
  const totalW = cols * cw - gap;
  const offsetX = (containerW - totalW) / 2;
  const positions = [];
  for (let i = 0; i < cardCount; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({ x: offsetX + col * cw, y: 8 + row * ch });
  }
  return { cardWidth: w, positions };
}

const cardAspect = 5 / 6;

export default function GameBoard({ difficulty, onWin, onBack }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [grid, setGrid] = useState(null); // { cardWidth, positions[] }
  const [containerSize, setContainerSize] = useState(null);
  const cardContainerRef = useCallback((node) => {
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setContainerSize({ w: rect.width, h: rect.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // Initialize cards when difficulty changes
  useEffect(() => {
    const pairs = MEMORY_PAIRS.slice(0, difficulty.pairs);
    const newCards = [];
    pairs.forEach((pair) => {
      newCards.push({ ...pair, type: 'logo', uid: `${pair.id}-logo` });
      newCards.push({ ...pair, type: 'description', uid: `${pair.id}-desc` });
    });
    setCards(shuffleArray(newCards));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setStartTime(null);
    setElapsed(0);
    setDisabled(false);
    setGrid(null);
    setContainerSize(null);
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Check win
  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === difficulty.pairs) {
      const finalTime = elapsed;
      const colors = ['#F48C4F', '#EB5D6D', '#F6C64F', '#39B07C', '#E8521A'];
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.4 }, colors });
      setTimeout(() => confetti({ particleCount: 40, spread: 120, origin: { y: 0.6 }, colors }), 300);
      const timer = setTimeout(() => onWin(finalTime), 800);
      return () => clearTimeout(timer);
    }
  }, [matchedPairs, difficulty, elapsed, onWin]);

  const handleCardClick = useCallback(
    (index) => {
      if (disabled) return;
      if (flippedIndices.includes(index)) return;
      if (matchedPairs.includes(cards[index].id)) return;
      if (flippedIndices.length >= 2) return;

      if (!startTime) setStartTime(Date.now());

      playFlip();

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      if (newFlipped.length === 2) {
        setDisabled(true);
        const [first, second] = newFlipped;
        if (cards[first].id === cards[second].id) {
          // Match
          playMatch();
          setTimeout(() => {
            setMatchedPairs((prev) => [...prev, cards[first].id]);
            setFlippedIndices([]);
            setDisabled(false);
          }, 600);
        } else {
          // No match
          playWrong();
          setTimeout(() => {
            setFlippedIndices([]);
            setDisabled(false);
          }, 1000);
        }
      }
    },
    [disabled, flippedIndices, matchedPairs, cards, startTime]
  );

  const diffLabels = { easy: 'קלה', medium: 'בינונית', hard: 'קשה' };

  // Calculate grid when container size or cards change
  useEffect(() => {
    if (!containerSize || cards.length === 0) return;
    const result = calcGrid(cards.length, containerSize.w, containerSize.h);
    setGrid(result);
  }, [containerSize, cards.length]);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header — difficulty (right), timer (center), progress (left) */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
        <span className="font-heading text-xl sm:text-2xl tracking-wide w-28 text-right" style={{ color: difficulty.color }}>
          דרגה {diffLabels[difficulty.id]}
        </span>
        <div className="flex items-center gap-2 font-heading text-2xl sm:text-3xl" style={{ color: '#F48C4F' }}>
          <Clock className="w-6 h-6" />
          {formatTime(elapsed)}
        </div>
        <div className="flex items-center gap-1.5 text-gray-300 font-body text-sm sm:text-base w-28 justify-start">
          <CheckCircle2 className="w-5 h-5" style={{ color: '#39B07C' }} />
          {matchedPairs.length} / {difficulty.pairs}
        </div>
      </div>

      {/* Board — centered grid */}
      <div ref={cardContainerRef} className="flex-1 relative mx-4 sm:mx-6 mb-2 overflow-auto">
        {grid ? (
          <div style={{ position: 'absolute', inset: 0 }}>
            {cards.map((card, index) => {
              const pos = grid.positions[index];
              if (!pos) return null;
              return (
                <div
                  key={card.uid}
                  className="absolute"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    width: grid.cardWidth,
                    height: grid.cardWidth / cardAspect,
                  }}
                >
                  <MemoryCard
                    card={card}
                    isFlipped={flippedIndices.includes(index)}
                    isMatched={matchedPairs.includes(card.id)}
                    disabled={disabled}
                    onClick={() => handleCardClick(index)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Home button — centered at bottom, big & pill, large tap target */}
      <div className="flex justify-center pb-6 pt-2">
        <button
          onClick={() => window.location.href = 'https://inri-pkrf.github.io/Totem-Pro-Final/'}
          className="flex items-center gap-4 px-12 py-6 rounded-full transition-all active:scale-95"
          style={{ backgroundColor: 'rgba(247, 179, 124, 0.85)', minHeight: '72px' }}
        >
          <Home className="w-9 h-9 text-white" />
          <span className="font-heading text-3xl text-white tracking-wide">מסך הבית</span>
        </button>
      </div>
    </div>
  );
}