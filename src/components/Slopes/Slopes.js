// @flow
import React, { useRef, useEffect } from 'react';

import renderPolylines from '../../vendor/render-polylines';
import Canvas from '../Canvas';

import generator from './Slopes.generator';

type Props = {
  width: number,
  height: number,
};

const Slopes = ({ width, height }: Props) => {
  const ctxRef = useRef(null);

  useEffect(() => {
    const context = ctxRef.current;

    const lines = generator({ width, height });

    renderPolylines(lines, { width, height, context });
  }, []);

  return <Canvas width={width} height={height} innerRef={ctxRef} />;
};

export default Slopes;
