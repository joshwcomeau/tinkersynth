// @flow

/**
 * Taken from canvas-sketch-util
 * https://github.com/mattdesl/canvas-sketch-util/blob/master/penplot.js
 */

type Options = {
  width: number,
  height: number,
  context?: CanvasRenderingContext2D,
  lineWidth?: number,
  background?: string,
  lineColor?: string,
};

export const polylinesToSVG = function polylinesToSVG(polylines, opt: Options) {
  opt = opt || {};

  var width = opt.width;
  var height = opt.height;

  var computeBounds =
    typeof width === 'undefined' || typeof height === 'undefined';
  if (computeBounds) {
    throw new Error('Must specify "width" and "height" options');
  }

  var units = opt.units || 'px';

  var commands = [];

  polylines.forEach(function(line) {
    line.forEach(function(point, j) {
      var type = j === 0 ? 'M' : 'L';
      const [x, y] = point;
      commands.push(type + x + ' ' + y);
    });
  });

  var svgPath = commands.join(' ');
  var viewWidth = `${width}px`;
  var viewHeight = `${height}px`;
  var fillStyle = opt.background || 'none';
  var strokeStyle = opt.lineColor || 'black';
  var lineWidth = opt.lineWidth || 1;

  return [
    '    <g>',
    '      <path d="' +
      svgPath +
      '" fill="' +
      fillStyle +
      '" stroke="' +
      strokeStyle +
      '" stroke-width="' +
      lineWidth +
      units +
      '" />',
    '    </g>',
  ].join('\n');
};

export const renderPolylines = function(polylines, opt: Options) {
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
  context.fillStyle = opt.background || 'white';
  context.fillRect(0, 0, width, height);

  // Draw lines
  polylines.forEach(function(points) {
    context.beginPath();

    points.forEach(function(p) {
      context.lineTo(p[0], p[1]);
    });

    context.strokeStyle = opt.lineColor || 'black';
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke();
  });
};

export default renderPolylines;
