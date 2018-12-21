// @flow
import React, { useRef, useEffect, useContext } from 'react';
import { Spring } from 'react-spring';

import { renderPolylines } from '../../vendor/polylines';
import { getScaledCanvasProps } from '../../helpers/canvas.helpers';

import transformParameters from './Slopes.params';
import { SlopesContext } from './SlopesState';
import Worker from './SlopesCanvas.worker.js';

const worker = new Worker();

type Props = {
  width: number,
  height: number,
};

const useCanvasDrawing = (
  canvasRef,
  devicePixelRatio,
  width,
  height,
  params
) => {
  const topMargin = (height / 11) * 1;
  const leftMargin = (width / 8.5) * 1;
  const samplesPerRow = Math.ceil(width * 0.5);

  const supportsOffscreenCanvas = 'OffscreenCanvas' in window;
  const hasSentCanvas = useRef(false);

  // The user can tweak "high-level parameters" like spikyness, perspective,
  // etc. These values need to be reduced to low-level variables used in
  // calculation. There is not a 1:1 mapping between them: a single
  // high-level param might tweak several low-level vars, and the same
  // variable might be affected by multiple params.
  const drawingVariables = transformParameters({
    height,
    ...params,
  });

  // On mount, set up the worker message-handling
  useEffect(() => {
    // If the browser supports it, we want to allow the canvas to be painted
    // off of the main thread.

    if (supportsOffscreenCanvas) {
      canvasRef.current = canvasRef.current.transferControlToOffscreen();
    } else {
      const context = canvasRef.current.getContext('2d');
      context.scale(devicePixelRatio, devicePixelRatio);

      worker.onmessage = function({ data }) {
        if (!data.lines) {
          return;
        }

        renderPolylines(data.lines, {
          width,
          height,
          context,
        });
      };

      return () => {
        // TODO: cleanup
      };
    }
  }, []);

  // NOTE: Right now, I'm allowing the canvas to redraw whenever it rerenders.
  // This seems to be OK since SlopesCanvas is a pure component (using
  // React.memo).
  // If this component re-renders too much, we may wish to add an array of
  // derived variables, to only update on them
  // eg. triggerUpdateOn = [distanceBetweenRows, perlinRatio, ...]
  const triggerUpdateOn = undefined;

  useEffect(() => {
    let messageData = {
      width,
      height,
      margins: [topMargin, leftMargin],
      samplesPerRow,
      supportsOffscreenCanvas,
      ...drawingVariables,
    };
    let transfer = undefined;

    // If this is the very first time we're painting to the canvas, we need
    // to send it along, using the cumbersome "data and transfer" API.
    // More info: https://developers.google.com/web/updates/2018/08/offscreen-canvas
    if (supportsOffscreenCanvas && !hasSentCanvas.current) {
      messageData.canvas = canvasRef.current;
      messageData.devicePixelRatio = devicePixelRatio;
      transfer = [canvasRef.current];

      hasSentCanvas.current = true;
    }

    worker.postMessage(messageData, transfer);
  }, triggerUpdateOn);
};

const SlopesCanvas = ({
  width,
  height,
  perspective,
  spikyness,
  polarAmount,
  omega,
  splitUniverse,
}: Props) => {
  const canvasRef = useRef(null);

  const params = {
    perspective,
    spikyness,
    polarAmount,
    omega,
    splitUniverse,
  };

  const scaledCanvasProps = getScaledCanvasProps(width, height);

  useCanvasDrawing(canvasRef, devicePixelRatio, width, height, params);

  return <canvas ref={canvasRef} {...scaledCanvasProps} />;
};

// TODO: Can I use hooks, and merge this with the parent?
const SlopesCanvasContainer = props => {
  const slopesParams = useContext(SlopesContext);

  return (
    <Spring to={slopesParams}>
      {interpolatedParams => (
        <SlopesCanvas {...interpolatedParams} {...props} />
      )}
    </Spring>
  );
};

export default React.memo(SlopesCanvasContainer);
