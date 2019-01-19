// Quick little test script, to compare random number generators.
const randomSeedGenerator = require('random-seed');

const runTests = (label, fn, num) => {
  const start = Date.now();
  for (let i = 0; i < num; i++) {
    fn(i);
  }

  console.info(`${label}: `, Date.now() - start);
};

const numOfTests = 1000000000;
runTests('Math.random', Math.random, numOfTests);

const randomSeedBase = randomSeedGenerator.create();
const randomSeed = () => randomSeedBase.floatBetween(0, 1);
runTests('randomSeed', randomSeed, numOfTests);
