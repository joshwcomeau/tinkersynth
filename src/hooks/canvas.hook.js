// @flow
/**
 * A hook that allows drawing to an OffscreenCanvas through a Web Worker,
 * if supported by the current browser.
 */
import React from 'react';

import useWorker from './worker.hook.js';
import { getOffscreenCanvasSupport } from '../helpers/canvas.helpers';

type HandleMessage = (context: CanvasRenderingContext2D, data: any) => void;

type Worker = any;

type WorkerConstructorType = () => Worker;

type ReturnVal = {
  canvasRef: { current: ?HTMLCanvasElement },
  worker: ?Worker,
};

const getDevicePixelRatio = () => {
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

const useCanvas = (
  WorkerConstructor: WorkerConstructorType,
  messageData: any,
  handleMessage: HandleMessage
): ReturnVal => {
  // We need to capture a reference to the underlying Canvas node
  // We trust the consumer to use this ref
  const canvasRef = React.useRef(null);

  // In SSR mode, we don't want to try and do any of this.
  if (typeof window === 'undefined') {
    return { canvasRef, worker: null };
  }

  const worker = useWorker(WorkerConstructor);

  const devicePixelRatio = getDevicePixelRatio();
  const supportsOffscreenCanvas = getOffscreenCanvasSupport();
  const hasSentCanvas = React.useRef(false);

  // On mount, set up the worker message-handling
  React.useEffect(() => {
    // If the user forgot to apply the canvas ref, we can't proceed.
    // Let them know
    if (!canvasRef.current) {
      console.warn(
        'Canvas reference not found on mount, so no canvas stuff will happen'
      );
      return;
    }

    // If the browser supports it, all we need to do is transfer control.
    // The actual calculating and updating will happen in SlopesCanvas.worker.
    if (supportsOffscreenCanvas) {
      // Canvas _does_ have transferControlToOffscreen if
      // `supportsOffscreenCanvas` is true. $FlowIgnore
      canvasRef.current = canvasRef.current.transferControlToOffscreen();
    } else {
      const context = canvasRef.current.getContext('2d');
      context.scale(devicePixelRatio, devicePixelRatio);

      if (!worker) {
        return;
      }

      worker.onmessage = ({ data }) => handleMessage(context, data);
    }
  }, []);

  // Redraw on every render.
  // `React.memo` should ensure that only the pertinent updates cause
  // a re-render.
  React.useEffect(() => {
    let transfer = undefined;
    const message = {
      devicePixelRatio,
      supportsOffscreenCanvas,
      canvas: undefined,
      messageData,
    };

    // If this is the very first time we're painting to the canvas, we need
    // to send it along, using the cumbersome "data and transfer" API.
    // More info: https://developers.google.com/web/updates/2018/08/offscreen-canvas
    if (supportsOffscreenCanvas && !hasSentCanvas.current) {
      message.canvas = canvasRef.current;
      transfer = [canvasRef.current];

      hasSentCanvas.current = true;
    }

    if (!worker) {
      return;
    }

    worker.postMessage(message, transfer);
  });

  return {
    canvasRef,
    worker,
  };
};

export default useCanvas;
