import { COLORS } from '../../constants';
import { throttle } from '../../utils';
import {
  renderPolylines,
  polylinesToSVG,
} from '../../services/polylines.service';

import generator from './Slopes.generator';
import { getRenderOptions } from './SlopesCanvas.helpers';

// The offscreenCanvas API doesn't like when we try to pass the canvas multiple
// times between worker and main thread.
//
// The very first message received will include data.canvas and
// data.devicePixelRatio, and we'll use those to prepare the `ctx`, which will
// be stored in this variable:
let ctx;

self.onmessage = throttle(function({ data }) {
  const {
    canvas,
    devicePixelRatio,
    supportsOffscreenCanvas,
    messageData,
    messageData: { width, height, kind },
  } = data;

  const rows = generator(messageData);

  // If the browser supports OffscreenCanvas, we can paint to the canvas right
  // here and now!
  // Otherwise, we'll just post the calculated rows back to the main thread,
  // and the host component can paint to the canvas.
  if (supportsOffscreenCanvas) {
    const isFirstMessage = !ctx;

    if (isFirstMessage) {
      ctx = canvas.getContext('2d');

      // NOTE: Normally, scaling the canvas is a 2-part job:
      // - Multiply the width/height of the canvas by devicePixelRatio
      // - Scale the context to match
      //
      // Because this is running off the main thread, we don't have access to
      // `canvas.style.width`, so we can only do that second part.
      // We're trusting SlopesCanvas.js to also take devicePixelRatio into
      // account!!
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    renderPolylines(
      rows,
      ctx,
      getRenderOptions(width, height, kind, messageData)
    );
  } else {
    // $FlowIgnore
    self.postMessage({ rows, ...messageData });
  }
}, 17);
