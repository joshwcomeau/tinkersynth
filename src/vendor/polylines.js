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

export const polylinesToSVG = function polylinesToSVG(polylines, opt: Options) {
  opt = opt || {};

  var width = opt.width;
  var height = opt.height;

  var computeBounds =
    typeof width === 'undefined' || typeof height === 'undefined';
  if (computeBounds) {
    throw new Error('Must specify "width" and "height" options');
  }

  var units = 'px';

  var commands = [];

  polylines.forEach(function(line) {
    line.forEach(function(point, index) {
      var type = index === 0 ? 'M' : 'L';
      const [x, y] = point;
      commands.push(type + x + ' ' + y);
    });
  });

  var svgPath = commands.join(' ');
  var viewWidth = `${width}px`;
  var viewHeight = `${height}px`;
  var fillStyle = opt.backgroundColor || 'none';
  var strokeStyle = opt.lineColor || 'black';
  var lineWidth = opt.lineWidth || 1;
  var lineJoin = opt.lineCap === 'round' ? 'round' : 'miter';
  var lineCap = opt.lineCap || 'butt';

  return `
<svg
  width="${viewWidth}"
  height="${viewHeight}"
  viewBox="0 0 ${viewWidth} ${viewHeight}"
>
  <rect
    x="0"
    y="0"
    width="${viewWidth}"
    height="${viewHeight}"
    fill="${fillStyle}"
  />
  <path
    d="${svgPath}"
    stroke="${strokeStyle}"
    stroke-width="${lineWidth}${units}"
    fill="none"
    stroke-linecap="${lineCap}"
    stroke-linejoin="${lineJoin}"
  />
</svg>`;
};

export const renderPolylines = function(rows: Rows, opt: Options) {
  var context = opt.context;
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
      const isOddRow = rowIndex % 2 !== 0;

      const index = isOddRow ? rowIndex : segmentIndex;

      const color1 = LINE_COLORS[index % LINE_COLORS.length];
      const color2 = LINE_COLORS[(index + 1) % LINE_COLORS.length];

      // const gradient = context.createLinearGradient(0, 0, width, 0);
      // gradient.addColorStop(0, color1);
      // gradient.addColorStop(1, color2);

      // context.strokeStyle = gradient;

      context.strokeStyle = color1;

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
