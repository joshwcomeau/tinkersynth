// @flow
import { range } from '../utils';
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const { lerp } = require('canvas-sketch-util/math');

export const isPointValid = p1 => {
  return (
    Array.isArray(p1) &&
    p1.length === 2 &&
    typeof p1[0] === 'number' &&
    typeof p1[1] === 'number'
  );
};

export const arePointsEqual = (p1, p2) => {
  if (!isPointValid(p1) || !isPointValid(p2)) {
    throw new Error('Invalid points supplied: ' + JSON.stringify([p1, p2]));
  }

  return p1[0] === p2[0] && p1[1] === p2[1];
};

export const getDistanceBetweenPoints = (p1, p2) => {
  const deltaX = p2[0] - p1[0];
  const deltaY = p2[1] - p1[1];

  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

export const clipLinesWithMargin = ({
  lines,
  width,
  height,
  margins,
  withBorder,
}) => {
  let [top, left] = margins;

  // Clip all the lines to a margin
  const box = [left, top, width - left, height - top];
  let newLines = clipPolylinesToBox(lines, box);

  if (withBorder) {
    newLines = [...newLines, [box[0], box[1]]];
  }

  return newLines;
};

/**
 * Given two points, p1 and p2, create an array of tiny dashes that span between
 * them.
 *
 * NOTE: the dashes include the first point, but exclude the last point:
 *
 * __   __   __   __   .
 * ^                   ^
 * P1                  P2
 *
 * This is so that dashed lines can be chained together without doubling the
 * dash on the connecting point.
 *
 * @typedef {[number, number]} Point
 *
 * @param {Point} p1 - the start point
 * @param {Point} p2 - the end point
 * @param {number} numOfDashes - How many dashes to render
 * @param {number} dashLength - how long should each dash be? For a dotted line,
 *                              supply a really small value.
 */
export const createDashedLine = ({ p1, p2, numOfDashes, dashLength }) => {
  const distanceBetweenPoints = getDistanceBetweenPoints(p1, p2);

  return range(numOfDashes).map(dashIndex => {
    const ratio = dashIndex / numOfDashes;
    const pointStart = [
      lerp(p1[0], p2[0], ratio), // x
      lerp(p1[1], p2[1], ratio), // y
    ];

    const dashLengthRatio = dashLength / distanceBetweenPoints;
    const pointEnd = [
      lerp(p1[0], p2[0], ratio + dashLengthRatio), // x
      lerp(p1[1], p2[1], ratio + dashLengthRatio), // y
    ];

    return [pointStart, pointEnd];
  });
};

export const getSlopeAndInterceptForLine = ([[x1, y1], [x2, y2]]) => {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  const slope = deltaY / deltaX;
  const intercept = y1 - slope * x1;

  return { slope, intercept };
};

/**
 * Plotters work best when lines are connected in a "polyline", an array of
 * points. For this to work, though, the line must be contiguous.
 * Sometimes, it's easier during development to just treat each line segment
 * as an individual connection between 2 points.
 * This function does the work of going through the lines, in order, and
 * connecting any individual lines that share points into a polyline.
 *
 * @example [ [[0, 0], [0, 1]], [[0, 1], [0, 2]], [[0, 5], [0, 6]] ]
 *            \_____________/   \_____________/   \_____________/
 *                Line 1            Line 2             Line 3
 *
 *       -> [ [[0, 0], [0, 1], [0,2]], [[0, 5], [0, 6]] ]
 *            \_____________________/  \_____________/
 *                    Line 1               Line 2
 */
export const groupPolylines = lines => {
  return lines.reduce((acc, line, index) => {
    if (index === 0) {
      // For the very first line, create the first polyline
      return [...acc, line];
    }

    const [point1, point2] = line;

    // Check the previous point in `lines`, to see if it matches
    const [, previousLinePoint2] = lines[index - 1];

    const isContiguous = arePointsEqual(previousLinePoint2, point1);

    if (isContiguous) {
      acc[acc.length - 1].push(point2);
    } else {
      acc.push(line);
    }

    return acc;
  }, []);
};

/**
 * Given 4 points for a cubic bezier curve, figure out the X/Y values for
 * `t`, a number from 0-1 representing progress.
 */
export const getValuesForBezierCurve = ({
  startPoint,
  endPoint,
  controlPoint1,
  controlPoint2,
  t,
}) => {
  const x =
    (1 - t) ** 3 * startPoint[0] +
    3 * (1 - t) ** 2 * t * controlPoint1[0] +
    3 * (1 - t) * t ** 2 * controlPoint2[0] +
    t ** 3 * endPoint[0];

  const y =
    (1 - t) ** 3 * startPoint[1] +
    3 * (1 - t) ** 2 * t * controlPoint1[1] +
    3 * (1 - t) * t ** 2 * controlPoint2[1] +
    t ** 3 * endPoint[1];

  return [x, y];
};
