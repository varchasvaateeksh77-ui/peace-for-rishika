import React, { useState } from 'react';
import { PerspectiveItem } from '../utils/apologyLogic';
import { LilySvg, SunflowerSvg, WaxSealSvg } from './BotanicalArt';
import { soundEngine } from '../utils/soundEngine';

interface PerspectiveLedgerProps {
  items: PerspectiveItem[];
}

export const PerspectiveLedger: React.FC<PerspectiveLedgerProps> = ({
  items,
}) => {
  const [unfoldedVerses, setUnfoldedVerses] = useState<Record<string, boolean>>({
    'what-silence-said': true,
    'circumstance-vs-choice': true,
    'why-explanations-failed': true,
  });

  const toggleSecretVerse = (id: string, idx: number) => {
    soundEngine.playBloomNote(idx);
    setUnfoldedVerses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMotifSvg = (motif: PerspectiveItem['motif']) => {
    if (motif === 'sunflower') {
      return <SunflowerSvg className="w-10 h-10 shrink-0" spinSlow />;
    }
    if (motif === 'lily') {
      return <LilySvg className="w-10 h-10 shrink-0" />;
    }
    return <WaxSealSvg className="w-10 h-10 shrink-0" />;
  };

  return (
    <section
      id="reflections"
      className="py-14 lg:py-20 border-b border-[#DED5C5]"
      aria-labelledby="reflections-heading"
    >
      <div className="max-w-3xl mb-12">
        <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-[#445946] mb-3">
          Section II · Anatomy of an Interrupted Moment
        </p>
        <h2
          id="reflections-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1916] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Separating the Accident from the Intention
        </h2>
        <p className="font-serif-body italic text-lg sm:text-xl text-[#5C5249] mt-3 leading-relaxed">
          Why the joke itself was warm and harmless, why vanishing in the middle of
          our laugh was never a choice, and why I retired my rushed explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {items.map((item, idx) => {
          const isVerseOpen = Boolean(unfoldedVerses[item.id]);

          return (
            <article
              key={item.id}
              className="paper-sheet flex flex-col justify-between p-7 sm:p-8 border-[#DED5C5]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#DED5C5]">
                  <div>
                    <span className="block font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#8A7E72]">
                      {item.timestampTag}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-2xl italic font-semibold text-[#9B3F33]">
                        {item.romanIndex}.
                      </span>
                      <span className="font-sans-ui text-xs font-medium text-[#445946]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  {renderMotifSvg(item.motif)}
                </div>

                <h3
                  className="font-display text-2xl sm:text-[28px] font-semibold text-[#1E1916] mb-3 leading-snug"
                  style={{ textWrap: 'balance' }}
                >
                  {item.title}
                </h3>

                <p className="font-serif-body text-[17px] leading-[1.75] text-[#5C5249] mb-6">
                  {item.body}
                </p>

                {/* Marginalia Footnote Disclosure */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => toggleSecretVerse(item.id, idx)}
                    aria-expanded={isVerseOpen}
                    className="w-full text-left p-4 paper-inset hover:border-[#C5B9A5] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#5C5249]">
                      <span>Author’s Marginalia</span>
                      <span className="whitespace-nowrap shrink-0 text-[#9B3F33]">
                        {isVerseOpen ? 'Fold note ↑' : 'Read note →'}
                      </span>
                    </div>
                    {isVerseOpen && (
                      <p className="mt-2.5 font-serif-body italic text-base text-[#1E1916] leading-relaxed">
                        {item.secretVerse}
                      </p>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DED5C5]">
                <p className="font-hand text-xl text-[#5C5249]">
                  {item.marginNote}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
