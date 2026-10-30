import React, { useState } from 'react';
import {
  BotanicalBouquetCrestSvg,
  SunflowerSvg,
  WatermelonSvg,
  WaxSealSvg,
} from './BotanicalArt';
import { soundEngine } from '../utils/soundEngine';

interface InteractiveEnvelopeProps {
  recipientName: string;
  nickname: string;
  senderName: string;
  onFinishOpen: () => void;
}

type EnvelopePhase = 'sealed' | 'flap-opening' | 'letter-rising' | 'fading-out';

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  recipientName,
  nickname,
  onFinishOpen,
}) => {
  const [phase, setPhase] = useState<EnvelopePhase>('sealed');

  const handleOpenEnvelope = () => {
    if (phase !== 'sealed') return;
    soundEngine.playHeartShimmer();
    setPhase('flap-opening');

    // Step 2: Once top flap opens, slide the letter sheet upward out of the pocket
    setTimeout(() => {
      soundEngine.playBloomNote(1);
      setPhase('letter-rising');
    }, 650);

    // Step 3: Fade and drop the envelope away
    setTimeout(() => {
      setPhase('fading-out');
    }, 1550);

    // Step 4: Reveal the full letter experience
    setTimeout(() => {
      onFinishOpen();
    }, 2050);
  };

  const isFlapOpen = phase !== 'sealed';
  const isLetterRising = phase === 'letter-rising' || phase === 'fading-out';
  const isFadingOut = phase === 'fading-out';

  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center px-4 py-10 select-none overflow-hidden">
      {/* Subtle Top Prompt */}
      <div
        className={`text-center mb-8 transition-all duration-500 ${
          isFlapOpen ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100'
        }`}
      >
        <p className="font-mono-meta text-[11px] uppercase tracking-[0.22em] text-[#445946] mb-2">
          Personal Dispatch · Hand-Delivered for {recipientName}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E1916]">
          A Sealed Letter for {recipientName}{' '}
          <span className="italic font-normal text-[#9B3F33]">
            ({nickname})
          </span>
        </h1>
      </div>

      {/* 3D Tactile Envelope Container */}
      <div
        onClick={handleOpenEnvelope}
        role="button"
        tabIndex={0}
        aria-label={`Open sealed envelope addressed to ${recipientName}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenEnvelope();
          }
        }}
        className={`relative w-full max-w-[600px] aspect-[16/11] cursor-pointer transition-all duration-500 ${
          isFadingOut
            ? 'opacity-0 translate-y-12 scale-95 pointer-events-none'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
        style={{ perspective: '1400px' }}
      >
        {/* 1. Envelope Back Wall & Inner Lining */}
        <div className="absolute inset-0 rounded-[4px] bg-[#E5DEC9] border border-[#C5B9A5] shadow-[0_24px_60px_-15px_rgba(30,25,22,0.22)] overflow-hidden">
          {/* Inner decorative lining pattern */}
          <div
            className="absolute inset-2 border border-[#D4C8B4] bg-[#EFE9DC]"
            style={{
              backgroundImage:
                'radial-gradient(#C5B9A5 0.75px, transparent 0.75px)',
              backgroundSize: '14px 14px',
            }}
          />
        </div>

        {/* 2. The Inner Letter Sheet (Tucked inside the pocket, slides UP when opened) */}
        <div
          className={`absolute left-[6%] right-[6%] top-[8%] bottom-[8%] bg-[#FCF9F4] border border-[#DED5C5] shadow-md p-5 sm:p-7 flex flex-col items-center text-center transition-all duration-700 ease-out ${
            isLetterRising
              ? 'z-30 opacity-100 -translate-y-[38%] scale-[1.03] shadow-[0_22px_45px_-12px_rgba(30,25,22,0.25)]'
              : isFlapOpen
              ? 'z-10 opacity-100 translate-y-2 scale-95'
              : 'z-10 opacity-0 translate-y-8 scale-95 pointer-events-none'
          }`}
        >
          <p className="font-mono-meta text-[10px] uppercase tracking-[0.18em] text-[#445946] mb-1">
            For Leaving in the Middle of Our Laugh
          </p>
          <BotanicalBouquetCrestSvg className="w-full max-w-[230px] h-auto my-1" />
          <h2 className="font-display italic text-2xl sm:text-3xl font-semibold text-[#1E1916] mt-1">
            Dear {recipientName} ({nickname}),
          </h2>
          <p className="font-serif-body text-sm sm:text-base text-[#5C5249] mt-2 line-clamp-3 max-w-md leading-relaxed">
            I have been replaying that moment in my head ever since it happened.
            Leaving halfway through our laugh was pure circumstance—never a choice...
          </p>
        </div>

        {/* 3. Envelope Front Pocket Flaps (Left, Right, and Bottom) sitting IN FRONT of the letter */}
        <svg
          viewBox="0 0 600 412"
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Left triangular side fold */}
          <polygon
            points="0,0 300,215 0,412"
            fill="#EFE9DC"
            stroke="#C5B9A5"
            strokeWidth="1.5"
          />
          {/* Right triangular side fold */}
          <polygon
            points="600,0 300,215 600,412"
            fill="#EFE9DC"
            stroke="#C5B9A5"
            strokeWidth="1.5"
          />
          {/* Bottom trapezoid pocket fold */}
          <polygon
            points="0,412 225,195 375,195 600,412"
            fill="#F6F2EA"
            stroke="#C5B9A5"
            strokeWidth="1.5"
          />
          {/* Subtle inner double-rule line on bottom flap */}
          <polyline
            points="24,412 232,208 368,208 576,412"
            fill="none"
            stroke="#DED5C5"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* 4. Recipient Address Card on the Front Pocket */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] z-20 flex flex-col items-center justify-end pb-5 sm:pb-6 px-6 pointer-events-none text-center">
          <div className="bg-[#FCF9F4]/95 border border-[#C5B9A5] px-5 py-3 sm:px-7 sm:py-3.5 shadow-2xs max-w-[400px] w-full">
            <p className="font-mono-meta text-[10px] uppercase tracking-[0.18em] text-[#8A7E72]">
              Special Peace Delivery · Watermelon & Flowers
            </p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[#1E1916] mt-0.5">
              To: {recipientName}{' '}
              <span className="italic font-normal text-[#9B3F33]">
                ({nickname})
              </span>
            </p>
            <p className="font-hand text-lg sm:text-xl text-[#5C5249] mt-0.5">
              “Because leaving mid-laugh was never my choice”
            </p>
          </div>
        </div>

        {/* Perforated Botanical Postage Stamp (Positioned cleanly in bottom-right corner) */}
        <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 hidden sm:flex flex-col items-center bg-[#FCF9F4] border-2 border-dashed border-[#C5B9A5] px-2.5 py-1.5 shadow-2xs pointer-events-none rotate-2">
          <div className="flex items-center gap-1">
            <WatermelonSvg className="w-5 h-5" />
            <SunflowerSvg className="w-5 h-5" />
          </div>
          <span className="font-mono-meta text-[8px] uppercase tracking-[0.16em] text-[#5C5249] mt-0.5">
            Peace Post · 01
          </span>
        </div>

        {/* 5. Top Triangular Envelope Flap (Rotates 180deg open in 3D when clicked) */}
        <div
          className={`absolute inset-x-0 top-0 h-[58%] origin-top transition-transform duration-700 ease-in-out pointer-events-none ${
            isLetterRising ? 'z-0' : 'z-30'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          }}
        >
          <svg
            viewBox="0 0 600 240"
            className="w-full h-full drop-shadow-[0_6px_12px_rgba(30,25,22,0.12)]"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,0 600,0 300,234"
              fill={isFlapOpen ? '#E5DEC9' : '#FCF9F4'}
              stroke="#C5B9A5"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polyline
              points="26,8 300,218 574,8"
              fill="none"
              stroke="#DED5C5"
              strokeWidth="1.1"
            />
          </svg>
        </div>

        {/* 6. Interactive Venetian 'R' Wax Seal Clasp at Center of Envelope */}
        <div
          className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center transition-all duration-500 ${
            isFlapOpen
              ? 'opacity-0 scale-75 pointer-events-none'
              : 'opacity-100 scale-100 hover:scale-105'
          }`}
        >
          <div className="rounded-full shadow-[0_10px_25px_rgba(155,63,51,0.38)]">
            <WaxSealSvg className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>
        </div>
      </div>

      {/* Call-to-Action Button Below the Envelope */}
      <div
        className={`mt-8 flex flex-col items-center gap-2 transition-all duration-500 ${
          isFlapOpen ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={handleOpenEnvelope}
          className="min-h-[46px] px-7 py-3 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#843126] transition-colors cursor-pointer shadow-sm"
        >
          Tap Wax Seal to Open Envelope →
        </button>
        <span className="font-serif-body italic text-sm text-[#8A7E72]">
          Click anywhere on the envelope or wax seal to unseal it
        </span>
      </div>
    </div>
  );
};
