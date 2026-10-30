export interface ApologyConfig {
  recipientName: string;
  nickname: string;
  senderName: string;
  subtitleTag: string;
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
  stepTag: string;
  title: string;
  subtitle: string;
  body: string;
  marginNote: string;
  motif: 'sunflower' | 'lily' | 'watermelon';
}

export interface PeaceOffering {
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  category: string;
  iconKind: 'watermelon' | 'chocolate' | 'sunflower' | 'cooking' | 'lily';
}

export type ForgivenessVerdict = 'forgiven' | 'probation' | 'cooling';
export type PeaceFlowerChoice = 'sunflowers' | 'lilies' | 'watermelon-bouquet';

export type ScreenStep = 1 | 2 | 3 | 4 | 5;

export const KEEPSAKE_META = {
  herName: 'Rishika',
  nickname: 'Mommy Biceps',
  chatUrl: 'https://ig.me/m/trytofindvxrchsva__',
  ntfyTopic: 'varchasva_rishika_truce_fresh_01',
};

export const DEFAULT_APOLOGY_CONFIG: ApologyConfig = {
  recipientName: 'Rishika',
  nickname: 'Mommy Biceps',
  senderName: 'Yours, always — Varchasva',
  subtitleTag: 'A Five-Page Peace Keepsake · For Rishika (a.k.a. Mommy Biceps)',
  headline: 'I’m Sorry for Leaving in the Middle of Our Laugh.',
  subheadline:
    'Because the joke itself was harmless and warm—and getting pulled away halfway through was never a choice I made.',
  epigraphQuote:
    '“You already said yes to me once—and there is no version of me that ever chooses to walk away when you are laughing.”',
  epigraphAuthor: 'Kept for Rishika',
  greetingLine: 'Dear Rishika (my favorite person, Mommy Biceps),',
  jokeReflection: `I have been replaying that moment in my head ever since it happened. We were just messing around and joking the way we always do, and I know the joke itself didn't bother you at all. What ruined the moment—and what you have every right to be mad at me for—is that I vanished right in the middle of it. Disappearing halfway through a laugh makes it feel like I carelessly brushed you off, and I hate that I left you sitting there with an unfinished moment.`,
  philosophicalTruth: `There is a huge difference between being pulled away by life and choosing to leave. I need you to know, from the bottom of my heart, that leaving in the middle of talking to you is never a choice. You already said yes to me when I asked you in our last project, and whenever the choice is mine, there is nowhere in the world I would rather be than right there listening to you laugh.`,
  listeningPledge: `I also get why you didn't want to hear it when I kept trying to explain myself right after. When someone vanishes mid-joke, fast explanations just sound like excuses trying to win an argument instead of caring about how annoying it felt on your side. So I stopped trying to talk over your frustration and made this little book of pages for you instead—with sunflowers, white lilies, milk chocolate, and fresh watermelon waiting at the end.`,
  closingPromise: `You deserve conversations that never cut off without warning, a bowl of cold sweet watermelon, your favorite milk chocolate, and a home-cooked meal where Mommy Biceps gets full rights to roast my cooking.`,
  postscript:
    'P.S. Take your time flipping through these pages—I’ll be right here waiting until you are ready to laugh with me again.',
};

export const PERSPECTIVE_ITEMS: PerspectiveItem[] = [
  {
    id: 'what-silence-said',
    romanIndex: 'I',
    stepTag: 'Truth 01 · The Interrupted Laugh',
    title: 'The Joke Was Harmless; Vanishing Was Not',
    subtitle: 'Why you have every right to be mad at me',
    body: 'It wasn’t the teasing or the joke that bothered you at all—we were having a good moment. What felt unfair was the sudden silence right in the middle of it, leaving a shared laugh hanging in mid-air.',
    marginNote: '“A half-finished laugh feels louder than an empty room.”',
    motif: 'sunflower',
  },
  {
    id: 'circumstance-vs-choice',
    romanIndex: 'II',
    stepTag: 'Truth 02 · Never a Choice',
    title: 'Pulled Away by Life, Never by Choice',
    subtitle: 'If it were up to me, I would never leave mid-sentence',
    body: 'Having to step away in that exact second was pure circumstance, never a choice I made. Between anything else in the world and staying in a conversation with you, my heart picks you every single time.',
    marginNote: '“Circumstance interrupted the moment; choice brings me right back to you.”',
    motif: 'lily',
  },
  {
    id: 'why-explanations-failed',
    romanIndex: 'III',
    stepTag: 'Truth 03 · No More Rushed Excuses',
    title: 'Why I Stopped Trying to Over-Explain',
    subtitle: 'You deserved patience, not a debate',
    body: 'When I kept trying to explain why I left while you were rightfully annoyed, I was asking you to hear my side before respecting how frustrating it felt on yours. No more rushed texts—just patience and peace offerings.',
    marginNote: '“Excuses try to rush the past; watermelon and patience fix the present.”',
    motif: 'watermelon',
  },
];

export const DEFAULT_PEACE_OFFERINGS: PeaceOffering[] = [
  {
    id: 'fresh-watermelon',
    indexLabel: '01',
    title: 'Fresh, Sweet Chilled Watermelon',
    description:
      'Cut up nicely and chilled just the way you like it—because no proper peace treaty with you is complete without watermelon.',
    category: 'Top Priority · Her Favorite Fruit',
    iconKind: 'watermelon',
  },
  {
    id: 'milk-chocolate-inventory',
    indexLabel: '02',
    title: 'Full Milk Chocolate Restock',
    description:
      'Your favorite milk chocolate delivered with zero excuses—because sweetening the mood after an interrupted joke is mandatory.',
    category: 'Sweet Truce · Milk Cacao',
    iconKind: 'chocolate',
  },
  {
    id: 'sunflowers-and-lilies',
    indexLabel: '03',
    title: 'Golden Sunflowers & White Lilies',
    description:
      'Bright sunflowers and quiet white lilies for my favorite girl—to make up for the silence I left behind.',
    category: 'Botanical Gift · Kept for You',
    iconKind: 'sunflower',
  },
  {
    id: 'cook-for-mommy-biceps',
    indexLabel: '04',
    title: 'Home-Cooked Meal for Mommy Biceps',
    description:
      'I cook a proper meal for you to make it up to you—and I officially waive my right to act offended even if you rate it a 2/10 just to humble me.',
    category: 'Chef Duty · Zero Offended Rights',
    iconKind: 'cooking',
  },
  {
    id: 'finish-conversation',
    indexLabel: '05',
    title: 'Finishing Our Interrupted Joke Properly',
    description:
      'We pick up our laugh from the exact second it got cut off—plus an instant 3-second heads-up text if life ever interrupts me again.',
    category: 'Promise · No More Vanishing',
    iconKind: 'lily',
  },
];

/**
 * Deterministic dodging offset for the playful "Stay Mad" button,
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
    return { valid: false, error: 'Please write a short demand first before adding it.' };
  }
  if (trimmed.length < 3) {
    return { valid: false, error: 'Please write at least 3 characters.' };
  }
  return { valid: true, error: null };
}

export function calculatePeaceProgress(params: {
  currentStep?: ScreenStep;
  selectedOfferings: string[];
  verdict: ForgivenessVerdict | null;
  truceSealed: boolean;
}): {
  percentage: number;
  stageLabel: string;
  offeringCount: number;
} {
  const offeringCount = params.selectedOfferings.length;
  const step = params.currentStep ?? 1;

  if (params.truceSealed) {
    return {
      percentage: 100,
      stageLabel: 'Sent to Varchasva ✓',
      offeringCount,
    };
  }

  const stepScores: Record<ScreenStep, number> = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 90,
  };

  const base = stepScores[step] || 20;
  const percentage = Math.min(95, base + (params.verdict ? 5 : 0));

  const stageLabels: Record<ScreenStep, string> = {
    1: 'Page 1 of 5 · Opening Envelope',
    2: 'Page 2 of 5 · Reading the Letter',
    3: 'Page 3 of 5 · Three Honest Truths',
    4: 'Page 4 of 5 · Picking Peace Offerings',
    5: 'Page 5 of 5 · Final Verdict',
  };

  return {
    percentage,
    stageLabel: stageLabels[step],
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
      'I read your letter. Truce accepted on probation—bring the watermelon and milk chocolate first, and no disappearing mid-joke again.',
    cooling:
      'I read your letter and I know leaving wasn’t a choice. Give me a little quiet time first, and we’ll talk soon.',
  };

  const flowerLabel =
    params.chosenFlower === 'lilies'
      ? 'White Lilies 🤍'
      : params.chosenFlower === 'watermelon-bouquet'
      ? 'Sunflowers, Lilies & Extra Watermelon 🍉🌻'
      : 'Golden Sunflowers 🌻';

  const lines: string[] = [
    `From ${params.recipientName} (Mommy Biceps) — Peace Verdict:`,
    verdictTextMap[params.verdict],
    `Peace Combo Picked: ${flowerLabel}`,
  ];

  if (params.selectedOfferingTitles.length > 0) {
    lines.push('');
    lines.push('Peace Basket Items Claimed:');
    for (const item of params.selectedOfferingTitles) {
      lines.push(`• ${item}`);
    }
  }

  if (params.personalNote.trim().length > 0) {
    lines.push('');
    lines.push(`Her Note: “${params.personalNote.trim()}”`);
  }

  if (params.shareUrl) {
    lines.push('');
    lines.push(`Sealed Link: ${params.shareUrl}`);
  }

  return lines.join('\n');
}

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
