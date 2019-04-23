// @flow
/**
 * Taken and modified from canvas-sketch-util, by Matt Deslauriers
 * https://github.com/mattdesl/canvas-sketch-util/blob/master/penplot.js
 */

import { COLORS } from '../constants';
import { arePointsEqual } from '../helpers/line.helpers';

import type { Rows } from '../types';

type Options = {
  width: number,
  height: number,
  context?: CanvasRenderingContext2D,
  lineWidth: number,
  backgroundColor: string,
  lineColors: string,
  lineCap: string,
};

const generateSvgPath = (pathCommands, color, { lineWidth, lineCap }) => {
  const lineJoin = lineCap === 'round' ? 'round' : 'miter';

  return `
  <path
    d="${pathCommands.join(' ')}"
    stroke="${color}"
    stroke-width="${lineWidth}px"
    fill="none"
    stroke-linecap="${lineCap}"
    stroke-linejoin="${lineJoin}"
  />`;
};

export const polylinesToSVG = function polylinesToSVG(
  rows: Rows,
  opt: Options
) {
  const {
    width,
    height,
    backgroundColor,
    lineColors,
    lineWidth,
    lineCap,
  } = opt;

  if (typeof width === 'undefined' || typeof height === 'undefined') {
    throw new Error('Must specify "width" and "height" options');
  }

  const lineJoin = lineCap === 'round' ? 'round' : 'miter';

  const paths = [];

  [...rows].reverse().forEach((row, rowIndex) => {
    row.forEach((lines, segmentIndex) => {
      const pathCommands = [];

      const color = getColorForLine(rowIndex, segmentIndex, lineColors);

      lines.forEach((point, index) => {
        const command = index === 0 ? 'M' : 'L';
        const [x, y] = point;

        pathCommands.push(`${command}${x} ${y}`);
      });

      const path = generateSvgPath(pathCommands, color, opt);
      paths.push(path);
    });
  });

  const pathsMarkup = paths.join('\n');

  return `<svg
  width="${width}"
  height="${height}"
  viewBox="0 0 ${width} ${height}"
>
  ${pathsMarkup}
</svg>`;
};

export const renderPolylines = function(
  rows: Rows,
  context: CanvasRenderingContext2D,
  opt: Options
) {
  if (!context) throw new Error('Must specify "context" options');

  const { width, height, lineColors } = opt;

  if (typeof width === 'undefined' || typeof height === 'undefined') {
    throw new Error('Must specify "width" and "height" options');
  }

  // Choose a default line width based on a relatively fine-tip pen
  var lineWidth = opt.lineWidth;

  // Clear canvas
  context.clearRect(0, 0, width, height);

  // Fill with white
  context.fillStyle = opt.backgroundColor || 'white';
  context.fillRect(0, 0, width, height);

  // Draw lines
  [...rows].reverse().forEach((row, rowIndex) => {
    row.forEach(function(lines, segmentIndex) {
      context.strokeStyle = getColorForLine(rowIndex, segmentIndex, lineColors);

      context.beginPath();

      lines.forEach(function(point, segmentIndex) {
        context.lineTo(point[0], point[1]);
      });

      context.lineWidth = lineWidth;
      context.lineJoin = opt.lineCap === 'round' ? 'round' : 'miter';
      context.lineCap = opt.lineCap || 'butt';
      context.stroke();
    });
  });
};

// SURPRISING COMPLEXITY WARNING
// With most settings, every row will contain a small number (usually 1) of
// polylines (a line with many points). The `segmentIndex` refers to these
// segments.
//
// When `perlinRatio` is less than 1, or `dotRatio` is more than 0, suddenly
// every row has MANY lines, and each line only has 2 points. Each row is no
// longer contiguous, and so the segment indexes come into play.
//
// Originally, I was going to have different "color modes" that the user could
// toggle between, but I realized that the data format I already had meant I
// could choose a "good looking" option automatically depending on the data.
//
// The one drawback to this is that if a line is occluded, when that line comes
// back in, it'll be a different color (since it's a different segment).
// I could fix this by deriving the color mode from that setting, but for now
// I don't care enough.
const getColorForLine = (rowIndex, segmentIndex, lineColors) => {
  const rowOffset = rowIndex % lineColors.length;
  return lineColors[(segmentIndex + rowOffset) % lineColors.length];
};

export default renderPolylines;
