import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_APOLOGY_CONFIG,
  DEFAULT_PEACE_OFFERINGS,
  PERSPECTIVE_ITEMS,
  validateCustomOffering,
  calculatePeaceProgress,
  buildTruceReplyMessage,
  buildShareableVerdictUrl,
  tokenizeInlineIcons,
  computeDodgeOffset,
} from './apologyLogic';

test('default config has fresh first paragraph and weaves personal preferences naturally', () => {
  assert.equal(DEFAULT_APOLOGY_CONFIG.recipientName, 'Rishika');
  assert.ok(
    DEFAULT_APOLOGY_CONFIG.jokeReflection.startsWith(
      'I have been replaying that moment in my head ever since it happened.'
    )
  );
  assert.ok(DEFAULT_APOLOGY_CONFIG.philosophicalTruth.toLowerCase().includes('never a choice'));
  assert.ok(DEFAULT_APOLOGY_CONFIG.closingPromise.toLowerCase().includes('milk chocolate'));
  assert.equal(PERSPECTIVE_ITEMS.length, 3);
  assert.equal(DEFAULT_PEACE_OFFERINGS.length, 5);
});

test('tokenizeInlineIcons splits sunflower and white heart emojis into structured tokens', () => {
  const tokens = tokenizeInlineIcons('for rishika 🌻 and peace 🤍');
  assert.equal(tokens.length, 4);
  assert.deepEqual(tokens[1], { type: 'sunflower' });
  assert.deepEqual(tokens[3], { type: 'heart' });
});

test('computeDodgeOffset shrinks button and hides it at 5 attempts', () => {
  const initial = computeDodgeOffset(0);
  assert.equal(initial.hidden, false);
  assert.equal(initial.scale, 1);

  const mid = computeDodgeOffset(2);
  assert.equal(mid.hidden, false);
  assert.ok(mid.scale < 1);

  const vanished = computeDodgeOffset(5);
  assert.equal(vanished.hidden, true);
});

test('validateCustomOffering enforces non-empty minimum length', () => {
  assert.equal(validateCustomOffering('').valid, false);
  assert.equal(validateCustomOffering('ab').valid, false);
  assert.equal(validateCustomOffering('Extra milk chocolate').valid, true);
});

test('calculatePeaceProgress increments smoothly and reaches 100 when sealed', () => {
  const initial = calculatePeaceProgress({
    selectedOfferings: [],
    verdict: null,
    truceSealed: false,
  });
  assert.equal(initial.percentage, 40);
  assert.equal(initial.stageLabel, 'Reading the Epistle');

  const mid = calculatePeaceProgress({
    selectedOfferings: ['finish-conversation', 'milk-chocolate-inventory'],
    verdict: 'probation',
    truceSealed: false,
  });
  assert.equal(mid.percentage, 75);
  assert.equal(mid.stageLabel, 'Ready to Seal & Send');

  const sealed = calculatePeaceProgress({
    selectedOfferings: ['finish-conversation'],
    verdict: 'forgiven',
    truceSealed: true,
  });
  assert.equal(sealed.percentage, 100);
  assert.equal(sealed.stageLabel, 'Dispatched to Varchasva');
});

test('buildTruceReplyMessage and buildShareableVerdictUrl format verdict and URL parameters cleanly', () => {
  const shareUrl = buildShareableVerdictUrl('https://example.com/', {
    verdict: 'forgiven',
    chosenFlower: 'lilies',
    selectedOfferingIds: ['finish-conversation'],
    customOfferings: ['Bring brownie'],
    personalNote: 'Dont vanish next time',
  });
  assert.ok(shareUrl.includes('sealed=1'));
  assert.ok(shareUrl.includes('v=forgiven'));
  assert.ok(shareUrl.includes('f=lilies'));

  const reply = buildTruceReplyMessage({
    recipientName: 'Rishika',
    verdict: 'forgiven',
    selectedOfferingTitles: ['The Unfinished Laugh Replay'],
    personalNote: 'Dont vanish next time',
    chosenFlower: 'lilies',
    shareUrl,
  });

  assert.ok(reply.includes('From Rishika'));
  assert.ok(reply.includes('White Lilies'));
  assert.ok(reply.includes('• The Unfinished Laugh Replay'));
  assert.ok(reply.includes('Sealed Keepsake Link:'));
});
