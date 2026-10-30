import React, { useEffect, useRef, useState } from 'react';
import { Lottie, type LottieHandle } from 'lottie-react';
import envelopeLottieData from '../assets/envelopeLottie.json';
import {
  LilySvg,
  SunflowerSvg,
  WatermelonSvg,
} from './BotanicalArt';
import { soundEngine } from '../utils/soundEngine';

interface InteractiveEnvelopeProps {
  recipientName: string;
  nickname: string;
  senderName: string;
  onFinishOpen: () => void;
}

type EnvelopePhase = 'sealed' | 'opening' | 'letter-preview' | 'fading-out';

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  recipientName,
  nickname,
  senderName,
  onFinishOpen,
}) => {
  const [phase, setPhase] = useState<EnvelopePhase>('sealed');
  const lottieRef = useRef<LottieHandle | null>(null);

  // Ensure the Lottie envelope starts paused on Frame 0 (sealed with wax seal)
  useEffect(() => {
    if (lottieRef.current && phase === 'sealed') {
      lottieRef.current.stop();
      lottieRef.current.seek(0);
    }
  }, [phase]);

  const handleOpenEnvelope = () => {
    if (phase !== 'sealed') return;

    soundEngine.playHeartShimmer();
    setPhase('opening');

    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.85);
      lottieRef.current.seek(0);
      lottieRef.current.play();
    }

    // Step 2: As the Lottie letter sheet rises out of the pocket (frames 7-9), show personalized preview ink
    setTimeout(() => {
      soundEngine.playBloomNote(1);
      setPhase('letter-preview');
    }, 950);

    // Step 3: Smoothly fade and dissolve the opened envelope away
    setTimeout(() => {
      setPhase('fading-out');
    }, 1900);

    // Step 4: Transition into the full letter screen
    setTimeout(() => {
      onFinishOpen();
    }, 2400);
  };

  const isStarted = phase !== 'sealed';
  const isLetterPreview = phase === 'letter-preview' || phase === 'fading-out';
  const isFadingOut = phase === 'fading-out';

  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center px-3 sm:px-6 py-4 sm:py-8 select-none overflow-hidden">
      {/* Archival Fine-Press Dispatch Frame */}
      <div
        className={`paper-sheet double-rule-frame w-full max-w-xl px-5 py-7 sm:px-10 sm:py-9 flex flex-col items-center text-center transition-all duration-500 ${
          isFadingOut
            ? 'opacity-0 translate-y-8 scale-95 pointer-events-none'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {/* Top Dispatch Metadata & Botanical Stamp Row */}
        <div className="w-full flex items-center justify-between gap-2 pb-4 mb-3 border-b border-[#DED5C5]">
          <span className="font-mono-meta text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#445946] text-left">
            Personal Dispatch · Hand-Delivered
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F6F2EA] border border-dashed border-[#C5B9A5]">
            <WatermelonSvg className="w-4 h-4" />
            <SunflowerSvg className="w-4 h-4" />
            <LilySvg className="w-4 h-4" />
            <span className="font-mono-meta text-[9px] uppercase tracking-[0.14em] text-[#5C5249] ml-0.5">
              Peace Post
            </span>
          </div>
        </div>

        {/* Addressee Heading (Cleanly above the envelope so it never overlaps) */}
        <div
          className={`transition-all duration-500 ${
            isStarted ? 'opacity-60 scale-[0.98]' : 'opacity-100'
          }`}
        >
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E1916] leading-tight">
            A Sealed Letter for {recipientName}{' '}
            <span className="italic font-normal text-[#9B3F33] block sm:inline">
              ({nickname})
            </span>
          </h1>
          <p className="font-hand text-xl sm:text-2xl text-[#5C5249] mt-1">
            “Because leaving in the middle of our laugh was never my choice”
          </p>
        </div>

        {/* Interactive Lottie Envelope Stage */}
        <div
          onClick={handleOpenEnvelope}
          role="button"
          tabIndex={0}
          aria-label={`Open sealed envelope addressed to ${recipientName} (${nickname})`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenEnvelope();
            }
          }}
          className={`relative w-full max-w-[320px] sm:max-w-[360px] cursor-pointer group focus:outline-none transition-all duration-500 ${
            isStarted ? '-my-3 sm:-my-4' : '-my-10 sm:-my-12'
          }`}
        >
          {/* Subtle warm radial glow behind the envelope */}
          <div
            className="absolute inset-x-8 inset-y-14 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
            style={{
              background:
                'radial-gradient(circle, rgba(217,155,38,0.14) 0%, rgba(155,63,51,0.05) 55%, transparent 75%)',
            }}
          />

          {/* The Custom Lottie Envelope Animation */}
          <div
            className={`relative z-10 w-full aspect-[512/656] transition-transform duration-500 ${
              !isStarted ? 'group-hover:scale-[1.03]' : 'scale-100'
            }`}
          >
            <Lottie
              lottieRef={lottieRef}
              src={envelopeLottieData}
              loop={false}
              autoplay={false}
              className="w-full h-full drop-shadow-[0_18px_32px_rgba(30,25,22,0.14)]"
            />

            {/* Personalized Letter Calligraphy overlaid onto the risen white paper sheet (Frames 7-9) */}
            <div
              aria-hidden="true"
              className={`absolute left-[22%] right-[21%] top-[30.5%] h-[25%] z-20 flex flex-col items-center justify-center text-center px-2 pointer-events-none transition-all duration-500 ${
                isLetterPreview
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <WatermelonSvg className="w-3.5 h-3.5" />
                <span className="font-mono-meta text-[7px] sm:text-[8px] uppercase tracking-[0.16em] text-[#445946]">
                  For {recipientName}
                </span>
                <SunflowerSvg className="w-3.5 h-3.5" />
              </div>
              <p className="font-display italic text-xs sm:text-sm font-semibold text-[#1E1916] leading-tight">
                Dear {recipientName} ({nickname}),
              </p>
              <p className="font-hand text-xs sm:text-sm text-[#9B3F33] leading-tight mt-0.5">
                Unfolding your peace letter...
              </p>
            </div>
          </div>
        </div>

        {/* Recipient & Sender Ledger Strip + Action Button (Cleanly below the envelope) */}
        <div className="w-full pt-4 mt-2 border-t border-[#DED5C5] flex flex-col items-center gap-3">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#F6F2EA] border border-[#DED5C5] text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-mono-meta text-[10px] uppercase tracking-[0.14em] text-[#8A7E72]">
                To:
              </span>
              <span className="font-display font-semibold text-sm sm:text-base text-[#1E1916]">
                {recipientName}{' '}
                <span className="italic font-normal text-[#9B3F33]">
                  ({nickname})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono-meta text-[10px] uppercase tracking-[0.14em] text-[#8A7E72]">
                From:
              </span>
              <span className="font-display italic text-sm sm:text-base text-[#1E1916]">
                {senderName}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenEnvelope}
            disabled={isStarted}
            className="w-full sm:w-auto min-h-[46px] px-7 py-3 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#843126] disabled:opacity-60 transition-colors cursor-pointer shadow-xs"
          >
            {isStarted
              ? 'Opening Sealed Envelope...'
              : 'Tap Wax Seal to Open Envelope →'}
          </button>

          <span className="font-serif-body italic text-xs sm:text-sm text-[#8A7E72]">
            {isStarted
              ? 'Unfolding your letter...'
              : 'Tap the golden wax seal on the envelope above to unseal your letter'}
          </span>
        </div>
      </div>
    </div>
  );
};
