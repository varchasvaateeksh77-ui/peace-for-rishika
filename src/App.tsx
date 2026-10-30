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
  buildShareableVerdictUrl,
  buildTruceReplyMessage,
  calculatePeaceProgress,
  tokenizeInlineIcons,
} from './utils/apologyLogic';
import { soundEngine } from './utils/soundEngine';
import {
  InlineSunflowerIcon,
  InlineWhiteHeartIcon,
  PressedBotanicalPlateSvg,
  WaxSealSvg,
} from './components/BotanicalArt';
import { TopBar } from './components/TopBar';
import { PerspectiveLedger } from './components/PerspectiveLedger';
import { PeaceOfferingsSection } from './components/PeaceOfferingsSection';
import { TruceSealSection } from './components/TruceSealSection';

const STORAGE_KEY_STATE = 'rishika_finepress_apology_state_v4';

interface DispatchLogEntry {
  id: string;
  time: number;
  message: string;
}

export function App() {
  const config = DEFAULT_APOLOGY_CONFIG;

  const [offerings, setOfferings] = useState<PeaceOffering[]>(
    DEFAULT_PEACE_OFFERINGS
  );
  const [selectedOfferingIds, setSelectedOfferingIds] = useState<string[]>([
    'finish-conversation',
    'milk-chocolate-inventory',
  ]);
  const [verdict, setVerdict] = useState<ForgivenessVerdict | null>(null);
  const [chosenFlower, setChosenFlower] =
    useState<PeaceFlowerChoice>('sunflowers');
  const [truceSealed, setTruceSealed] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.isMuted());
  const [sealBroken, setSealBroken] = useState(false);
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
        if (f === 'sunflowers' || f === 'lilies') {
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
              description: `Inscribed directly by ${config.recipientName} as a binding condition of peace.`,
              category: 'Bespoke Clause · Immediate',
              iconKind: 'sunflower',
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
          parsed.chosenFlower === 'lilies'
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
      description: `Inscribed directly by ${config.recipientName} as a binding condition of peace.`,
      category: 'Bespoke Clause · Immediate',
      iconKind: 'sunflower',
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

    // Update browser URL so if she copies the URL bar, it carries her exact selections
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

    // Automatically copy to clipboard so she can paste it in 1 tap if she opens Instagram
    try {
      await navigator.clipboard.writeText(messagePayload);
    } catch {
      // ignore clipboard permission errors
    }

    // Send live push/log dispatch to ntfy.sh so Varchasva receives it automatically
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

  const renderPoeticText = (text: string) => {
    return tokenizeInlineIcons(text).map((tok, i) => {
      if (tok.type === 'sunflower') {
        return <InlineSunflowerIcon key={i} />;
      }
      if (tok.type === 'heart') {
        return <InlineWhiteHeartIcon key={i} />;
      }
      return <React.Fragment key={i}>{tok.value}</React.Fragment>;
    });
  };

  const progress = calculatePeaceProgress({
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
    <div id="epistle-top" className="relative min-h-screen flex flex-col">
      {/* Fine Press Editorial Top Bar (No editing buttons) */}
      <TopBar recipientName={config.recipientName} />

      {/* Delicate Venetian Wax Progress Hairline */}
      <div
        aria-label="Peace restoration progress"
        className="relative z-20 w-full h-1 bg-[#DED5C5]"
      >
        <div
          className="h-full bg-[#9B3F33] transition-transform duration-300 origin-left"
          style={{ transform: `scaleX(${progress.percentage / 100})` }}
        />
      </div>

      <main className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-8 lg:px-12">
        {/* Fine Press Archival Metadata & Ambient Chime Strip */}
        <div className="py-4 border-b border-[#DED5C5] flex flex-wrap items-center justify-between gap-4 font-mono-meta text-[11px] uppercase tracking-[0.15em] text-[#5C5249]">
          <div className="flex flex-wrap items-center gap-3 tabular-nums">
            <span>{config.catalogNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{config.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#9B3F33] font-medium">
              {progress.stageLabel} ({progress.percentage}%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleMusic}
              aria-label={
                isMuted
                  ? 'Turn on gentle acoustic chime'
                  : 'Mute gentle acoustic chime'
              }
              className="min-h-[34px] px-3.5 py-1 bg-[#FCF9F4] border border-[#C5B9A5] font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#1E1916] hover:border-[#9B3F33] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isMuted ? 'Ambient Chime: Muted' : 'Ambient Chime: Active ♪'}
            </button>
          </div>
        </div>

        {/* SECTION I: THE FINE PRESS MANUSCRIPT & APOLOGY HERO */}
        <section
          id="the-silence"
          className="py-12 lg:py-16 border-b border-[#DED5C5]"
          aria-labelledby="epistle-hero-heading"
        >
          {/* Editorial Folio Masthead */}
          <div className="max-w-3xl mb-12">
            <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-[#445946] mb-3">
              Section I · A Personal Epistle for {config.recipientName}
            </p>
            <h1
              id="epistle-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[62px] font-semibold text-[#1E1916] tracking-tight leading-[1.06] mb-5"
              style={{ textWrap: 'balance' }}
            >
              {config.headline}
            </h1>
            <p className="font-serif-body italic text-xl lg:text-2xl text-[#5C5249] leading-relaxed">
              {config.subheadline}
            </p>
          </div>

          {/* 2-Column Asymmetric Editorial Split: Letter Sheet (Left 7 cols) + Herbarium Plate & Truth Ledger (Right 5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left 7 Columns: The Letterpress Manuscript */}
            <article className="paper-sheet double-rule-frame lg:col-span-7 flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <div className="flex items-center justify-between gap-4 pb-6 mb-7 border-b border-[#DED5C5]">
                  <div>
                    <p className="font-mono-meta text-[11px] uppercase tracking-[0.18em] text-[#8A7E72]">
                      Verbatim Dispatch · Kept for {config.recipientName}
                    </p>
                    <h2 className="mt-1.5 font-display italic text-3xl sm:text-4xl font-semibold text-[#1E1916]">
                      {renderPoeticText(config.greetingLine)}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playHeartShimmer();
                      setSealBroken((b) => !b);
                    }}
                    aria-label="Venetian wax seal monogram R"
                    className="shrink-0 transition-transform hover:scale-105 cursor-pointer"
                  >
                    <WaxSealSvg broken={sealBroken} className="w-20 h-20" />
                  </button>
                </div>

                {/* Editorial Serif Prose Paragraphs */}
                <div className="space-y-6 font-serif-body text-[19px] sm:text-[20px] leading-[1.82] text-[#1E1916]">
                  <p className="whitespace-pre-line first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#9B3F33]">
                    {renderPoeticText(config.jokeReflection)}
                  </p>

                  <p className="whitespace-pre-line">
                    {renderPoeticText(config.philosophicalTruth)}
                  </p>

                  <p className="whitespace-pre-line">
                    {renderPoeticText(config.listeningPledge)}
                  </p>
                </div>
              </div>

              <div className="pt-7 mt-9 border-t border-[#DED5C5] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-hand text-xl text-[#5C5249]">
                    Set in type with patience, zero excuses & quiet care
                  </p>
                  <p className="font-display text-2xl italic font-semibold text-[#1E1916] mt-0.5">
                    {renderPoeticText(config.senderName)}
                  </p>
                </div>

                <a
                  href="#peace-offerings"
                  className="min-h-[42px] inline-flex items-center px-5 py-2.5 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#843126] transition-colors whitespace-nowrap shrink-0"
                >
                  Choose Peace Offerings →
                </a>
              </div>
            </article>

            {/* Right 5 Columns: Herbarium Botanical Specimen, Epigraph & Ledger of Facts */}
            <aside className="paper-sheet lg:col-span-5 flex flex-col justify-between p-7 sm:p-9">
              <div>
                <div className="flex items-center justify-between font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#8A7E72] pb-3 mb-5 border-b border-[#DED5C5]">
                  <span>Botanical Frontispiece</span>
                  <span>Plate No. 01</span>
                </div>

                <div className="py-3 flex flex-col items-center justify-center mb-5">
                  <PressedBotanicalPlateSvg
                    className="w-full max-w-[240px] h-auto"
                    activeFlower={chosenFlower}
                  />
                </div>

                {/* Philosophical Epigraph */}
                <blockquote className="py-5 border-y border-[#DED5C5] my-4">
                  <p className="font-display text-2xl italic font-medium text-[#1E1916] leading-snug mb-2">
                    {config.epigraphQuote}
                  </p>
                  <footer className="font-mono-meta text-[11px] uppercase tracking-[0.14em] text-[#8A7E72]">
                    — {config.epigraphAuthor}
                  </footer>
                </blockquote>
              </div>

              {/* Concise Ledger of the Moment */}
              <div className="pt-5 border-t border-[#DED5C5] space-y-3">
                <div className="font-mono-meta text-[11px] uppercase tracking-[0.16em] text-[#445946]">
                  The Record of the Moment
                </div>
                <dl className="space-y-2.5 font-serif-body text-[17px] text-[#1E1916]">
                  <div className="flex justify-between gap-4 py-1.5 border-b border-[#DED5C5]">
                    <dt className="text-[#5C5249]">The Joke Itself:</dt>
                    <dd className="font-medium text-[#1E1916] text-right">
                      Harmless & warm
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-1.5 border-b border-[#DED5C5]">
                    <dt className="text-[#5C5249]">What Broke the Peace:</dt>
                    <dd className="font-medium text-[#1E1916] text-right">
                      Vanishing right in the middle of it
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-1.5 border-b border-[#DED5C5]">
                    <dt className="text-[#5C5249]">Was Leaving a Choice?</dt>
                    <dd className="font-semibold text-[#9B3F33] text-right">
                      Never—purely circumstance
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-1">
                    <dt className="text-[#5C5249]">Peace Inventory Ready:</dt>
                    <dd className="font-medium text-[#445946] text-right">
                      Sunflowers, Lilies & Milk Cacao
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* SECTION II: THREE PHILOSOPHICAL NOTES ON LEAVING MID-JOKE */}
        <PerspectiveLedger items={PERSPECTIVE_ITEMS} />

        {/* SECTION III: THE REPARATIONS LEDGER */}
        <PeaceOfferingsSection
          recipientName={config.recipientName}
          offerings={offerings}
          selectedIds={selectedOfferingIds}
          onToggleOffering={handleToggleOffering}
          onAddCustomOffering={handleAddCustomOffering}
        />

        {/* SECTION IV: THE OLIVE BRANCH & SOVEREIGN VERDICT */}
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
        />
      </main>

      {/* Quiet Colophon Footer (No editing buttons) */}
      <footer className="relative z-10 mt-12 border-t border-[#DED5C5] py-8 px-6 lg:px-12 bg-[#FCF9F4]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-meta text-[11px] uppercase tracking-[0.15em] text-[#5C5249]">
          <div className="flex flex-wrap items-center gap-2">
            <span>Colophon · Kept for {config.recipientName}</span>
            <span aria-hidden="true">·</span>
            <span>Fine Press Peace Edition</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsInboxOpen(true)}
              className="text-[#8A7E72] hover:text-[#1E1916] transition-colors cursor-pointer"
            >
              Dispatch Log
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="#epistle-top"
              className="hover:text-[#9B3F33] underline underline-offset-4"
            >
              Return to Top ↑
            </a>
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
                    “Forgive & Send Verdict”), her exact flower choice, claimed peace
                    offerings, and note will appear right here automatically.
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
