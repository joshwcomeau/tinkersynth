export const getOffscreenCanvasSupport = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  // Safari weirdly has an `OffscreenCanvas` in window, but it doesn't actually
  // support it. For now, we'll force-disable offscreen-canvas if the user
  // is browsing from Safari.
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    return false;
  }

  return 'OffscreenCanvas' in window;
};

export const getDevicePixelRatio = () => {
  // Don't break SSR by assuming a window is available.
  if (typeof window === 'undefined') {
    return 1;
  }

  // On older browsers, this property won't be set. Just assume 1 in this
  // case. Should be extremely rare nowadays (would React even work?)
  if (typeof window.devicePixelRatio === 'undefined') {
    return 1;
  }

  return window.devicePixelRatio;
};

export const getScaledCanvasProps = (width, height) => {
  const devicePixelRatio = getDevicePixelRatio();

  // HACK: We need to scale our canvas by our devicePixelRatio. This is a 2-step
  // process:
  //  - Change the width/height/style.width/style.height
  //  - Use the canvas context to scale it accordingly.
  //
  // I normally do both of these things in the same place, but because we're
  // using an offscreenCanvas, we don't have access to the canvas context here.
  // So I need to do that first step inline, and trust that the ctx.scale call
  // will exist in `SlopesCanvas.worker`.

  return {
    style: {
      width,
      height,
    },
    width: width * devicePixelRatio,
    height: height * devicePixelRatio,
  };
};
