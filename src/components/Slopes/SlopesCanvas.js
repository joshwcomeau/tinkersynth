// @flow
import React, { useRef, useEffect, useContext } from 'react';
import { Spring } from 'react-spring';

import { mix, extractTypeFromObject } from '../../utils';
import { renderPolylines } from '../../vendor/polylines';
import {
  getScaledCanvasProps,
  getDevicePixelRatio,
} from '../../helpers/canvas.helpers';
import memoWhileIgnoring from '../../hocs/memo-while-ignoring';

import transformParameters from './Slopes.params';
import { SlopesContext } from './SlopesState';
import Worker from './SlopesCanvas.worker';

let worker;
if (typeof window !== 'undefined') {
  worker = new Worker();
}

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
  // In SSR mode, we don't want to try and do any of this.
  if (!worker) {
    return;
  }

  const topMargin = (height / 11) * 1;
  const leftMargin = (width / 8.5) * 1;

  // I want `samplesPerRow` to be as high as possible, so that curves aren't
  // choppy and gross. But, the higher it is, the more expensive / slow it is
  // to compute.
  // In standard "cartesian" mode, using width * 0.5 is fine (1 point every 2
  // pixels). In Polar mode, though, a single line does a big loop around the
  // canvas, so we need more than 1 point per width-pixel to represent it.
  const samplesPerRowWidthMultiplier = mix(1, 0.5, params.polarAmount / 100);

  const samplesPerRow = Math.ceil(width * samplesPerRowWidthMultiplier);

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
    if (!canvasRef.current) {
      return;
    }

    // If the browser supports it, all we need to do is transfer control.
    // The actual calculating and updating will happen in SlopesCanvas.worker.
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
          background: params.isDarkMode ? '#111111' : '#FFFFFF',
          lineColor: params.isDarkMode ? '#FFFFFF' : '#000000',
          lineWidth: params.isDarkMode ? 1.5 : 1,
        });
      };
    }
  }, []);

  // Redraw on every render.
  // `memoWhileIgnoring` should ensure that only the pertinent updates cause
  // a re-render.
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
  });
};

const SlopesCanvas = ({ width, height, ...params }: Props) => {
  const canvasRef = useRef(null);

  const { style, ...dimensions } = getScaledCanvasProps(width, height);
  const devicePixelRatio = getDevicePixelRatio();

  useCanvasDrawing(canvasRef, devicePixelRatio, width, height, params);

  return (
    <canvas
      ref={canvasRef}
      {...dimensions}
      style={{
        ...style,
        display: 'block',
      }}
    />
  );
};

const OptimizedSlopesCanvas = memoWhileIgnoring(
  [
    'setSeed',
    'setAmplitudeAmount',
    'setOctaveAmount',
    'setPerspective',
    'setSpikyness',
    'setStaticAmount',
    'setPolarAmount',
    'setOmega',
    'setSplitUniverse',
    'setEnableOcclusion',
    'setEnableLineBoost',
    'setPeaksCurve',
    'setPersonInflateAmount',
    'setWavelength',
    'setWaterBoilAmount',
    'setBallSize',
    'randomize',
    'disabledParams',
  ],
  SlopesCanvas
);

const Container = (props: any) => {
  const slopesParams = useContext(SlopesContext);

  const springParams = extractTypeFromObject(slopesParams, 'number');

  // I generally want to spring all params, but I don't want to spring the seed;
  // fractional seeds don't make sense, and it would be too chaotic anyway.
  delete springParams.seed;

  return (
    <Spring to={springParams} immediate={slopesParams.isRandomized}>
      {interpolatedParams => (
        <OptimizedSlopesCanvas
          {...slopesParams}
          {...interpolatedParams}
          {...props}
        />
      )}
    </Spring>
  );
};

export default Container;
