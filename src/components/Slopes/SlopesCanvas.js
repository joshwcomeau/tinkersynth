// @flow
import React, { useRef, useEffect, useMemo } from 'react';

import { renderPolylines } from '../../vendor/polylines';
import Canvas from '../Canvas';

import transformParameters from './Slopes.params';

import Worker from './Slopes.worker.js';

const worker = new Worker();

type Props = {
  width: number,
  height: number,
  perspective: number,
  spikyness: number,
  polarAmount: number,
};

const Slopes = ({
  width,
  height,
  perspective,
  spikyness,
  polarAmount,
}: Props) => {
  const topMargin = (height / 11) * 1;
  const leftMargin = (width / 8.5) * 1;
  const samplesPerRow = Math.ceil(width * 0.5);

  // On mount, set up the worker message-handling
  useEffect(() => {
    // If the browser supports it, we want to allow the canvas to be painted
    // off of the main thread.
    canvasRef.current = canvasRef.current.transferControlToOffscreen();

    // worker.onmessage = function({ data }) {
    //   const context = canvasRef.current;

    //   if (!data.lines) {
    //     return;
    //   }

    //   renderPolylines(data.lines, {
    //     width,
    //     height,
    //     context,
    //   });
    // };

    return () => {
      // TODO: cleanup
    };
  }, []);

  // The user can tweak "high-level parameters" like spikyness, perspective,
  // etc. These values need to be reduced to low-level variables used in
  // calculation. There is not a 1:1 mapping between them: a single
  // high-level param might tweak several low-level vars, and the same
  // variable might be affected by multiple params.
  const {
    distanceBetweenRows,
    rowHeight,
    perlinRatio,
    polarRatio,
  } = transformParameters({
    height,
    perspective,
    spikyness,
    polarAmount,
  });

  const canvasRef = useRef(null);

  const hasSentCanvas = useRef(false);

  useEffect(
    () => {
      if (hasSentCanvas.current) {
        worker.postMessage({
          width,
          height,
          margins: [topMargin, leftMargin],
          distanceBetweenRows,
          perlinRatio,
          rowHeight,
          samplesPerRow,
          polarRatio,
        });
      } else {
        worker.postMessage(
          {
            width,
            height,
            margins: [topMargin, leftMargin],
            distanceBetweenRows,
            perlinRatio,
            rowHeight,
            samplesPerRow,
            polarRatio,
            canvas: canvasRef.current,
            devicePixelRatio: window.devicePixelRatio,
          },
          [canvasRef.current]
        );

        hasSentCanvas.current = true;
      }
    },
    [perspective, perlinRatio, polarRatio]
  );

  return (
    <>
      <canvas
        width={width * 2}
        height={height * 2}
        style={{ width, height }}
        ref={canvasRef}
      />
    </>
  );
};

export default Slopes;
