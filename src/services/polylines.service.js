// @flow
/**
 * Taken and modified from canvas-sketch-util, by Matt Deslauriers
 * https://github.com/mattdesl/canvas-sketch-util/blob/master/penplot.js
 */

import { COLORS } from '../constants';
import { arePointsEqual } from '../helpers/line.helpers';

import type { Rows, ColoringMode } from '../types';

type Options = {
  width: number,
  height: number,
  context?: CanvasRenderingContext2D,
  coloringMode: ColoringMode,
  lineWidth: number,
  backgroundColor: string,
  lineColors: string,
  lineCap: string,
};

const getColorForLine = (rowIndex, segmentIndex, coloringMode, lineColors) => {
  if (coloringMode === 'row') {
    return lineColors[rowIndex % lineColors.length];
  } else {
    const rowOffset = rowIndex % lineColors.length;
    return lineColors[(segmentIndex + rowOffset) % lineColors.length];
  }
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
    coloringMode,
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
    if (coloringMode === 'row') {
      // In the default mode, every row gets its own color.
      // This means that we can join all contiguous segments, to avoid the
      // weird stitching error that occurs otherwise.
      const color = lineColors[rowIndex % lineColors.length];

      const pathCommands = [];

      row.forEach((lines, segmentIndex) => {
        lines.forEach((point, index) => {
          const command = index === 0 ? 'M' : 'L';
          const [x, y] = point;

          pathCommands.push(`${command}${x} ${y}`);
        });
      });

      const path = generateSvgPath(pathCommands, color, opt);
      paths.push(path);
    } else if (coloringMode === 'segment') {
      // In `segment` mode, every two-point line is colored differently. This
      // produces a wonderful effect when using dotRatio or spikyness.
      throw new Error('Not implemented yet');
    }
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

  const { width, height, coloringMode, lineColors } = opt;

  if (typeof width === 'undefined' || typeof height === 'undefined') {
    throw new Error('Must specify "width" and "height" options');
  }

  // Choose a default line width based on a relatively fine-tip pen
  var lineWidth = opt.lineWidth || 1;

  // Clear canvas
  context.clearRect(0, 0, width, height);

  // Fill with white
  context.fillStyle = opt.backgroundColor || 'white';
  context.fillRect(0, 0, width, height);

  // Draw lines
  [...rows].reverse().forEach((row, rowIndex) => {
    row.forEach(function(line, segmentIndex) {
      context.strokeStyle = getColorForLine(
        rowIndex,
        segmentIndex,
        coloringMode,
        lineColors
      );

      context.beginPath();

      line.forEach(function(p) {
        context.lineTo(p[0], p[1]);
      });

      context.lineWidth = lineWidth;
      context.lineJoin = opt.lineCap === 'round' ? 'round' : 'miter';
      context.lineCap = opt.lineCap || 'butt';
      context.stroke();
    });
  });
};

export default renderPolylines;
