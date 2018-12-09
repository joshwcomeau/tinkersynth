// @flow
import React, { useRef, useEffect, useMemo } from 'react';

import { renderPolylines } from '../../vendor/polylines';
import Canvas from '../Canvas';

import generator from './Slopes.generator';
import transformParameters from './Slopes.params';

type Props = {
  width: number,
  height: number,
  topMargin: number,
  leftMargin: number,
  perspective: number,
  spikyness: number,
};

const Slopes = ({
  width,
  height,
  topMargin,
  leftMargin,
  perspective,
  spikyness,
}: Props) => {
  // The user can tweak "high-level parameters" like spikyness, perspective,
  // etc. These values need to be reduced to low-level variables used in
  // calculation. There is not a 1:1 mapping between them: a single
  // high-level param might tweak several low-level vars, and the same
  // variable might be affected by multiple params.
  const { distanceBetweenRows, perlinRatio } = transformParameters({
    height,
    perspective,
    spikyness,
  });

  const ctxRef = useRef(null);

  const lines = generator({
    width,
    height,
    margins: [topMargin, leftMargin],
    distanceBetweenRows,
    perlinRatio,
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
    [width, perspective, perlinRatio]
  );

  return (
    <>
      <Canvas width={width} height={height} innerRef={ctxRef} />
    </>
  );
};

export default Slopes;
