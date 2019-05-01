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
  colorMode: 'row' | 'segment',
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
    colorMode,
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

      const color = getColorForLine(
        colorMode,
        rowIndex,
        segmentIndex,
        lineColors
      );

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
      context.strokeStyle = getColorForLine(
        opt.colorMode,
        rowIndex,
        segmentIndex,
        lineColors
      );

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

const getColorForLine = (colorMode, rowIndex, segmentIndex, lineColors) => {
  const rowOffset = rowIndex % lineColors.length;

  if (colorMode === 'row') {
    return lineColors[rowOffset];
  } else {
    return lineColors[(segmentIndex + rowOffset) % lineColors.length];
  }
};

export default renderPolylines;
