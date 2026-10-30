export interface ApologyConfig {
  recipientName: string;
  senderName: string;
  catalogNumber: string;
  dateLabel: string;
  headline: string;
  subheadline: string;
  epigraphQuote: string;
  epigraphAuthor: string;
  greetingLine: string;
  jokeReflection: string;
  philosophicalTruth: string;
  listeningPledge: string;
  closingPromise: string;
  postscript: string;
}

export interface PerspectiveItem {
  id: string;
  romanIndex: string;
  timestampTag: string;
  title: string;
  subtitle: string;
  body: string;
  marginNote: string;
  secretVerse: string;
  motif: 'sunflower' | 'lily' | 'wax';
}

export interface PeaceOffering {
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  category: string;
  iconKind: 'sunflower' | 'chocolate' | 'lily' | 'cooking' | 'flare';
}

export type ForgivenessVerdict = 'forgiven' | 'probation' | 'cooling';
export type PeaceFlowerChoice = 'sunflowers' | 'lilies';

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'sunflower' }
  | { type: 'heart' };

export const KEEPSAKE_META = {
  herName: 'Rishika',
  chatUrl: 'https://ig.me/m/trytofindvxrchsva__',
  ntfyTopic: 'varchasva_rishika_truce_77',
};

export const DEFAULT_APOLOGY_CONFIG: ApologyConfig = {
  recipientName: 'Rishika',
  senderName: 'Always in your corner, Varchasva',
  catalogNumber: 'Folio No. IV · A Personal Peace Keepsake',
  dateLabel: 'Kept exclusively for Rishika · Fine Press Edition',
  headline: 'For Leaving in the Middle of Our Laugh.',
  subheadline:
    'Because the joke itself was never the problem—and getting pulled away mid-sentence was purely circumstance, never a choice of the heart.',
  epigraphQuote:
    '“Between being pulled away by necessity and choosing to walk away lies an entire universe—and my choice is always to stay where you are laughing.”',
  epigraphAuthor: 'Marginalia · On Unfinished Sentences',
  greetingLine: 'Dearest Rishika,',
  jokeReflection: `I have been replaying that moment in my head ever since it happened. We were just messing around and joking the way we always do, and I know the joke itself didn't bother you at all. What ruined the moment—and what you have every right to be mad at me for—is that I vanished right in the middle of it. Disappearing halfway through a laugh makes it feel like I carelessly brushed you off, and I hate that I left you sitting there with an unfinished moment.`,
  philosophicalTruth: `In philosophy, there is a world of difference between necessity and choice—between being pulled away by sudden circumstance and choosing to leave. I need you to know, without a single shadow of doubt, that leaving in the middle of talking to you is never a choice I make. Whenever the choice belongs to me, there is nowhere else I would rather be than right there in the middle of your laugh.`,
  listeningPledge: `I also understand why you didn't want to hear it when I kept trying to explain myself right after. When someone disappears mid-joke, rapid-fire explanations sound like excuses trying to win an argument rather than care for how frustrating it felt on your side. So I stopped trying to talk over your anger and made you this quiet page instead—so my apology could wait patiently for you, rather than demanding you listen on my schedule.`,
  closingPromise: `You deserve conversations that never break off without warning, a proper peace offering of milk chocolate, and a home-cooked meal where you hold full critic immunity to rate my cooking as harshly as my timing deserved.`,
  postscript:
    'P.S. Take all the time you need to be annoyed with me first—this page, along with golden sunflowers and quiet white lilies, will be right here until you are ready to finish that laugh.',
};

export const PERSPECTIVE_ITEMS: PerspectiveItem[] = [
  {
    id: 'what-silence-said',
    romanIndex: 'I',
    timestampTag: 'Beat 01 · The Shared Laugh',
    title: 'The Joke Was Harmless; The Vanishing Was Not',
    subtitle: 'Why Your Frustration Makes Complete Sense',
    body: 'It wasn’t the teasing or the joke that bothered you at all—we were right in the middle of a warm moment. What felt abrupt and unfair was the sudden silence right in the middle of it, turning a shared laugh into an unfinished room.',
    marginNote: '“An unfinished laugh echoes louder than an ordinary silence.”',
    secretVerse:
      'Note in the margin: I never want you to feel like a moment with you is something I can pause without care.',
    motif: 'sunflower',
  },
  {
    id: 'circumstance-vs-choice',
    romanIndex: 'II',
    timestampTag: 'Beat 02 · The Sudden Interruption',
    title: 'Necessity vs. Choice',
    subtitle: 'Why Leaving Mid-Moment Was Never Voluntary',
    body: 'Being pulled away in the middle of our joke was purely external circumstance, never a decision of the heart. Given a free choice between anything else in the world and finishing a conversation with you, I am choosing you every single time.',
    marginNote: '“Circumstance interrupted the sentence; choice brings me back to finish it.”',
    secretVerse:
      'Note in the margin: Even when life pulls me away for a moment, my attention is still turned toward you like a sunflower toward the sun.',
    motif: 'lily',
  },
  {
    id: 'why-explanations-failed',
    romanIndex: 'III',
    timestampTag: 'Beat 03 · After the Silence',
    title: 'Why Rushed Explanations Missed the Point',
    subtitle: 'Patience Over Defensiveness',
    body: 'When I kept trying to explain why I had to leave while you were still upset, I was asking you to process my reason before acknowledging how annoying it felt on your side. You didn’t need a courtroom defense—you deserved a thoughtful pause.',
    marginNote: '“Explanations try to rush the past; patience restores the peace.”',
    secretVerse:
      'Note in the margin: No more rapid-fire excuses—just quiet accountability until your smile comes back.',
    motif: 'wax',
  },
];

export const DEFAULT_PEACE_OFFERINGS: PeaceOffering[] = [
  {
    id: 'finish-conversation',
    indexLabel: '01',
    title: 'The Unfinished Laugh Replay',
    description:
      'We pick up our interrupted joke from the exact syllable where it broke off—with my phone on Do Not Disturb and zero outside interruptions allowed.',
    category: 'Presence · Uninterrupted Time',
    iconKind: 'sunflower',
  },
  {
    id: 'three-second-flare',
    indexLabel: '02',
    title: 'The 3-Second Flare Protocol',
    description:
      'If an unavoidable real-life emergency ever pulls me away mid-conversation again, I send an instant shorthand flare first so you are never left wondering.',
    category: 'Communication · Zero Ghosting',
    iconKind: 'flare',
  },
  {
    id: 'milk-chocolate-inventory',
    indexLabel: '03',
    title: 'Proper Milk Chocolate Peace Offering',
    description:
      'A dedicated restock of your favourite milk chocolate delivered in person—because a sincere apology is always better when accompanied by something sweet.',
    category: 'Sweet Reparation · Milk Cacao',
    iconKind: 'chocolate',
  },
  {
    id: 'cook-without-offense',
    indexLabel: '04',
    title: 'Home-Cooked Apology Meal (Full Critic Immunity)',
    description:
      'I cook for you properly to make up for it, and I officially waive my right to act offended even if you score the dish a 2/10 just to humble me.',
    category: 'Culinary Reparation · Chef on Probation',
    iconKind: 'cooking',
  },
  {
    id: 'listen-without-defense',
    indexLabel: '05',
    title: 'Unfiltered Roast & Venting Immunity',
    description:
      'You get five uninterrupted minutes to tell me how annoying my mid-joke exit was while I listen, nod, and offer zero defensive "buts" or excuses.',
    category: 'Accountability · Zero Excuses',
    iconKind: 'lily',
  },
];

export function tokenizeInlineIcons(text: string): InlineToken[] {
  const parts = text.split(/(🌻|🤍)/g);
  const tokens: InlineToken[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (part === '🌻') {
      tokens.push({ type: 'sunflower' });
    } else if (part === '🤍') {
      tokens.push({ type: 'heart' });
    } else {
      tokens.push({ type: 'text', value: part });
    }
  }
  return tokens;
}

/**
 * Deterministic dodging offset for the playful "Stay Mad a Little Longer" button,
 * shifting gently and yielding on the 5th attempt.
 */
export function computeDodgeOffset(attemptCount: number): {
  x: number;
  y: number;
  scale: number;
  hidden: boolean;
} {
  if (attemptCount <= 0) {
    return { x: 0, y: 0, scale: 1, hidden: false };
  }
  if (attemptCount >= 5) {
    return { x: 0, y: 0, scale: 0, hidden: true };
  }

  const offsets = [
    { x: 46, y: -14 },
    { x: -52, y: 16 },
    { x: 42, y: 18 },
    { x: -40, y: -14 },
  ];
  const pick = offsets[(attemptCount - 1) % offsets.length];
  const scale = Number(Math.max(0.62, 1 - attemptCount * 0.09).toFixed(2));
  return {
    x: pick.x,
    y: pick.y,
    scale,
    hidden: false,
  };
}

export function validateCustomOffering(
  title: string
): { valid: boolean; error: string | null } {
  const trimmed = title.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter a peace term before adding it to the ledger.' };
  }
  if (trimmed.length < 3) {
    return { valid: false, error: 'Peace term must be at least 3 characters long.' };
  }
  return { valid: true, error: null };
}

export function calculatePeaceProgress(params: {
  selectedOfferings: string[];
  verdict: ForgivenessVerdict | null;
  truceSealed: boolean;
}): {
  percentage: number;
  stageLabel: string;
  offeringCount: number;
} {
  const offeringCount = params.selectedOfferings.length;

  let score = 40;
  score += Math.min(offeringCount, 4) * 10;
  if (params.verdict) {
    score += 15;
  }
  if (params.truceSealed) {
    score = 100;
  }

  const percentage = Math.min(100, score);

  let stageLabel = 'Reading the Epistle';
  if (params.truceSealed) {
    stageLabel = 'Dispatched to Varchasva';
  } else if (params.verdict) {
    stageLabel = 'Ready to Seal & Send';
  } else if (offeringCount > 0) {
    stageLabel = 'Selecting Reparations';
  }

  return {
    percentage,
    stageLabel,
    offeringCount,
  };
}

export function buildTruceReplyMessage(params: {
  recipientName: string;
  verdict: ForgivenessVerdict;
  selectedOfferingTitles: string[];
  personalNote: string;
  chosenFlower?: PeaceFlowerChoice;
  shareUrl?: string;
}): string {
  const verdictTextMap: Record<ForgivenessVerdict, string> = {
    forgiven:
      'I read your letter. Peace is officially restored—and you are forgiven for vanishing in the middle of our laugh.',
    probation:
      'I read your letter. Truce accepted on probation—no disappearing mid-joke again, and make sure the peace offerings are delivered.',
    cooling:
      'I read your letter and I hear that leaving wasn’t a choice. Give me a little quiet space first, and we’ll talk soon.',
  };

  const flowerLabel =
    params.chosenFlower === 'lilies'
      ? 'White Lilies'
      : 'Golden Sunflowers';

  const lines: string[] = [
    `From ${params.recipientName} — Peace Keepsake Dispatch:`,
    verdictTextMap[params.verdict],
    `Botanical Emblem Chosen: ${flowerLabel}`,
  ];

  if (params.selectedOfferingTitles.length > 0) {
    lines.push('');
    lines.push('Reparation Clauses Claimed:');
    for (const item of params.selectedOfferingTitles) {
      lines.push(`• ${item}`);
    }
  }

  if (params.personalNote.trim().length > 0) {
    lines.push('');
    lines.push(`Marginal Note: “${params.personalNote.trim()}”`);
  }

  if (params.shareUrl) {
    lines.push('');
    lines.push(`Sealed Keepsake Link: ${params.shareUrl}`);
  }

  return lines.join('\n');
}

/**
 * Encodes her sealed choices into URL query parameters so that if she shares the link
 * or opens it, Varchasva sees her exact selections immediately.
 */
export function buildShareableVerdictUrl(
  baseUrl: string,
  params: {
    verdict: ForgivenessVerdict;
    chosenFlower: PeaceFlowerChoice;
    selectedOfferingIds: string[];
    customOfferings: string[];
    personalNote: string;
  }
): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('sealed', '1');
    url.searchParams.set('v', params.verdict);
    url.searchParams.set('f', params.chosenFlower);
    if (params.selectedOfferingIds.length > 0) {
      url.searchParams.set('c', params.selectedOfferingIds.join(','));
    }
    if (params.customOfferings.length > 0) {
      url.searchParams.set('custom', params.customOfferings.join('|'));
    }
    if (params.personalNote.trim()) {
      url.searchParams.set('note', params.personalNote.trim());
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}
