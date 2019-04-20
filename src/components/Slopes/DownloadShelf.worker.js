import { COLORS } from '../../constants';
import { throttle } from '../../utils';
import { renderPolylines, polylinesToSVG } from '../../vendor/polylines';

import generator from './Slopes.generator';
import { getRenderOptions } from './SlopesCanvas.helpers';
import transformParameters from './Slopes.params';

// The offscreenCanvas API doesn't like when we try to pass the canvas multiple
// times between worker and main thread.
//
// The very first message received will include data.canvas and
// data.devicePixelRatio, and we'll use those to prepare the `ctx`, which will
// be stored in this variable:
let ctx;

self.onmessage = ({ data }) => {
  const workStartsAt = performance.now();

  const { canvasDimensions, params } = data;

  const slopeValues = transformParameters({
    width: canvasDimensions.width,
    height: canvasDimensions.height,
    ...params,
  });

  console.log('generator', { ...slopeValues, height: canvasDimensions.height });

  const rows = generator({
    ...slopeValues,
    width: canvasDimensions.width,
    height: canvasDimensions.height,
  });

  const renderOptions = getRenderOptions(
    canvasDimensions.width,
    canvasDimensions.height,
    'download-opaque',
    1,
    slopeValues
  );

  // Create vector (SVG) markup.
  // We'll use this for the raster format as well, to guarantee
  // consistency between both.
  const markup = polylinesToSVG(rows, renderOptions);

  // $FlowIgnore
  const workDuration = performance.now() - workStartsAt;
  console.log({ workDuration });
  // We want to wait up to 600ms, so that we don't interrupt the slide
  // animation with this message
  const timeRemaining = 600 - workDuration;

  if (timeRemaining > 0) {
    self.setTimeout(() => {
      self.postMessage({ markup });
    }, timeRemaining);
  } else {
    self.postMessage({ markup });
  }
};
