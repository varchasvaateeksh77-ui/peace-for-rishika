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
  computeDodgeOffset,
} from './apologyLogic';

test('default config includes Rishika, Mommy Biceps, watermelon, milk chocolate, and simple poetic apology', () => {
  assert.equal(DEFAULT_APOLOGY_CONFIG.recipientName, 'Rishika');
  assert.equal(DEFAULT_APOLOGY_CONFIG.nickname, 'Mommy Biceps');
  assert.ok(
    DEFAULT_APOLOGY_CONFIG.jokeReflection.startsWith(
      'I have been replaying that moment in my head ever since it happened.'
    )
  );
  assert.ok(DEFAULT_APOLOGY_CONFIG.philosophicalTruth.toLowerCase().includes('never a choice'));
  assert.ok(DEFAULT_APOLOGY_CONFIG.listeningPledge.toLowerCase().includes('watermelon'));
  assert.ok(DEFAULT_APOLOGY_CONFIG.closingPromise.includes('Mommy Biceps'));
  assert.equal(PERSPECTIVE_ITEMS.length, 3);
  assert.equal(DEFAULT_PEACE_OFFERINGS.length, 5);
  assert.equal(DEFAULT_PEACE_OFFERINGS[0].id, 'fresh-watermelon');
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
  assert.equal(validateCustomOffering('Extra watermelon slices').valid, true);
});

test('calculatePeaceProgress tracks the 5 screens and reaches 100 when sealed', () => {
  const step1 = calculatePeaceProgress({
    currentStep: 1,
    selectedOfferings: [],
    verdict: null,
    truceSealed: false,
  });
  assert.equal(step1.percentage, 20);
  assert.ok(step1.stageLabel.includes('Page 1 of 5'));

  const step4 = calculatePeaceProgress({
    currentStep: 4,
    selectedOfferings: ['fresh-watermelon', 'milk-chocolate-inventory'],
    verdict: null,
    truceSealed: false,
  });
  assert.equal(step4.percentage, 80);
  assert.ok(step4.stageLabel.includes('Page 4 of 5'));

  const sealed = calculatePeaceProgress({
    currentStep: 5,
    selectedOfferings: ['fresh-watermelon'],
    verdict: 'forgiven',
    truceSealed: true,
  });
  assert.equal(sealed.percentage, 100);
  assert.equal(sealed.stageLabel, 'Sent to Varchasva ✓');
});

test('buildTruceReplyMessage formats verdict, Mommy Biceps header, watermelon combo, and URL cleanly', () => {
  const shareUrl = buildShareableVerdictUrl('https://example.com/', {
    verdict: 'forgiven',
    chosenFlower: 'watermelon-bouquet',
    selectedOfferingIds: ['fresh-watermelon'],
    customOfferings: [],
    personalNote: 'Bring watermelon tonight',
  });
  assert.ok(shareUrl.includes('sealed=1'));
  assert.ok(shareUrl.includes('f=watermelon-bouquet'));

  const reply = buildTruceReplyMessage({
    recipientName: 'Rishika',
    verdict: 'forgiven',
    selectedOfferingTitles: ['Fresh, Sweet Chilled Watermelon'],
    personalNote: 'Bring watermelon tonight',
    chosenFlower: 'watermelon-bouquet',
    shareUrl,
  });

  assert.ok(reply.includes('From Rishika (Mommy Biceps)'));
  assert.ok(reply.includes('Sunflowers, Lilies & Extra Watermelon'));
  assert.ok(reply.includes('• Fresh, Sweet Chilled Watermelon'));
});
