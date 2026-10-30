import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  PeaceOffering,
  validateCustomOffering,
} from '../utils/apologyLogic';
import {
  BotanicalBouquetCrestSvg,
  ChocolateFoilSvg,
  CulinaryClocheSvg,
  LilySvg,
  SunflowerSvg,
  WatermelonSvg,
} from './BotanicalArt';
import { soundEngine } from '../utils/soundEngine';

interface PeaceOfferingsSectionProps {
  recipientName: string;
  offerings: PeaceOffering[];
  selectedIds: string[];
  onToggleOffering: (id: string) => void;
  onAddCustomOffering: (title: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const PeaceOfferingsSection: React.FC<PeaceOfferingsSectionProps> = ({
  offerings,
  selectedIds,
  onToggleOffering,
  onAddCustomOffering,
  onPrev,
  onNext,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateCustomOffering(customTitle);
    if (!check.valid) {
      soundEngine.playCatBoop('sassy');
      setValidationError(check.error);
      return;
    }
    setValidationError(null);
    onAddCustomOffering(customTitle.trim());
    setCustomTitle('');
  };

  const renderOfferingIcon = (kind: PeaceOffering['iconKind']) => {
    switch (kind) {
      case 'watermelon':
        return <WatermelonSvg className="w-12 h-12 shrink-0" />;
      case 'chocolate':
        return <ChocolateFoilSvg className="w-12 h-12 shrink-0" />;
      case 'sunflower':
        return <SunflowerSvg className="w-12 h-12 shrink-0" />;
      case 'cooking':
        return <CulinaryClocheSvg className="w-12 h-12 shrink-0" />;
      case 'lily':
        return <LilySvg className="w-12 h-12 shrink-0" />;
      default:
        return <WatermelonSvg className="w-12 h-12 shrink-0" />;
    }
  };

  return (
    <section
      aria-labelledby="offerings-heading"
      className="py-6 sm:py-10 flex flex-col justify-between"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-[#445946] mb-2">
          Page 4 of 5 · The Peace Basket for Mommy Biceps
        </p>
        <h1
          id="offerings-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1916] tracking-tight mb-2"
          style={{ textWrap: 'balance' }}
        >
          Tap What You Want Me to Bring You
        </h1>
        <p className="font-serif-body italic text-lg sm:text-xl text-[#5C5249]">
          From fresh chilled watermelon to milk chocolate and cooking for you—whatever
          you select here gets sent straight to me on the next page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left 5 Columns: Visual Peace Basket Summary & Optional Custom Demand */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="paper-sheet p-6 text-center flex flex-col items-center">
            <div className="w-full flex items-center justify-between font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#8A7E72] border-b border-[#DED5C5] pb-3 mb-4">
              <span>Peace Basket Status</span>
              <span className="text-[#9B3F33] font-medium">
                {selectedIds.length} of {offerings.length} Added
              </span>
            </div>

            <BotanicalBouquetCrestSvg className="w-full max-w-[280px] h-auto my-2" />

            <p className="font-serif-body italic text-base text-[#5C5249] mt-2">
              “Sunflowers, white lilies, milk chocolate, and cold sweet watermelon—kept
              ready for my favorite girl.”
            </p>
          </div>

          {/* Optional Custom Demand Box */}
          <form
            onSubmit={handleAddSubmit}
            noValidate
            className="paper-sheet p-6"
          >
            <label
              htmlFor="custom-peace-term"
              className="block font-display text-2xl font-semibold text-[#1E1916] mb-1"
            >
              Want to Add Something Else?
            </label>
            <p className="font-serif-body text-base text-[#5C5249] mb-3.5">
              Type any extra demand or punishment and add it to the basket:
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                id="custom-peace-term"
                type="text"
                value={customTitle}
                onChange={(e) => {
                  setCustomTitle(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g., Extra watermelon + ice cream..."
                className="flex-1 min-h-[42px] px-3.5 py-2 bg-[#F6F2EA] border border-[#C5B9A5] font-sans-ui text-sm text-[#1E1916] placeholder:text-[#8A7E72] focus:outline-none focus:border-[#9B3F33]"
              />
              <button
                type="submit"
                className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1E1916] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#9B3F33] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {validationError && (
              <p
                role="alert"
                className="mt-2 font-sans-ui text-xs text-[#9B3F33] font-medium"
              >
                {validationError}
              </p>
            )}
          </form>
        </div>

        {/* Right 7 Columns: 1-Tap Peace Basket Items */}
        <div className="lg:col-span-7 space-y-3.5">
          {offerings.map((offering) => {
            const isSelected = selectedIds.includes(offering.id);
            return (
              <div
                key={offering.id}
                onClick={() => onToggleOffering(offering.id)}
                className={`paper-sheet p-5 sm:p-6 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#9B3F33] bg-[#FCF9F4]'
                    : 'border-[#DED5C5] bg-[#FCF9F4]/75 hover:border-[#C5B9A5]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="pt-0.5 shrink-0">
                      {renderOfferingIcon(offering.iconKind)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#8A7E72]">
                        <span className="text-[#9B3F33] font-medium">
                          #{offering.indexLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{offering.category}</span>
                      </div>
                      <h2 className="font-display text-2xl font-semibold text-[#1E1916] mt-0.5">
                        {offering.title}
                      </h2>
                      <p className="font-serif-body text-[17px] leading-[1.6] text-[#5C5249] mt-1">
                        {offering.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleOffering(offering.id);
                    }}
                    aria-pressed={isSelected}
                    className={`self-start sm:self-center min-h-[38px] inline-flex items-center gap-1.5 px-4 py-2 border font-sans-ui text-xs uppercase tracking-[0.12em] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#9B3F33] border-[#9B3F33] text-[#FCF9F4]'
                        : 'bg-[#F6F2EA] border-[#C5B9A5] text-[#1E1916] hover:border-[#9B3F33]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    <span>{isSelected ? 'In Basket' : 'Add to Basket'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen Navigation Footer */}
      <div className="pt-4 border-t border-[#DED5C5] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[44px] px-5 py-2.5 bg-[#FCF9F4] border border-[#C5B9A5] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium text-[#1E1916] hover:border-[#1E1916] transition-colors cursor-pointer"
        >
          ← Back to Three Truths
        </button>

        <button
          type="button"
          onClick={onNext}
          className="min-h-[44px] px-6 py-2.5 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#843126] transition-colors cursor-pointer"
        >
          Next: Final Verdict & Seal (5/5) →
        </button>
      </div>
    </section>
  );
};
