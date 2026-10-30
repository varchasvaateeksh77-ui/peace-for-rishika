import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  PeaceOffering,
  validateCustomOffering,
} from '../utils/apologyLogic';
import {
  ChocolateFoilSvg,
  CulinaryClocheSvg,
  FlareBeaconSvg,
  LilySvg,
  PressedBotanicalPlateSvg,
  SunflowerSvg,
} from './BotanicalArt';
import { soundEngine } from '../utils/soundEngine';

interface PeaceOfferingsSectionProps {
  recipientName: string;
  offerings: PeaceOffering[];
  selectedIds: string[];
  onToggleOffering: (id: string) => void;
  onAddCustomOffering: (title: string) => void;
}

export const PeaceOfferingsSection: React.FC<PeaceOfferingsSectionProps> = ({
  offerings,
  selectedIds,
  onToggleOffering,
  onAddCustomOffering,
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
      case 'sunflower':
        return <SunflowerSvg className="w-11 h-11 shrink-0" />;
      case 'chocolate':
        return <ChocolateFoilSvg className="w-11 h-11 shrink-0" />;
      case 'lily':
        return <LilySvg className="w-11 h-11 shrink-0" />;
      case 'cooking':
        return <CulinaryClocheSvg className="w-11 h-11 shrink-0" />;
      case 'flare':
        return <FlareBeaconSvg className="w-11 h-11 shrink-0" />;
      default:
        return <SunflowerSvg className="w-11 h-11 shrink-0" />;
    }
  };

  return (
    <section
      id="peace-offerings"
      className="py-14 lg:py-20 border-b border-[#DED5C5]"
      aria-labelledby="offerings-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Editorial Ledger Introduction, Pressed Herbarium Specimen & Optional Extra Demand */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-[#445946] mb-3">
              Section III · The Reparations Ledger
            </p>
            <h2
              id="offerings-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1916] tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Tap Any Peace Offerings You Want to Claim
            </h2>
            <p className="font-serif-body text-[18px] leading-[1.75] text-[#5C5249]">
              Whatever you tap on the right is automatically included when you send
              your verdict below—so I will know the exact promises you claimed.
            </p>
          </div>

          {/* Herbarium Botanical Plate Vignette */}
          <div className="paper-sheet p-6 flex flex-col items-center text-center gap-4">
            <div className="w-full flex items-center justify-between font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#8A7E72] border-b border-[#DED5C5] pb-3">
              <span>Herbarium Specimen</span>
              <span className="text-[#9B3F33] font-medium">
                {selectedIds.length} of {offerings.length} Selected
              </span>
            </div>

            <PressedBotanicalPlateSvg className="w-full max-w-[250px] h-auto my-1" />

            <p className="font-serif-body italic text-base text-[#5C5249] px-2">
              “Kept with golden sunflowers, quiet white lilies, milk chocolate, and
              a promise never to leave a shared laugh unfinished.”
            </p>
          </div>

          {/* Optional Custom Clause Input */}
          <form
            onSubmit={handleAddSubmit}
            noValidate
            className="paper-sheet p-6"
          >
            <label
              htmlFor="custom-peace-term"
              className="block font-display text-2xl font-semibold text-[#1E1916] mb-1.5"
            >
              Optional: Add Your Own Demand
            </label>
            <p className="font-serif-body text-base text-[#5C5249] mb-4">
              Want to add a custom condition of your own? Type it once and it will
              be sent straight to me with your verdict:
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="custom-peace-term"
                type="text"
                value={customTitle}
                onChange={(e) => {
                  setCustomTitle(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g., Extra milk chocolate + you owe me dinner..."
                className="flex-1 min-h-[42px] px-3.5 py-2 bg-[#F6F2EA] border border-[#C5B9A5] font-sans-ui text-sm text-[#1E1916] placeholder:text-[#8A7E72] focus:outline-none focus:border-[#9B3F33]"
              />
              <button
                type="submit"
                className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#1E1916] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#9B3F33] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {validationError && (
              <p
                role="alert"
                className="mt-2.5 font-sans-ui text-xs text-[#9B3F33] font-medium"
              >
                {validationError}
              </p>
            )}
          </form>
        </div>

        {/* Right Column: One-Tap Reparation Cards */}
        <div className="lg:col-span-7 space-y-4">
          {offerings.map((offering) => {
            const isSelected = selectedIds.includes(offering.id);
            return (
              <div
                key={offering.id}
                onClick={() => onToggleOffering(offering.id)}
                className={`paper-sheet p-6 sm:p-7 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#9B3F33] bg-[#FCF9F4]'
                    : 'border-[#DED5C5] bg-[#FCF9F4]/75 hover:border-[#C5B9A5]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex pt-1">
                      {renderOfferingIcon(offering.iconKind)}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#8A7E72] tabular-nums">
                        <span className="text-[#9B3F33] font-medium">
                          Clause {offering.indexLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{offering.category}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-[26px] font-semibold text-[#1E1916]">
                        {offering.title}
                      </h3>
                      <p className="font-serif-body text-[17px] leading-[1.7] text-[#5C5249]">
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
                    className={`self-start min-h-[40px] inline-flex items-center gap-2 px-4 py-2 border font-sans-ui text-xs uppercase tracking-[0.12em] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#9B3F33] border-[#9B3F33] text-[#FCF9F4]'
                        : 'bg-[#F6F2EA] border-[#C5B9A5] text-[#1E1916] hover:border-[#9B3F33]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    <span>
                      {isSelected
                        ? `Claimed (${offering.indexLabel})`
                        : `Claim Clause ${offering.indexLabel}`}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
