import { checkIntersection } from 'line-intersect';

import {
  getSlopeAndInterceptForLine,
  getValuesForBezierCurve,
} from '../../helpers/line.helpers';
import { normalize, convertPolarToCartesian, mix } from '../../utils';

export const occludeLineIfNecessary = (line, previousLines) => {
  if (previousLines.length === 0) {
    return line;
  }

  const { slope } = getSlopeAndInterceptForLine(line);

  // First case: This line segment is totally below at least 1 previous line
  // In this case, we want to return `null`. We don't want to render anything
  // for this line.
  const isTotallyBelow = previousLines.some(previousLine => {
    return previousLine[0][1] < line[0][1] && previousLine[1][1] < line[1][1];
  });

  if (isTotallyBelow) {
    return null;
  }

  // Next case: the line is partially occluded.
  // In the case that our line goes from not-occluded to occluded, we expect to
  // see a line with a slope above our current line's
  // if the slope is negative, we care about the _latest_ intersection:
  /*

  \    /
   \ /                < negative slope in front of our line
    \                   If there are multiple, the larger `x` intersection
     \                  value wins


        /
  ----/               < positive slope in front of our line
    /                   If there are multiple, the smaller `x` intersection
  /                     value wins.

  */

  let becomeOccludedAt = null;
  let breakFreeAt = null;
  previousLines.forEach((previousLine, i) => {
    const { type, point } = checkIntersection(
      line[0][0],
      line[0][1],
      line[1][0],
      line[1][1],
      previousLine[0][0],
      previousLine[0][1],
      previousLine[1][0],
      previousLine[1][1]
    );

    if (type === 'intersecting') {
      const { slope: previousSlope } = getSlopeAndInterceptForLine(
        previousLine
      );

      // If our current slope is greater than the previous slope, it means
      // that our line is currently occluded and breaking free.
      // If the current slope is < the previous, it means our line is currently
      // free, but is about to dip behind the previous line.
      const isBecomingOccludedByThisLine = slope > previousSlope;
      const isBreakingFreeFromThisLine = !isBecomingOccludedByThisLine;

      if (isBecomingOccludedByThisLine) {
        if (!becomeOccludedAt || becomeOccludedAt[0] > point.x) {
          becomeOccludedAt = [point.x, point.y];
        }
      } else if (isBreakingFreeFromThisLine) {
        if (!breakFreeAt || breakFreeAt[0] < point.x) {
          breakFreeAt = [point.x, point.y];
        }
      }
    }
  });

  let start = line[0];
  let end = line[1];

  // In rare cases, the line might be occluded BEFORE it breaks free.
  // In this case, we don't want to render it at all.
  /*

  \        /
    \    /
      \/
  ---X--X--------   < Our line, which is occluded at the first X, and breaks
   /      \           free at the second X, is hidden because the occlusion
 /          \         happens first.

 */
  if (becomeOccludedAt && breakFreeAt && becomeOccludedAt[0] < breakFreeAt[0]) {
    return null;
  }

  if (becomeOccludedAt) {
    end = becomeOccludedAt;
  }

  if (breakFreeAt) {
    start = breakFreeAt;
  }

  return [start, end];
};

export const getPossiblyOccludingRowIndices = ({
  rowIndex,
  rowHeight,
  distanceBetweenRows,
}) => {
  // The largest possible peak will be `rowHeight`px tall.
  // If our rowHeight is 100px, and our distanceBetweenRows is 20, we know that
  // we need to check up to 5 previous rows, since a max peak will be 100px
  // tall, and 100px below.
  const maxNumOfOccludingRows = Math.ceil(rowHeight / distanceBetweenRows);

  const lowestRowIndex = Math.max(0, rowIndex - maxNumOfOccludingRows);

  const possiblyOccludingRowIndices = [];
  let cursor = rowIndex - 1;

  while (cursor >= lowestRowIndex) {
    possiblyOccludingRowIndices.push(cursor);
    cursor--;
  }

  return possiblyOccludingRowIndices;
};

export const getDampingAmountForSlopes = ({ sampleIndex, samplesPerRow }) => {
  const ratio = sampleIndex / samplesPerRow;
  const isInFirstHalf = ratio < 0.5;

  let bezierArgs = {};
  if (isInFirstHalf) {
    bezierArgs = {
      startPoint: [0, 0],
      controlPoint1: [1, 0],
      controlPoint2: [1, 1],
      endPoint: [1, 1],
      t: ratio * 2,
    };
  } else {
    bezierArgs = {
      startPoint: [0, 1],
      controlPoint1: [0, 1],
      controlPoint2: [1, 0],
      endPoint: [1, 0],
      t: normalize(ratio, 0.5, 1),
    };
  }

  const [, heightDampingAmount] = getValuesForBezierCurve(bezierArgs);

  // By default, our bezier curve damping has a relatively modest effect.
  // If we want to truly isolate the peaks to the center of the page, we need
  // to raise that effect exponentially.
  // 4 seems to do a good job imitating the harsh curve I was using before.
  const DAMPING_STRENGTH = 4;

  return heightDampingAmount ** DAMPING_STRENGTH;
};

export const getPolarValues = ({
  line,
  width,
  height,
  sampleIndex,
  samplesPerRow,
  rowHeight,
  polarRatio,
}) => {
  // Get a value for theta going from 0 to 2π
  const theta = normalize(sampleIndex, 0, samplesPerRow, 0, 2 * Math.PI);

  const radius = rowHeight - line[1][1];

  const previousTheta = normalize(
    sampleIndex - 1,
    0,
    samplesPerRow,
    0,
    2 * Math.PI
  );

  const previousRadius = rowHeight - line[0][1];

  let polarLine = [
    convertPolarToCartesian([previousRadius, previousTheta]),
    convertPolarToCartesian([radius, theta]),
  ];

  polarLine = polarLine.map(point => [
    point[0] + width / 2,
    point[1] + height / 2,
  ]);

  const p1 = [
    mix(polarLine[0][0], line[0][0], polarRatio),
    mix(polarLine[0][1], line[0][1], polarRatio),
  ];

  const p2 = [
    mix(polarLine[1][0], line[1][0], polarRatio),
    mix(polarLine[1][1], line[1][1], polarRatio),
  ];

  return [p1, p2];
};
