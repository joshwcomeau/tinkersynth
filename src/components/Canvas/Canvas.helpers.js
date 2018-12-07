// @flow

// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(ctx: CanvasRenderingContext2D) {
  // If we're rendering on the server, do nothing.
  if (typeof window === 'undefined') {
    return;
  }

  const backingStoreRatio =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;

  // $FlowFixMe - apparently backingStoreRatio can contain non-numbers?
  const ratio = (window.devicePixelRatio || 1) / backingStoreRatio;

  if (ratio > 1) {
    /* eslint-disable no-param-reassign */
    ctx.canvas.style.height = `${ctx.canvas.height}px`;
    ctx.canvas.style.width = `${ctx.canvas.width}px`;
    ctx.canvas.width *= ratio;
    ctx.canvas.height *= ratio;
    /* eslint-enable */

    ctx.scale(ratio, ratio);
  }
}
