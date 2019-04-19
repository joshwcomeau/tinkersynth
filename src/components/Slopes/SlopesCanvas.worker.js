import { COLORS } from '../../constants';
import { throttle } from '../../utils';
import { renderPolylines } from '../../vendor/polylines';

import generator from './Slopes.generator';
import { getRenderOptions } from './SlopesCanvas.helpers';

// The offscreenCanvas API doesn't like when we try to pass the canvas multiple
// times between worker and main thread.
//
// The very first message received will include data.canvas and
// data.devicePixelRatio, and we'll use those to prepare the `ctx`, which will
// be stored in this variable:
let ctx;

onmessage = throttle(function({ data }) {
  const {
    canvas,
    devicePixelRatio,
    supportsOffscreenCanvas,
    scaleRatio,
  } = data;

  const rows = generator(data);

  if (supportsOffscreenCanvas) {
    const isFirstMessage = !ctx;

    if (isFirstMessage) {
      ctx = canvas.getContext('2d');

      // NOTE: Normally, scaling the canvas is a 2-part job:
      // - Multiply the width/height of the canvas by devicePixelRatio
      // - Scale the context to match
      //
      // Because this is running off the main thread, we don't have access to
      // `canvas.width` or `canvas.style.width`, so we can only do that second
      // part. We're trusting SlopesCanvas.js to also take devicePixelRatio into
      // account.
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    renderPolylines(
      rows,
      getRenderOptions(
        data.width,
        data.height,
        data.kind,
        ctx,
        devicePixelRatio,
        scaleRatio,
        data
      )
    );
  } else {
    // $FlowIgnore
    postMessage({ rows, ...data });
  }
}, 17);
