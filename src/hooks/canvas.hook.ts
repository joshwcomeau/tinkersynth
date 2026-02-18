/**
 * A hook that allows drawing to an OffscreenCanvas through a Web Worker,
 * if supported by the current browser.
 */
import React from 'react';

import useWorker from './worker.hook';
import { getOffscreenCanvasSupport } from '../helpers/canvas.helpers';

type HandleMessage = (context: CanvasRenderingContext2D, data: any) => void;

type Worker = any;

type WorkerConstructorType = () => Worker;

type ReturnVal = {
  canvasRef: React.RefObject<HTMLCanvasElement | OffscreenCanvas | null>;
  worker: Worker | null;
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
  // We need to capture a reference to the underlying Canvas node (or OffscreenCanvas after transfer).
  // We trust the consumer to use this ref on a <canvas> element.
  const canvasRef = React.useRef<HTMLCanvasElement | OffscreenCanvas | null>(null);

  // In SSR mode, we don't want to try and do any of this.
  if (typeof window === 'undefined') {
    return { canvasRef, worker: null };
  }

  const worker = useWorker(WorkerConstructor);

  const devicePixelRatio = getDevicePixelRatio();
  const supportsOffscreenCanvas = getOffscreenCanvasSupport();
  const hasSentCanvas = React.useRef(false);
  // Track which canvas we've already transferred so we don't call
  // transferControlToOffscreen() twice (e.g. React Strict Mode double-mount).
  const transferredCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = React.useRef<OffscreenCanvas | null>(null);

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

    const canvas = canvasRef.current;

    // If the browser supports it, all we need to do is transfer control.
    // The actual calculating and updating will happen in SlopesCanvas.worker.
    // Only transfer once per canvas element.
    if (supportsOffscreenCanvas) {
      if (transferredCanvasRef.current === canvas) {
        // Already transferred (e.g. Strict Mode re-ran effect); restore ref and
        // reset hasSentCanvas so the paint effect will send the canvas again
        // (worker may have been recreated after cleanup).
        canvasRef.current = offscreenCanvasRef.current;
        hasSentCanvas.current = false;
        return;
      }
      transferredCanvasRef.current = canvas as HTMLCanvasElement;
      const offscreen = (canvas as HTMLCanvasElement).transferControlToOffscreen();
      offscreenCanvasRef.current = offscreen;
      canvasRef.current = offscreen;
    } else {
      const context = (canvas as HTMLCanvasElement).getContext('2d');
      if (!context) return;

      context.scale(devicePixelRatio, devicePixelRatio);

      if (!worker) {
        return;
      }

      worker.onmessage = ({ data }: { data: any }) => handleMessage(context, data);
    }
  }, []);

  // Redraw on every render.
  // `React.memo` should ensure that only the pertinent updates cause
  // a re-render.
  React.useEffect(() => {
    let transfer: Transferable[] | undefined = undefined;
    const message: {
      devicePixelRatio: number;
      supportsOffscreenCanvas: boolean;
      canvas?: OffscreenCanvas;
      messageData: any;
    } = {
      devicePixelRatio,
      supportsOffscreenCanvas,
      messageData,
    };

    // If this is the very first time we're painting to the canvas, we need
    // to send it along, using the cumbersome "data and transfer" API.
    // More info: https://developers.google.com/web/updates/2018/08/offscreen-canvas
    if (supportsOffscreenCanvas && !hasSentCanvas.current && canvasRef.current) {
      message.canvas = canvasRef.current as OffscreenCanvas;
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
