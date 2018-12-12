// @flow
import React, { useRef, useEffect, useMemo } from 'react';

import { renderPolylines } from '../../vendor/polylines';
import Canvas from '../Canvas';

import generator from './Slopes.generator';
import transformParameters from './Slopes.params';

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

  return null;

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

  const ctxRef = useRef(null);

  const lines = generator({
    width,
    height,
    margins: [topMargin, leftMargin],
    distanceBetweenRows,
    perlinRatio,
    rowHeight,
    samplesPerRow,
    polarRatio,
  });

  useEffect(
    () => {
      const context = ctxRef.current;

      renderPolylines(lines, {
        width,
        height,
        context,
      });
    },
    [perspective, perlinRatio, polarRatio]
  );

  return (
    <>
      <Canvas width={width} height={height} innerRef={ctxRef} />
    </>
  );
};

export default Slopes;
