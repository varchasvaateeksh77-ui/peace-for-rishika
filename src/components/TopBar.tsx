import React from 'react';
import { ScreenStep } from '../utils/apologyLogic';

interface TopBarProps {
  recipientName: string;
  currentStep: ScreenStep;
  isMuted: boolean;
  onSelectStep: (step: ScreenStep) => void;
  onToggleMusic: () => void;
}

const STEPS: { step: ScreenStep; label: string; shortLabel: string }[] = [
  { step: 1, label: '1. Envelope', shortLabel: '1' },
  { step: 2, label: '2. The Letter', shortLabel: '2' },
  { step: 3, label: '3. Three Truths', shortLabel: '3' },
  { step: 4, label: '4. Peace Basket', shortLabel: '4' },
  { step: 5, label: '5. Your Verdict', shortLabel: '5' },
];

export const TopBar: React.FC<TopBarProps> = ({
  recipientName,
  currentStep,
  isMuted,
  onSelectStep,
  onToggleMusic,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-12 py-3 bg-[#F6F2EA]/95 backdrop-blur-md border-b border-[#DED5C5]">
      {/* Zone 1: Wordmark */}
      <button
        type="button"
        onClick={() => onSelectStep(1)}
        className="flex items-baseline gap-2 text-[#1E1916] whitespace-nowrap shrink-0 cursor-pointer group"
      >
        <span className="font-display text-xl sm:text-[26px] font-semibold italic tracking-tight group-hover:text-[#9B3F33] transition-colors">
          For {recipientName}
        </span>
        <span className="hidden lg:inline font-mono-meta text-[10px] uppercase tracking-[0.16em] text-[#8A7E72]">
          · Mommy Biceps Edition
        </span>
      </button>

      {/* Zone 2: Multi-Screen Step Switcher */}
      <nav
        aria-label="Storybook pages"
        className="flex items-center gap-1 sm:gap-2"
      >
        {STEPS.map((item) => {
          const active = currentStep === item.step;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => onSelectStep(item.step)}
              aria-current={active ? 'step' : undefined}
              className={`px-2 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-sans-ui transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#9B3F33] text-[#FCF9F4] font-medium'
                  : 'bg-[#FCF9F4] text-[#5C5249] border border-[#DED5C5] hover:border-[#9B3F33] hover:text-[#1E1916]'
              }`}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Sound Chime Toggle */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={
            isMuted
              ? 'Turn on gentle acoustic chime'
              : 'Mute gentle acoustic chime'
          }
          className="min-h-[32px] px-2 sm:px-3 py-1 bg-[#FCF9F4] border border-[#C5B9A5] font-mono-meta text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#1E1916] hover:border-[#9B3F33] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isMuted ? 'Chime: Off' : 'Chime ♪'}
        </button>
      </div>
    </header>
  );
};
