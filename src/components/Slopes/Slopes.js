// @flow
import React, { useRef, useEffect } from 'react';

import renderPolylines from '../../vendor/render-polylines';
import Canvas from '../Canvas';

import generator from './Slopes.generator';

type Props = {
  width?: number,
  lineDensity: number,
};

const Slopes = ({ width = 850, lineDensity }: Props) => {
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

      const lines = generator({
        width,
        height,
        margins: [topMargin, leftMargin],
        lineDensity,
      });

      renderPolylines(lines, { width, height, context });
    },
    [lineDensity]
  );

  return <Canvas width={width} height={height} innerRef={ctxRef} />;
};

export default Slopes;
