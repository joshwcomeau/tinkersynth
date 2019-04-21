import { COLORS } from '../../constants';
import { throttle } from '../../utils';
import { renderPolylines, polylinesToSVG } from '../../vendor/polylines';

import generator from './Slopes.generator';
import { getRenderOptions } from './SlopesCanvas.helpers';
import transformParameters from './Slopes.params';

self.onmessage = ({ data }) => {
  const workStartsAt = performance.now();

  const { canvasDimensions, params } = data;

  const slopeValues = transformParameters({
    width: canvasDimensions.width,
    height: canvasDimensions.height,
    ...params,
  });

  const rows = generator({
    ...slopeValues,
    width: canvasDimensions.width,
    height: canvasDimensions.height,
  });

  const renderOptions = getRenderOptions(
    canvasDimensions.width,
    canvasDimensions.height,
    'download-opaque',
    slopeValues
  );

  // Create vector (SVG) markup.
  // We'll use this for the raster format as well, to guarantee
  // consistency between both.
  const markup = polylinesToSVG(rows, renderOptions);

  // $FlowIgnore
  const workDuration = performance.now() - workStartsAt;
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
