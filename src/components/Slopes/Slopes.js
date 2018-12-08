// @flow
import React, { useRef, useEffect } from 'react';

import { renderPolylines, polylinesToSVG } from '../../vendor/polylines';
import Canvas from '../Canvas';

import generator from './Slopes.generator';
import transformParameters from './Slopes.params';

type Props = {
  width?: number,
  lineDensity: number,
};

const Slopes = ({ width = 850, perspective }: Props) => {
  const aspectRatio = 11 / 8.5;
  const height = width * aspectRatio;

  // For margins, we want a 1" margin all around.
  // I'm assuming for now that we're printing to an 8.5" x 11" paper.
  const leftMargin = (width / 8.5) * 1;
  const topMargin = (height / 11) * 1;

  const ctxRef = useRef(null);

  useEffect(
    () => {
      const context = ctxRef.current;

      // The user can tweak "high-level parameters" like spikyness, perspective,
      // etc. These values need to be reduced to low-level variables used in
      // calculation. There is not a 1:1 mapping between them: a single
      // high-level param might tweak several low-level vars, and the same
      // variable might be affected by multiple params.
      const { distanceBetweenRows } = transformParameters({
        height,
        perspective,
      });

      const lines = generator({
        width,
        height,
        margins: [topMargin, leftMargin],
        distanceBetweenRows,
      });

      console.log(polylinesToSVG(lines, { width, height }));

      renderPolylines(lines, { width, height, context });
    },
    [perspective]
  );

  return <Canvas width={width} height={height} innerRef={ctxRef} />;
};

export default Slopes;
