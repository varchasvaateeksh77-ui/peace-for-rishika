import React, { useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';
import {
  ApologyConfig,
  ForgivenessVerdict,
  KEEPSAKE_META,
  PeaceFlowerChoice,
  PeaceOffering,
  buildShareableVerdictUrl,
  buildTruceReplyMessage,
  computeDodgeOffset,
} from '../utils/apologyLogic';
import {
  LilySvg,
  PressedBotanicalPlateSvg,
  SunflowerSvg,
  WaxSealSvg,
} from './BotanicalArt';
import { soundEngine } from '../utils/soundEngine';

interface TruceSealSectionProps {
  config: ApologyConfig;
  selectedOfferings: PeaceOffering[];
  customOfferingTitles: string[];
  verdict: ForgivenessVerdict | null;
  truceSealed: boolean;
  personalNote: string;
  chosenFlower: PeaceFlowerChoice;
  dispatchStatus: 'idle' | 'sending' | 'sent';
  onSelectVerdict: (verdict: ForgivenessVerdict) => void;
  onChangeChosenFlower: (flower: PeaceFlowerChoice) => void;
  onChangePersonalNote: (note: string) => void;
  onSealTruce: (overrideVerdict?: ForgivenessVerdict) => void;
  onResetTruce: () => void;
}

const VERDICT_OPTIONS: {
  value: ForgivenessVerdict;
  label: string;
  sublabel: string;
}[] = [
  {
    value: 'forgiven',
    label: 'Peace Restored — You Are Forgiven',
    sublabel:
      'The olive branch is accepted; we pick up our unfinished laugh right where we left off.',
  },
  {
    value: 'probation',
    label: 'Truce Granted (On Cute Probation)',
    sublabel:
      'Apology accepted, provided every reparation clause claimed above is honoured in full.',
  },
  {
    value: 'cooling',
    label: 'I Read It — Still Giving You Side-Eye',
    sublabel:
      'I know leaving mid-joke wasn’t your choice; give me a little quiet space first.',
  },
];

export const TruceSealSection: React.FC<TruceSealSectionProps> = ({
  config,
  selectedOfferings,
  customOfferingTitles,
  verdict,
  truceSealed,
  personalNote,
  chosenFlower,
  dispatchStatus,
  onSelectVerdict,
  onChangeChosenFlower,
  onChangePersonalNote,
  onSealTruce,
  onResetTruce,
}) => {
  const [copied, setCopied] = useState(false);
  const [verdictError, setVerdictError] = useState<string | null>(null);
  const [stayMadCount, setStayMadCount] = useState<number>(0);

  const dodgeState = computeDodgeOffset(stayMadCount);

  const handleStayMadClick = () => {
    soundEngine.playCatBoop('sassy');
    setStayMadCount((c) => c + 1);
  };

  const handleQuickForgiveClick = () => {
    soundEngine.playHeartShimmer();
    onSelectVerdict('forgiven');
    setVerdictError(null);
    onSealTruce('forgiven');
  };

  const handleSealClick = () => {
    if (!verdict) {
      soundEngine.playCatBoop('sassy');
      setVerdictError(
        'Please select one of the three verdicts above before stamping the wax seal.'
      );
      return;
    }
    setVerdictError(null);
    onSealTruce(verdict);
  };

  const shareUrl =
    verdict && typeof window !== 'undefined'
      ? buildShareableVerdictUrl(window.location.origin + window.location.pathname, {
          verdict,
          chosenFlower,
          selectedOfferingIds: selectedOfferings.map((o) => o.id),
          customOfferings: customOfferingTitles,
          personalNote,
        })
      : '';

  const replyText = verdict
    ? buildTruceReplyMessage({
        recipientName: config.recipientName,
        verdict,
        selectedOfferingTitles: selectedOfferings.map((o) => o.title),
        personalNote,
        chosenFlower,
        shareUrl,
      })
    : '';

  const handleCopyReply = async () => {
    if (!replyText) return;
    soundEngine.playTap();
    try {
      await navigator.clipboard.writeText(replyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="seal-truce"
      className="py-14 lg:py-20"
      aria-labelledby="seal-truce-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Editorial Olive Branch Card, Dodging "Stay Mad" Interaction & Closing Promise */}
        <div className="paper-sheet double-rule-frame lg:col-span-5 flex flex-col gap-6 p-7 sm:p-9">
          <div className="flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#8A7E72] pb-3 mb-5 border-b border-[#DED5C5]">
              <span>Section IV · The Olive Branch</span>
              <span>Folio Truce</span>
            </div>

            <PressedBotanicalPlateSvg
              className="w-48 h-auto mb-4"
              activeFlower={chosenFlower}
            />

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1E1916] text-balance">
              Can we restore peace and finish that laugh properly?
            </h3>
            <p className="font-serif-body italic text-base text-[#5C5249] mt-2">
              Leaving in the middle of our moment was never a choice—coming back
              with patience and milk chocolate is.
            </p>

            {/* Playful Dodging "Stay Mad" Button & Primary "Forgive" Action */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative min-h-[54px] w-full">
              <button
                type="button"
                onClick={handleQuickForgiveClick}
                style={{
                  transform: `scale(${1 + Math.min(stayMadCount * 0.04, 0.16)})`,
                }}
                className="min-h-[44px] px-5 py-2.5 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#843126] cursor-pointer whitespace-nowrap transition-all"
              >
                Forgive & Send Verdict →
              </button>

              {!dodgeState.hidden && (
                <button
                  type="button"
                  onClick={handleStayMadClick}
                  style={{
                    transform: `translate(${dodgeState.x}px, ${dodgeState.y}px) scale(${dodgeState.scale})`,
                    opacity: Math.max(0.45, dodgeState.scale),
                  }}
                  className="min-h-[42px] px-4 py-2 bg-[#F6F2EA] text-[#5C5249] font-sans-ui text-xs uppercase tracking-[0.1em] font-medium border border-[#C5B9A5] cursor-pointer whitespace-nowrap transition-all duration-150"
                >
                  Stay Mad a Little Longer
                </button>
              )}
            </div>

            {stayMadCount > 0 && (
              <p
                aria-live="polite"
                className="mt-2 font-serif-body italic text-sm text-[#9B3F33]"
              >
                {dodgeState.hidden
                  ? 'The “Stay Mad” option has politely retired itself from the page.'
                  : `Attempt #${stayMadCount} to stay mad gently overruled by the typesetter.`}
              </p>
            )}
          </div>

          {/* Three-Part Post-Truce Covenant */}
          <div className="p-5 paper-inset text-left space-y-2.5">
            <div className="font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#445946]">
              The Post-Truce Covenant
            </div>
            <ul className="space-y-1.5 font-serif-body text-[16px] text-[#1E1916]">
              <li>01 · Resume our interrupted joke from the exact syllable it broke off.</li>
              <li>02 · Deliver your chosen peace flowers & milk chocolate restock.</li>
              <li>03 · Send an instant 3-second flare if life ever interrupts mid-chat again.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-[#DED5C5] text-left">
            <p className="font-serif-body text-[17px] leading-[1.7] text-[#5C5249] whitespace-pre-line mb-3">
              {config.closingPromise}
            </p>
            <p className="font-display text-2xl italic font-semibold text-[#1E1916]">
              — {config.senderName}
            </p>
            <p className="font-serif-body italic text-sm text-[#8A7E72] mt-3">
              {config.postscript}
            </p>
          </div>
        </div>

        {/* Right Column: Botanical Emblem Selector, Sovereign Verdict & Venetian Wax Seal */}
        <div className="paper-sheet lg:col-span-7 flex flex-col justify-between p-7 sm:p-10">
          <div>
            <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-[#445946] mb-2">
              Official Keepsake Dispatch · Prepared for {config.recipientName}
            </p>
            <h2
              id="seal-truce-heading"
              className="font-display text-3xl sm:text-4xl font-semibold text-[#1E1916] tracking-tight mb-2"
              style={{ textWrap: 'balance' }}
            >
              {config.recipientName}’s Sovereign Verdict
            </h2>
            <p className="font-serif-body text-[18px] text-[#5C5249] mb-6">
              Pick your preferred peace flower and verdict below. The moment you
              stamp the wax seal, your exact choices are dispatched straight to
              Varchasva.
            </p>

            {/* Step 1: Botanical Emblem Preference (Sunflowers vs. White Lilies) */}
            <div className="mb-6 p-5 paper-inset">
              <p className="font-display text-xl font-semibold text-[#1E1916] mb-3">
                1. Preferred Peace Flower: Golden Sunflowers or White Lilies?
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                role="group"
                aria-label="Choose your peace bouquet flower"
              >
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTap();
                    onChangeChosenFlower('sunflowers');
                  }}
                  aria-pressed={chosenFlower === 'sunflowers'}
                  className={`min-h-[46px] px-4 py-2.5 border font-sans-ui text-xs uppercase tracking-[0.12em] font-medium flex items-center justify-center gap-2.5 cursor-pointer transition-colors whitespace-nowrap ${
                    chosenFlower === 'sunflowers'
                      ? 'bg-[#1E1916] border-[#1E1916] text-[#FCF9F4]'
                      : 'bg-[#FCF9F4] border-[#C5B9A5] text-[#5C5249] hover:border-[#1E1916]'
                  }`}
                >
                  <SunflowerSvg className="w-5 h-5 shrink-0" />
                  <span>Golden Sunflowers</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTap();
                    onChangeChosenFlower('lilies');
                  }}
                  aria-pressed={chosenFlower === 'lilies'}
                  className={`min-h-[46px] px-4 py-2.5 border font-sans-ui text-xs uppercase tracking-[0.12em] font-medium flex items-center justify-center gap-2.5 cursor-pointer transition-colors whitespace-nowrap ${
                    chosenFlower === 'lilies'
                      ? 'bg-[#1E1916] border-[#1E1916] text-[#FCF9F4]'
                      : 'bg-[#FCF9F4] border-[#C5B9A5] text-[#5C5249] hover:border-[#1E1916]'
                  }`}
                >
                  <LilySvg className="w-5 h-5 shrink-0" />
                  <span>White Lilies</span>
                </button>
              </div>
            </div>

            {/* Step 2: 3 Verdict Radio Options */}
            <div
              role="radiogroup"
              aria-label="Forgiveness verdict"
              className="space-y-3 mb-6"
            >
              {VERDICT_OPTIONS.map((option) => {
                const active = verdict === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      soundEngine.playTap();
                      onSelectVerdict(option.value);
                      if (verdictError) setVerdictError(null);
                    }}
                    className={`w-full text-left p-5 border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#F5E6E3]/55 border-[#9B3F33]'
                        : 'bg-[#FCF9F4] border-[#DED5C5] hover:border-[#C5B9A5]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-xl sm:text-2xl font-semibold text-[#1E1916]">
                        {option.label}
                      </span>
                      <span
                        className={`font-mono-meta text-[11px] uppercase tracking-[0.14em] whitespace-nowrap shrink-0 ${
                          active ? 'text-[#9B3F33] font-medium' : 'text-[#8A7E72]'
                        }`}
                      >
                        {active ? 'Selected ✓' : 'Select'}
                      </span>
                    </div>
                    <p className="font-serif-body text-[16px] text-[#5C5249] mt-1">
                      {option.sublabel}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Step 3: Optional Marginal Note from Her */}
            <div className="mb-6">
              <label
                htmlFor="recipient-marginal-note"
                className="block font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#5C5249] mb-2"
              >
                Optional Note Back to Varchasva
              </label>
              <textarea
                id="recipient-marginal-note"
                rows={2}
                value={personalNote}
                onChange={(e) => onChangePersonalNote(e.target.value)}
                placeholder="Write a short reply, roast his timing a little, or leave it blank..."
                className="w-full px-4 py-3 bg-[#F6F2EA] border border-[#C5B9A5] font-serif-body text-lg text-[#1E1916] placeholder:text-[#8A7E72] focus:outline-none focus:border-[#9B3F33]"
              />
            </div>

            {verdictError && (
              <p
                role="alert"
                className="mb-4 font-sans-ui text-xs font-medium text-[#9B3F33]"
              >
                {verdictError}
              </p>
            )}
          </div>

          {/* Action / Sealed Certificate Footer */}
          <div className="pt-6 border-t border-[#DED5C5]">
            {!truceSealed ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-mono-meta text-xs text-[#5C5249] tabular-nums">
                  <span>{selectedOfferings.length} Peace Offerings Selected</span>
                </div>
                <button
                  type="button"
                  onClick={handleSealClick}
                  className="min-h-[46px] px-6 py-3 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#843126] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Stamp Wax Seal & Send to Varchasva
                </button>
              </div>
            ) : (
              <div
                data-testid="sealed-treaty-card"
                className="p-6 paper-inset space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C5B9A5] pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center animate-wax-stamp">
                      <WaxSealSvg broken={false} className="w-16 h-16" />
                    </div>
                    <div>
                      <p className="font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#445946]">
                        {dispatchStatus === 'sending'
                          ? 'Dispatching Your Choices to Varchasva...'
                          : '✓ Dispatched to Varchasva & Copied to Clipboard'}
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-[#1E1916]">
                        Peace Keepsake — Sealed by {config.recipientName}
                      </h3>
                      <p className="font-hand text-xl text-[#5C5249]">
                        Your exact choices have been recorded & sent
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onResetTruce}
                    className="inline-flex items-center gap-1.5 font-sans-ui text-xs uppercase tracking-[0.12em] font-medium text-[#5C5249] hover:text-[#1E1916] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Change Choices</span>
                  </button>
                </div>

                <pre className="font-serif-body text-base text-[#1E1916] whitespace-pre-wrap bg-[#FCF9F4] p-4 border border-[#C5B9A5]">
                  {replyText}
                </pre>

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCopyReply}
                    className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 bg-[#FCF9F4] text-[#1E1916] border border-[#C5B9A5] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium hover:border-[#1E1916] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#445946]" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <a
                    href={KEEPSAKE_META.chatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[42px] inline-flex items-center gap-2 px-5 py-2 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#843126] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open Instagram DM →</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
