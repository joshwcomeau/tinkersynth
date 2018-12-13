// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(ctx: CanvasRenderingContext2D, devicePixelRatio) {
  const backingStoreRatio =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;

  // $FlowFixMe - apparently backingStoreRatio can contain non-numbers?
  const ratio = (devicePixelRatio || 1) / backingStoreRatio;

  ctx.scale(ratio, ratio);
}
