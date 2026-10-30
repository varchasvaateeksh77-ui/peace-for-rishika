import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import {
  DEFAULT_APOLOGY_CONFIG,
  DEFAULT_PEACE_OFFERINGS,
  PERSPECTIVE_ITEMS,
  KEEPSAKE_META,
  PeaceFlowerChoice,
  PeaceOffering,
  ForgivenessVerdict,
  ScreenStep,
  buildShareableVerdictUrl,
  buildTruceReplyMessage,
  calculatePeaceProgress,
} from './utils/apologyLogic';
import { soundEngine } from './utils/soundEngine';
import {
  BotanicalBouquetCrestSvg,
  LilySvg,
  SunflowerSvg,
  WatermelonSvg,
} from './components/BotanicalArt';
import { TopBar } from './components/TopBar';
import { InteractiveEnvelope } from './components/InteractiveEnvelope';
import { PerspectiveLedger } from './components/PerspectiveLedger';
import { PeaceOfferingsSection } from './components/PeaceOfferingsSection';
import { TruceSealSection } from './components/TruceSealSection';

const STORAGE_KEY_STATE = 'rishika_multiscreen_peace_v5';

interface DispatchLogEntry {
  id: string;
  time: number;
  message: string;
}

export function App() {
  const config = DEFAULT_APOLOGY_CONFIG;

  const [currentStep, setCurrentStep] = useState<ScreenStep>(1);
  const [offerings, setOfferings] = useState<PeaceOffering[]>(
    DEFAULT_PEACE_OFFERINGS
  );
  const [selectedOfferingIds, setSelectedOfferingIds] = useState<string[]>([
    'fresh-watermelon',
    'milk-chocolate-inventory',
    'sunflowers-and-lilies',
  ]);
  const [verdict, setVerdict] = useState<ForgivenessVerdict | null>(null);
  const [chosenFlower, setChosenFlower] =
    useState<PeaceFlowerChoice>('watermelon-bouquet');
  const [truceSealed, setTruceSealed] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.isMuted());
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Varchasva's built-in live inbox modal to view whatever Rishika picked from anywhere
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [inboxEntries, setInboxEntries] = useState<DispatchLogEntry[]>([]);
  const [inboxLoading, setInboxLoading] = useState(false);

  // Restore interactive state from URL parameters (if shared link) or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('inbox') === '1' || params.get('varchasva') === '1') {
        setIsInboxOpen(true);
      }

      if (params.get('sealed') === '1') {
        const v = params.get('v') as ForgivenessVerdict | null;
        const f = params.get('f') as PeaceFlowerChoice | null;
        const c = params.get('c');
        const customRaw = params.get('custom');
        const note = params.get('note');

        if (v === 'forgiven' || v === 'probation' || v === 'cooling') {
          setVerdict(v);
        }
        if (
          f === 'sunflowers' ||
          f === 'lilies' ||
          f === 'watermelon-bouquet'
        ) {
          setChosenFlower(f);
        }
        let customList: PeaceOffering[] = [];
        if (customRaw) {
          customList = customRaw
            .split('|')
            .filter(Boolean)
            .map((title, idx) => ({
              id: `custom-url-${idx}`,
              indexLabel: String(DEFAULT_PEACE_OFFERINGS.length + idx + 1).padStart(2, '0'),
              title,
              description: `Added directly by ${config.recipientName} as a binding condition of peace.`,
              category: 'Custom Demand · Immediate',
              iconKind: 'watermelon',
            }));
          setOfferings([...DEFAULT_PEACE_OFFERINGS, ...customList]);
        }
        if (c) {
          const ids = c.split(',').filter(Boolean);
          setSelectedOfferingIds([
            ...ids.filter((id) => !id.startsWith('custom-')),
            ...customList.map((item) => item.id),
          ]);
        }
        if (note) {
          setPersonalNote(note);
        }
        setTruceSealed(true);
        setDispatchStatus('sent');
        setCurrentStep(5);
        return;
      }

      const raw = localStorage.getItem(STORAGE_KEY_STATE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.selectedOfferingIds)) {
          setSelectedOfferingIds(parsed.selectedOfferingIds);
        }
        if (Array.isArray(parsed.customOfferings)) {
          setOfferings([
            ...DEFAULT_PEACE_OFFERINGS,
            ...parsed.customOfferings,
          ]);
        }
        if (parsed.verdict) {
          setVerdict(parsed.verdict);
        }
        if (
          parsed.chosenFlower === 'sunflowers' ||
          parsed.chosenFlower === 'lilies' ||
          parsed.chosenFlower === 'watermelon-bouquet'
        ) {
          setChosenFlower(parsed.chosenFlower);
        }
        if (typeof parsed.truceSealed === 'boolean') {
          setTruceSealed(parsed.truceSealed);
          if (parsed.truceSealed) setDispatchStatus('sent');
        }
        if (typeof parsed.personalNote === 'string') {
          setPersonalNote(parsed.personalNote);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, [config.recipientName]);

  // Save interactive state changes
  useEffect(() => {
    try {
      const customOfferings = offerings.filter(
        (o) => !DEFAULT_PEACE_OFFERINGS.some((def) => def.id === o.id)
      );
      localStorage.setItem(
        STORAGE_KEY_STATE,
        JSON.stringify({
          selectedOfferingIds,
          customOfferings,
          verdict,
          chosenFlower,
          truceSealed,
          personalNote,
        })
      );
    } catch {
      // ignore
    }
  }, [
    selectedOfferingIds,
    offerings,
    verdict,
    chosenFlower,
    truceSealed,
    personalNote,
  ]);

  const goToStep = (nextStep: ScreenStep) => {
    soundEngine.playTap();
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchDispatchInbox = async () => {
    setInboxLoading(true);
    try {
      const res = await fetch(
        `https://ntfy.sh/${KEEPSAKE_META.ntfyTopic}/json?poll=1&since=all`
      );
      const text = await res.text();
      const lines = text
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
      const parsedEntries: DispatchLogEntry[] = [];
      for (const line of lines) {
        try {
          const item = JSON.parse(line);
          if (item.event === 'message' && item.message) {
            parsedEntries.push({
              id: item.id,
              time: item.time * 1000,
              message: item.message,
            });
          }
        } catch {
          // ignore malformed line
        }
      }
      setInboxEntries(parsedEntries.reverse());
    } catch {
      // ignore network error
    } finally {
      setInboxLoading(false);
    }
  };

  useEffect(() => {
    if (isInboxOpen) {
      fetchDispatchInbox();
    }
  }, [isInboxOpen]);

  const handleToggleOffering = (id: string) => {
    soundEngine.playBloomNote(2);
    setSelectedOfferingIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomOffering = (title: string) => {
    soundEngine.playHeartShimmer();
    const nextIndex = String(offerings.length + 1).padStart(2, '0');
    const newOffering: PeaceOffering = {
      id: `custom-${Date.now()}`,
      indexLabel: nextIndex,
      title,
      description: `Added directly by ${config.recipientName} as a binding condition of peace.`,
      category: 'Custom Demand · Immediate',
      iconKind: 'watermelon',
    };
    setOfferings((prev) => [...prev, newOffering]);
    setSelectedOfferingIds((prev) => [...prev, newOffering.id]);
  };

  const transmitChoicesToVarchasva = async (finalVerdict: ForgivenessVerdict) => {
    setDispatchStatus('sending');
    const chosenList = offerings.filter((o) =>
      selectedOfferingIds.includes(o.id)
    );
    const customTitles = offerings
      .filter((o) => !DEFAULT_PEACE_OFFERINGS.some((def) => def.id === o.id))
      .map((o) => o.title);

    const shareUrl = buildShareableVerdictUrl(
      window.location.origin + window.location.pathname,
      {
        verdict: finalVerdict,
        chosenFlower,
        selectedOfferingIds,
        customOfferings: customTitles,
        personalNote,
      }
    );

    try {
      window.history.replaceState({}, '', shareUrl);
    } catch {
      // ignore
    }

    const messagePayload = buildTruceReplyMessage({
      recipientName: config.recipientName,
      verdict: finalVerdict,
      selectedOfferingTitles: chosenList.map((o) => o.title),
      personalNote,
      chosenFlower,
      shareUrl,
    });

    try {
      await navigator.clipboard.writeText(messagePayload);
    } catch {
      // ignore clipboard permission errors
    }

    try {
      await fetch(`https://ntfy.sh/${KEEPSAKE_META.ntfyTopic}`, {
        method: 'POST',
        body: messagePayload,
      });
    } catch {
      // ignore network error
    }

    setDispatchStatus('sent');
  };

  const handleSealTruce = (overrideVerdict?: ForgivenessVerdict) => {
    const finalVerdict = overrideVerdict || verdict || 'forgiven';
    soundEngine.playHeartShimmer();
    setTruceSealed(true);
    transmitChoicesToVarchasva(finalVerdict);
  };

  const handleResetTruce = () => {
    soundEngine.playTap();
    setTruceSealed(false);
    setDispatchStatus('idle');
  };

  const handleToggleMusic = () => {
    setIsMuted(soundEngine.toggleMute());
  };

  const progress = calculatePeaceProgress({
    currentStep,
    selectedOfferings: selectedOfferingIds,
    verdict,
    truceSealed,
  });

  const selectedOfferingsList = offerings.filter((o) =>
    selectedOfferingIds.includes(o.id)
  );

  const customOfferingTitles = offerings
    .filter((o) => !DEFAULT_PEACE_OFFERINGS.some((def) => def.id === o.id))
    .map((o) => o.title);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <div>
        {/* Multi-Screen Top Navigation Bar (Revealed once the envelope has been opened) */}
        {currentStep > 1 && (
          <>
            <TopBar
              recipientName={config.recipientName}
              currentStep={currentStep}
              isMuted={isMuted}
              onSelectStep={goToStep}
              onToggleMusic={handleToggleMusic}
            />

            {/* Progress Bar */}
            <div
              aria-label="Storybook page progress"
              className="relative z-20 w-full h-1 bg-[#DED5C5]"
            >
              <div
                className="h-full bg-[#9B3F33] transition-transform duration-300 origin-left"
                style={{ transform: `scaleX(${progress.percentage / 100})` }}
              />
            </div>
          </>
        )}

        <main className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
          {/* SCREEN 1: THE INTERACTIVE 3D ENVELOPE (OPENS & DISAPPEARS ON CLICK) */}
          {currentStep === 1 && (
            <InteractiveEnvelope
              recipientName={config.recipientName}
              nickname={config.nickname}
              senderName={config.senderName}
              onFinishOpen={() => setCurrentStep(2)}
            />
          )}

          {/* SCREEN 2: THE DEDICATED LETTER PAGE (REVEALED AFTER ENVELOPE OPENS) */}
          {currentStep === 2 && (
            <section
              aria-labelledby="letter-heading"
              className="py-4 sm:py-6 flex flex-col items-center animate-in fade-in duration-500"
            >
              <article className="paper-sheet double-rule-frame w-full max-w-3xl p-7 sm:p-12">
                {/* Symmetrical Botanical Garland Crest */}
                <div className="flex flex-col items-center text-center pb-6 mb-7 border-b border-[#DED5C5]">
                  <p className="font-mono-meta text-[11px] uppercase tracking-[0.18em] text-[#445946]">
                    {config.subtitleTag}
                  </p>
                  <BotanicalBouquetCrestSvg className="w-full max-w-[310px] h-auto my-2" />
                  <h1
                    id="letter-heading"
                    className="mt-1 font-display italic text-3xl sm:text-4xl font-semibold text-[#1E1916]"
                  >
                    {config.greetingLine}
                  </h1>
                  <p className="font-serif-body italic text-base sm:text-lg text-[#5C5249] mt-1.5 max-w-xl">
                    {config.subheadline}
                  </p>
                </div>

                {/* Simple, Poetic 3-Paragraph Letter */}
                <div className="space-y-6 font-serif-body text-[19px] sm:text-[21px] leading-[1.82] text-[#1E1916]">
                  <p className="first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#9B3F33]">
                    {config.jokeReflection}
                  </p>

                  <p>{config.philosophicalTruth}</p>

                  <p>{config.listeningPledge}</p>
                </div>

                {/* Epigraph Quote & Signature */}
                <blockquote className="my-8 p-5 paper-inset border-l-2 border-l-[#9B3F33]">
                  <p className="font-display text-2xl italic font-medium text-[#1E1916] leading-snug">
                    {config.epigraphQuote}
                  </p>
                </blockquote>

                <div className="pt-6 border-t border-[#DED5C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <SunflowerSvg className="w-9 h-9" spinSlow />
                      <WatermelonSvg className="w-9 h-9" />
                      <LilySvg className="w-9 h-9" />
                    </div>
                    <div>
                      <p className="font-hand text-2xl text-[#9B3F33]">
                        Written with zero excuses & cold watermelon waiting for you
                      </p>
                      <p className="font-display text-2xl italic font-semibold text-[#1E1916] mt-0.5">
                        {config.senderName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="min-h-[42px] px-4 py-2 bg-[#FCF9F4] border border-[#C5B9A5] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium text-[#1E1916] hover:border-[#1E1916] transition-colors cursor-pointer"
                    >
                      ← Replay Envelope
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="min-h-[42px] px-5 py-2.5 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#843126] transition-colors cursor-pointer"
                    >
                      Next: Three Truths (3/5) →
                    </button>
                  </div>
                </div>
              </article>
            </section>
          )}

          {/* SCREEN 3: THREE SIMPLE TRUTHS */}
          {currentStep === 3 && (
            <PerspectiveLedger
              items={PERSPECTIVE_ITEMS}
              onPrev={() => goToStep(2)}
              onNext={() => goToStep(4)}
            />
          )}

          {/* SCREEN 4: THE PEACE BASKET (WATERMELON, MILK CHOCOLATE, FLOWERS, COOKING) */}
          {currentStep === 4 && (
            <PeaceOfferingsSection
              recipientName={config.recipientName}
              offerings={offerings}
              selectedIds={selectedOfferingIds}
              onToggleOffering={handleToggleOffering}
              onAddCustomOffering={handleAddCustomOffering}
              onPrev={() => goToStep(3)}
              onNext={() => goToStep(5)}
            />
          )}

          {/* SCREEN 5: FINAL VERDICT & WAX SEAL */}
          {currentStep === 5 && (
            <TruceSealSection
              config={config}
              selectedOfferings={selectedOfferingsList}
              customOfferingTitles={customOfferingTitles}
              verdict={verdict}
              truceSealed={truceSealed}
              personalNote={personalNote}
              chosenFlower={chosenFlower}
              dispatchStatus={dispatchStatus}
              onSelectVerdict={(v) => setVerdict(v)}
              onChangeChosenFlower={(f) => setChosenFlower(f)}
              onChangePersonalNote={(note) => setPersonalNote(note)}
              onSealTruce={handleSealTruce}
              onResetTruce={handleResetTruce}
              onPrev={() => goToStep(4)}
            />
          )}
        </main>
      </div>

      {/* Quiet Footer with Page Indicator & Live Dispatch Log for Varchasva */}
      <footer className="relative z-10 mt-6 border-t border-[#DED5C5] py-5 px-6 lg:px-12 bg-[#FCF9F4]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-meta text-[11px] uppercase tracking-[0.15em] text-[#5C5249]">
          <div className="flex flex-wrap items-center gap-2">
            <span>Kept for {config.recipientName} (Mommy Biceps)</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#9B3F33] font-medium">{progress.stageLabel}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsInboxOpen(true)}
              className="text-[#8A7E72] hover:text-[#1E1916] transition-colors cursor-pointer"
            >
              Dispatch Log
            </button>
          </div>
        </div>
      </footer>

      {/* Live Dispatch Log Modal so Varchasva can see everything Rishika selected from any device */}
      {isInboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1916]/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dispatch-log-title"
        >
          <div className="paper-sheet w-full max-w-2xl max-h-[82vh] flex flex-col p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#DED5C5]">
              <div>
                <p className="font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#445946]">
                  Live Cloud Feed · Topic: {KEEPSAKE_META.ntfyTopic}
                </p>
                <h2
                  id="dispatch-log-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#1E1916]"
                >
                  Rishika’s Sealed Verdict Dispatches
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchDispatchInbox}
                  aria-label="Refresh dispatch log"
                  className="p-2 border border-[#C5B9A5] bg-[#F6F2EA] text-[#1E1916] hover:border-[#9B3F33] cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${inboxLoading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsInboxOpen(false)}
                  aria-label="Close dispatch log"
                  className="p-2 border border-[#C5B9A5] bg-[#F6F2EA] text-[#1E1916] hover:border-[#9B3F33] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1 flex-1">
              {inboxLoading && inboxEntries.length === 0 ? (
                <p className="font-serif-body italic text-lg text-[#5C5249] py-8 text-center">
                  Checking live dispatches...
                </p>
              ) : inboxEntries.length === 0 ? (
                <div className="p-6 paper-inset text-center space-y-2">
                  <p className="font-display text-2xl font-semibold text-[#1E1916]">
                    No Sealed Verdict Dispatched Yet
                  </p>
                  <p className="font-serif-body text-base text-[#5C5249]">
                    As soon as Rishika clicks “Stamp Wax Seal & Send to Varchasva” (or
                    “Forgive & Send Verdict”), her exact flower/watermelon choice,
                    claimed peace basket items, and note will appear right here
                    automatically.
                  </p>
                </div>
              ) : (
                inboxEntries.map((entry) => (
                  <div key={entry.id} className="p-5 paper-inset space-y-2">
                    <div className="font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#9B3F33]">
                      Recorded · {new Date(entry.time).toLocaleString()}
                    </div>
                    <pre className="font-serif-body text-base text-[#1E1916] whitespace-pre-wrap bg-[#FCF9F4] p-4 border border-[#DED5C5]">
                      {entry.message}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
