/**
 * Utilities for cleaning and normalizing speech-to-text transcripts.
 */

export const normalizeSpeechTranscript = (text) => {
  if (!text) return '';

  const trimmed = text.trim().toLowerCase();

  const isRepetitiveOne = /^(1+|one(\s+one)*|(1(\s+1)*))$/.test(trimmed);
  if (isRepetitiveOne) {
    return 'one';
  }

  const singleDigitsMap = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    0: 'zero',
  };

  if (singleDigitsMap[trimmed]) {
    return singleDigitsMap[trimmed];
  }

  return text.trim();
};

export const runSpeechTests = () => {
  const tests = [
    { in: '111', out: 'one' },
    { in: '1 1 1', out: 'one' },
    { in: 'one one one', out: 'one' },
    { in: '1', out: 'one' },
    { in: '2', out: 'two' },
    { in: 'I have 2 brothers', out: 'I have 2 brothers' },
    { in: 'room 101', out: 'room 101' },
    { in: 'my number is 311', out: 'my number is 311' },
    { in: 'one two three', out: 'one two three' },
    { in: 'call mommy please', out: 'call mommy please' },
  ];

  console.log('--- Running Speech Normalization Tests ---');
  tests.forEach((test) => {
    const result = normalizeSpeechTranscript(test.in);
    const pass = result.toLowerCase() === test.out.toLowerCase();
    console.log(`${pass ? 'PASS' : 'FAIL'} [${test.in}] -> [${result}] (Expected: [${test.out}])`);
  });
  console.log('-------------------------------------------');
};
