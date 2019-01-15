// Quick little test script, to compare random number generators.
import randomSeedGenerator from 'random-seed';

let endSeed, endMath;
const numOfTests = 100000;

const randomSeedBase = randomSeedGenerator.create();
const randomSeed = () => randomSeedBase.floatBetween(0, 1);

const startSeed = performance.now();
randomSeedBase.initState();
for (let i = 0; i < numOfTests; i++) {
  randomSeed();
}
endSeed = performance.now() - startSeed;

const startMath = performance.now();
for (let i = 0; i < numOfTests; i++) {
  Math.random();
}
endMath = performance.now() - startMath;

console.log(endSeed, endMath);
