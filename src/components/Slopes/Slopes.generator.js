import createSeededRandomGenerator from 'random-seed';
import createPerlinGenerator from '../../vendor/noise';

import { mixPoints } from '../../helpers/line.helpers';
import { normalize, range, flatten, mix, clamp } from '../../utils';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
  getDampingAmountForSlopes,
  plotAsPolarCoordinate,
  getPerlinValueWithOctaves,
  takeStaticIntoAccount,
  getNumOfUsableRows,
  joinLineSegments,
  removeTroublesomeLines,
} from './Slopes.helpers';

// This flag allows us to log out how long each cycle takes, to compare perf
// of multiple approaches.
const DEBUG_PERF = false;
const RECORDED_TIMES = [];

const randomSeed = createSeededRandomGenerator.create();

let cachedPerlinSeed;
let cachedPerlinRatio = null;
let perlinGenerator;

const updateSeed = seed => {
  cachedPerlinSeed = seed;
  let { perlin2 } = createPerlinGenerator(seed);
  perlinGenerator = perlin2;
};

// This API is a bit wonky / backwards, but it works.
// Our noise API will continue to generate new random values until you call
// `initState`, and then it "resets" to the beginning of the sequence of
// pseudo-random values.
//
// Most of the time, when a parameter like `perspective` changes, I want to
// preserve the previous sequence of random values, so that the lines don't
// regenerate.
//
// Critically, each `sketch` call generates the same number of data points, and
// so by initializing to the beginning of the sequence at the start of every
// tick, I ensure the same values will be used.
//
// When the perlin seed changes, or when mutating the "perlinRatio", I want to
// generate new values, so I won't call this method.
const reuseRandomValues = () => {
  randomSeed.initState();
};

/**
 *
 *
 *
 *
 * MAIN GENERATOR METHOD
 *
 *
 *
 *
 */
const generator = ({
  width,
  height,
  distanceBetweenRows,
  perlinRatio,
  staticRatio,
  rowHeight,
  polarRatio,
  polarTanRatio,
  polarTanMultiplier,
  numOfRows,
  numOfOctaves = 1,
  omegaRatio,
  peaksCurveStrength,
  perlinRangePerRow,
  omegaRadiusSubtractAmount,
  amplitudeRatio,
  polarHoleSize,
  dotRatio,
  enableOcclusion,
  peaksCurve,
  selfSimilarity,
  seed,
  enableMirrored,
}) => {
  // For aesthetic reasons, I don't want the lines to start at the very bottom
  // of the page, in cartesian mode.
  // The amount being offset is currently set to an arbitrary amount, maybe it
  // should become a param?
  const bottomOffset = height / 12;

  // I want `samplesPerRow` to be as high as possible, so that curves aren't
  // choppy and gross. But, the higher it is, the more expensive / slow it is
  // to compute.
  // In standard "cartesian" mode, using width * 0.5 is fine (1 point every 2
  // pixels). In Polar mode, though, a single line does a big loop around the
  // canvas, so we need more than 1 point per width-pixel to represent it.
  const samplesPerRowWidthMultiplier = mix(1, 0.5, polarRatio);

  // When our `dotAmount` value gets really low, we actually want to decrease
  // the samples per row. In combination with tweaking the lineWIdth, this will
  // give us bigger dots, spaced further apart.
  const dotAmountMultiplier = clamp(normalize(dotRatio, 0, 1, 1, 0.2), 0, 1);

  const samplesPerRow = Math.ceil(
    width * samplesPerRowWidthMultiplier * dotAmountMultiplier
  );

  const distanceBetweenSamples = width / samplesPerRow;

  const sampleData = {
    width,
    height,
    samplesPerRow,
    distanceBetweenSamples,
    numOfRows,
    rowHeight,
    perlinRangePerRow,
    staticRatio,
    perlinRatio,
    polarRatio,
    polarTanRatio,
    polarTanMultiplier,
    omegaRatio,
    omegaRadiusSubtractAmount,
    peaksCurve,
    peaksCurveStrength,
    amplitudeRatio,
    selfSimilarity,
    numOfOctaves,
  };
  const hasSeedChanged = seed !== cachedPerlinSeed;

  // Keep the same random values around unless we're
  if (!hasSeedChanged && perlinRatio === cachedPerlinRatio) {
    reuseRandomValues();
  } else {
    // We need to retain a memory of the previous cachedPerlinRatio, since we
    // decide whether or not to reuse the noise values based on if it's changed.
    cachedPerlinRatio = perlinRatio;
  }

  if (hasSeedChanged) {
    updateSeed(seed);
  }

  let start;
  if (DEBUG_PERF) {
    start = performance.now();
  }

  let lines = [];

  // Precompute all row offsets
  const rowOffsets = range(numOfRows).map(rowIndex => {
    return getRowOffset(
      rowIndex,
      width,
      height,
      bottomOffset,
      distanceBetweenRows,
      polarRatio,
      polarHoleSize
    );
  });

  const numOfUsableRows = getNumOfUsableRows(
    width,
    height,
    numOfRows,
    polarRatio,
    polarTanRatio,
    omegaRatio,
    rowOffsets
  );

  const splitPoint = Math.round(numOfRows / 2);

  // Generate some data!
  range(numOfUsableRows).forEach(function iterateRows(rowIndex) {
    let row = [];

    if (enableMirrored && rowIndex < splitPoint) {
      return;
    }

    range(samplesPerRow).forEach(function iterateSamples(sampleIndex) {
      if (sampleIndex === 0) {
        return;
      }

      const rowOffset = rowOffsets[rowIndex];

      // NOTE FOR FUTURE ME:
      // THe issue is that the occlusion happens after `getSampleCoordinate`,
      // but by trying to reuse a previous value, it grabs the non-occluded one?
      // That doesn't really make sense... but hopefully moving to a two-stage
      // system, where first I calculate all the raw line values, and THEN I
      // calculate the occlusions, will fix it.
      //
      // The next, totally different problem is around not passing a huge data
      // structure to be drawn on canvas. See notes in the benchmark.md

      const usePreviousCalculatedPoint = perlinRatio === 1 && sampleIndex >= 2;

      let samplePoint = getSampleCoordinates(
        rowIndex,
        rowOffset,
        sampleIndex,
        sampleData
      );

      const previousSamplePoint = usePreviousCalculatedPoint
        ? row[row.length - 1][1]
        : getSampleCoordinates(
            rowIndex,
            rowOffset,
            sampleIndex - 1,
            sampleData
          );

      let line = [previousSamplePoint, samplePoint];

      row.push(line);
    });

    lines.push(row);
  });

  if (enableOcclusion) {
    const newLines = lines.map((row, rowIndex) => {
      const previousRowIndices = getPossiblyOccludingRowIndices({
        rowIndex,
        rowHeight,
        amplitudeRatio,
        distanceBetweenRows,
      });

      return row.map((line, sampleIndex) => {
        const previousLines = previousRowIndices
          .map(function mapPreviousLines(previousRowIndex) {
            return lines[previousRowIndex]
              ? lines[previousRowIndex][sampleIndex]
              : null;
          })
          .filter(line => !!line);

        return occludeLineIfNecessary(
          line,
          previousLines,
          width,
          height,
          polarRatio
        );
      });
    });

    lines = newLines;
  }

  if (dotRatio !== 0) {
    // `dotRatio` is linear between 0 and 1, but most of the range isn't that
    // interesting.
    const shiftedDotRatio = clamp(normalize(dotRatio, 0, 0.5, 0.5, 0), 0.01, 1);

    lines.forEach(row => {
      row.forEach(line => {
        if (!line) {
          return;
        }
        const [p1, p2] = line;

        const deltaX = p2[0] - p1[0];
        const deltaY = p2[1] - p1[1];

        line[1] = [
          p1[0] + deltaX * shiftedDotRatio,
          p1[1] + deltaY * shiftedDotRatio,
        ];
      });
    });
  }

  if (enableMirrored) {
    lines.forEach((row, rowIndex) => {
      const mirroredRow = [];

      row.forEach((line, lineIndex) => {
        if (!line) {
          return;
        }

        // Ensure no point in this line is above the halfway point.
        const halfwayPoint = height / 2;
        if (line[0][1] > halfwayPoint) {
          line[0][1] = halfwayPoint;
        }

        if (line[1][1] > halfwayPoint) {
          line[1][1] = halfwayPoint;
        }

        const flippedLine = line.map(point => {
          return [point[0], height - point[1]];
        });

        mirroredRow.push(flippedLine);
      });

      lines.push(mirroredRow);
    });
  }

  lines = flatten(lines).filter(line => !!line);

  // If our lines are mostly-contiguous (perlinRatio of 1), we should create
  // polylines instead of having many many 2-point line segments.
  // This saves a ton of time when it comes to actually drawing the lines:
  // With standard settings, it goes from 30-40ms drawing time to 5-6ms.
  //
  // The data-munging cost of the `joinLineSegments` call is <1ms,
  // so this is a huge win :D
  const isMostlyContiguous = perlinRatio === 1 && dotRatio === 1;
  if (isMostlyContiguous) {
    lines = joinLineSegments(lines);
  }

  // `polarTanRatio` can create lines with values far outside the canvas.
  // This would normally be fine, except then their rendering is really
  // unpredictable - the lines change depending on the window size, for example.
  // We should remove any "troublesome" line, to make rendering consistent.
  const requiresTrimming = polarTanRatio > 0;

  if (requiresTrimming) {
    const s = performance.now();
    lines = removeTroublesomeLines(width, height, lines);
    console.log(performance.now() - s);
  }

  if (DEBUG_PERF) {
    if (RECORDED_TIMES.length > 40) {
      RECORDED_TIMES.shift();
    }
    RECORDED_TIMES.push(performance.now() - start);
    const sum = values => values.reduce((sum, value) => sum + value, 0);
    const mean = values => sum(values) / values.length;

    console.info(mean(RECORDED_TIMES));
  }

  return lines;
};

/**
 *
 * UTILITY / HELPER METHODS
 *
 */
const getRowOffset = (
  rowIndex,
  width,
  height,
  bottomOffset,
  distanceBetweenRows,
  polarRatio,
  polarHoleSize
) => {
  const cartesianValue =
    height - bottomOffset * 2 - rowIndex * distanceBetweenRows;

  const polarValue = polarHoleSize + rowIndex * distanceBetweenRows;

  return mix(polarValue, cartesianValue, polarRatio);
};

const getSampleCoordinates = (
  rowIndex,
  rowOffset,
  sampleIndex,
  {
    width,
    height,
    samplesPerRow,
    distanceBetweenSamples,
    numOfRows,
    rowHeight,
    amplitudeRatio,
    perlinRangePerRow,
    staticRatio,
    perlinRatio,
    polarRatio,
    polarTanRatio,
    polarTanMultiplier,
    omegaRatio,
    omegaRadiusSubtractAmount,
    enableOcclusion,
    peaksCurve,
    peaksCurveStrength,
    selfSimilarity,
    numOfOctaves,
  }
) => {
  // Our standard value is this curvy, swoopy slope thing, à la Joy Division.
  // We use perlin noise for this: the sampleIndex forms the x axis value,
  // while the rowIndex forms the y axis value.
  // In some cases, the y-axis values will be close enough together that it
  // looks cohesive, like a 2D map. Other times, the values are far enough
  // apart that each row appears totally independent. This is controlled by
  // `selfSimilarity`
  const perlinIndex =
    normalize(sampleIndex, 0, samplesPerRow, 0, perlinRangePerRow) +
    perlinRangePerRow;

  const perlinValue = getPerlinValueWithOctaves(
    perlinGenerator,
    perlinIndex,
    (rowIndex / numOfRows) * selfSimilarity,
    amplitudeRatio,
    numOfOctaves
  );

  // Another possible world is where each value is randomized. This creates a
  // busy "noise" effect.
  // Use our amplitude to control how "loud" the noise is. We need to di
  const rndBase = randomSeed.floatBetween(-0.25, 0.25) * amplitudeRatio;

  const rnd = takeStaticIntoAccount(
    staticRatio,
    sampleIndex,
    rowIndex,
    rndBase
  );

  // We mix between two possible values: our normal slopy value, and our random
  // noise value.
  let mixedValue = perlinValue * perlinRatio + rnd * (1 - perlinRatio);

  // Unless explicitly disabled, we want the peak strength to follow a bezier
  // curve. For example, the classic Joy Division cover would have a straight
  // line down the middle where the peaks are strongest.
  const verticalRatio = 1 - rowOffset / height;
  const slopeDampingAmount = getDampingAmountForSlopes({
    sampleIndex,
    samplesPerRow,
    verticalRatio,
    curve: peaksCurve,
    curveStrength: peaksCurveStrength,
  });

  // `value` is a number between -1 and 1, representing how far away from
  // baseline this point is.
  // Our next step is to convert that to cartesian coordinates, and take polar
  // ratio into account.
  let value = mixedValue * slopeDampingAmount;

  const cartesianY = normalize(value, -1, 1, -rowHeight, rowHeight) + rowOffset;

  const tangentY =
    Math.tan((sampleIndex / samplesPerRow) * Math.PI * 2 * polarTanRatio * 2) *
    rowOffset;

  const cartesianPoint = [
    sampleIndex * distanceBetweenSamples,

    mix(tangentY, cartesianY, polarTanRatio),
  ];

  if (polarRatio === 0) {
    return cartesianPoint;
  }

  const polarPoint = plotAsPolarCoordinate({
    point: cartesianPoint,
    width,
    height,
    sampleIndex,
    samplesPerRow,
    omegaRatio,
    omegaRadiusSubtractAmount,
    polarTanRatio,
    polarTanMultiplier,
  });

  return mixPoints(polarPoint, cartesianPoint, polarRatio);
};

export default generator;
