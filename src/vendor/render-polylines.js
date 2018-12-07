// @flow

/**
 * Taken from canvas-sketch-util
 * https://github.com/mattdesl/canvas-sketch-util/blob/master/penplot.js
 */

type Options = {
  width: number,
  height: number,
  context: CanvasRenderingContext2D,
  lineWidth?: number,
  background?: string,
  lineColor?: string,
};

const renderPolylines = function(polylines, opt: Options) {
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
