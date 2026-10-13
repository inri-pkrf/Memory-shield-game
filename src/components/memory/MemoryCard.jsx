import React, { useState } from 'react';
import { CARD_BACK_LOGO } from '@/lib/memoryData';

export default function MemoryCard({ card, isFlipped, isMatched, onClick, disabled }) {
  const [logoError, setLogoError] = useState(false);

  const handleClick = () => {
    if (disabled || isFlipped || isMatched) return;
    onClick();
  };

  return (
    <div
      className="card-3d-container cursor-pointer select-none aspect-[5/6] transition-transform duration-200 active:scale-95"
      onClick={handleClick}
    >
      <div className={`card-3d-inner ${isFlipped || isMatched ? 'is-flipped' : ''}`}>
        {/* Back face — college logo pattern (visible when face-down) */}
        <div className="card-3d-face bg-white shadow-xl border border-gray-200 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${CARD_BACK_LOGO})`,
              backgroundSize: '55%',
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center',
              opacity: 0.4,
              transform: 'rotate(45deg) scale(1.5)',
            }}
          />
        </div>

        {/* Front face — content (visible when flipped) */}
        <div
          className={`card-3d-face card-3d-front shadow-xl flex flex-col items-center justify-center p-3 sm:p-4 text-center ${
            isMatched ? 'ring-2 ring-emerald-300/40' : ''
          }`}
          style={{ backgroundColor: card.type === 'description' ? card.color : '#FFFFFF' }}
        >
          {card.type === 'logo' ? (
            <div className="flex-1 flex items-center justify-center w-full min-h-0 p-3">
              {card.logoUrl && !logoError ? (
                <img
                  src={card.logoUrl}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  onError={() => setLogoError(true)}
                  draggable={false}
                />
              ) : (
                <span className="text-4xl sm:text-5xl md:text-6xl">{card.emoji}</span>
              )}
            </div>
          ) : (
            <p className="font-body text-white leading-snug font-medium text-[10px] sm:text-xs md:text-sm px-2">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}