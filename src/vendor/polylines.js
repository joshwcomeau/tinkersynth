// @flow

/**
 * Taken and modified from canvas-sketch-util
 * https://github.com/mattdesl/canvas-sketch-util/blob/master/penplot.js
 */

import { COLORS } from '../constants';

import type { Rows } from '../types';

type Options = {
  width: number,
  height: number,
  context?: CanvasRenderingContext2D,
  lineWidth?: number,
  backgroundColor?: string,
  lineColor?: string,
  lineCap: string,
};

const LINE_COLORS = [
  // COLORS.red[300],
  // COLORS.orange[300],
  COLORS.yellow[300],
  // COLORS.green[500],
  // COLORS.aqua[500],
  // COLORS.blue[500],
  // COLORS.violet[300],
  COLORS.pink[300],
];

const getColorForLine = (rowIndex, segmentIndex) => {
  const color1 = LINE_COLORS[rowIndex % LINE_COLORS.length];
  const color2 = LINE_COLORS[(rowIndex + 1) % LINE_COLORS.length];

  return { color1, color2 };
};

export const polylinesToSVG = function polylinesToSVG(rows, opt: Options) {
  const { width, height, backgroundColor, lineWidth, lineCap } = opt;

  var computeBounds =
    typeof width === 'undefined' || typeof height === 'undefined';

  if (computeBounds) {
    throw new Error('Must specify "width" and "height" options');
  }

  const units = 'px';
  const viewWidth = `${width}px`;
  const viewHeight = `${height}px`;
  const lineJoin = lineCap === 'round' ? 'round' : 'miter';

  const paths = [];

  rows.forEach((row, rowIndex) => {
    const strokeStyle = getColorForLine(rowIndex).color1;

    const pathCommands = [];

    row.forEach((points, segmentIndex) => {
      points.forEach((point, index) => {
        var type = index === 0 ? 'M' : 'L';
        const [x, y] = point;
        pathCommands.push(type + x + ' ' + y);
      });
    });

    const path = `
<path
  d="${pathCommands.join(' ')}"
  stroke="${strokeStyle}"
  stroke-width="${lineWidth}${units}"
  fill="none"
  stroke-linecap="${lineCap}"
  stroke-linejoin="${lineJoin}"
/>`;

    paths.push(path);
  });

  const pathsMarkup = paths.join('\n');

  return `
<svg
  width="${viewWidth}"
  height="${viewHeight}"
  viewBox="0 0 ${width} ${height}"
>
  <rect
    x="0"
    y="0"
    width="${viewWidth}"
    height="${viewHeight}"
    fill="${backgroundColor}"
  />

  ${pathsMarkup}
</svg>`;
};

export const renderPolylines = function(
  rows: Rows,
  context: CanvasRenderingContext2D,
  opt: Options
) {
  if (!context) throw new Error('Must specify "context" options');

  var width = opt.width;
  var height = opt.height;
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
    row.forEach(function(points, segmentIndex) {
      context.strokeStyle = getColorForLine(rowIndex, segmentIndex).color1;

      // const gradient = context.createLinearGradient(0, 0, width, 0);
      // gradient.addColorStop(0, color1);
      // gradient.addColorStop(1, color2);

      // context.strokeStyle = gradient;

      context.beginPath();

      points.forEach(function(p) {
        context.lineTo(p[0], p[1]);
      });

      // context.strokeStyle = opt.lineColor || 'black';
      context.lineWidth = lineWidth;
      context.lineJoin = opt.lineCap === 'round' ? 'round' : 'miter';
      context.lineCap = opt.lineCap || 'butt';
      context.stroke();
    });
  });
};

export default renderPolylines;
