export const getScaledCanvasProps = (width, height) => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  // HACK: We need to scale our canvas by our devicePixelRatio. This is a 2-step
  // process:
  //  - Change the width/height/style.width/style.height
  //  - Use the canvas context to scale it accordingly.
  //
  // I normally do both of these things in the same place, but because we're
  // using an offscreenCanvas, we don't have access to the canvas context here.
  // So I need to do that first step inline, and trust that the ctx.scale call
  // will exist in `SlopesCanvas.worker.js`.

  return {
    style: {
      width,
      height,
    },
    width: width * devicePixelRatio,
    height: height * devicePixelRatio,
  };
};
