import React from 'react';
import { PerspectiveItem } from '../utils/apologyLogic';
import { LilySvg, SunflowerSvg, WatermelonSvg } from './BotanicalArt';

interface PerspectiveLedgerProps {
  items: PerspectiveItem[];
  onPrev: () => void;
  onNext: () => void;
}

export const PerspectiveLedger: React.FC<PerspectiveLedgerProps> = ({
  items,
  onPrev,
  onNext,
}) => {
  const renderMotifSvg = (motif: PerspectiveItem['motif']) => {
    if (motif === 'sunflower') {
      return <SunflowerSvg className="w-12 h-12 shrink-0" spinSlow />;
    }
    if (motif === 'lily') {
      return <LilySvg className="w-12 h-12 shrink-0" />;
    }
    return <WatermelonSvg className="w-12 h-12 shrink-0" />;
  };

  return (
    <section
      aria-labelledby="reflections-heading"
      className="py-6 sm:py-10 flex flex-col justify-between"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-[#445946] mb-2">
          Page 3 of 5 · Three Simple Truths
        </p>
        <h1
          id="reflections-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1916] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Why Leaving Was Never My Choice
        </h1>
        <p className="font-serif-body italic text-lg sm:text-xl text-[#5C5249] mt-2 leading-relaxed">
          The joke wasn’t the problem, leaving halfway through was pure circumstance,
          and you deserved patience instead of rushed excuses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
        {items.map((item) => (
          <article
            key={item.id}
            className="paper-sheet flex flex-col justify-between p-6 sm:p-8 border-[#DED5C5]"
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#DED5C5]">
                <div>
                  <span className="block font-mono-meta text-[11px] uppercase tracking-[0.15em] text-[#8A7E72]">
                    {item.stepTag}
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

              <h2
                className="font-display text-2xl sm:text-[27px] font-semibold text-[#1E1916] mb-3 leading-snug"
                style={{ textWrap: 'balance' }}
              >
                {item.title}
              </h2>

              <p className="font-serif-body text-[18px] leading-[1.75] text-[#5C5249] mb-5">
                {item.body}
              </p>
            </div>

            <div className="pt-4 border-t border-[#DED5C5]">
              <p className="font-hand text-xl text-[#9B3F33]">
                {item.marginNote}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Screen Navigation Footer */}
      <div className="pt-4 border-t border-[#DED5C5] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[44px] px-5 py-2.5 bg-[#FCF9F4] border border-[#C5B9A5] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium text-[#1E1916] hover:border-[#1E1916] transition-colors cursor-pointer"
        >
          ← Back to the Letter
        </button>

        <button
          type="button"
          onClick={onNext}
          className="min-h-[44px] px-6 py-2.5 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#843126] transition-colors cursor-pointer"
        >
          Next: Your Peace Basket (4/5) →
        </button>
      </div>
    </section>
  );
};
