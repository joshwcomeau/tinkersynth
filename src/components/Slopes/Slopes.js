// @flow
import React, { useRef, useEffect, useMemo } from 'react';

import { renderPolylines } from '../../vendor/polylines';
import Canvas from '../Canvas';
import SvgShortcutModal from '../SvgShortcutModal';

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

  // The user can tweak "high-level parameters" like spikyness, perspective,
  // etc. These values need to be reduced to low-level variables used in
  // calculation. There is not a 1:1 mapping between them: a single
  // high-level param might tweak several low-level vars, and the same
  // variable might be affected by multiple params.

  const { distanceBetweenRows } = transformParameters({
    height,
    perspective,
  });

  const lines = useMemo(
    () =>
      generator({
        width,
        height,
        margins: [topMargin, leftMargin],
        distanceBetweenRows,
      }),
    [width, perspective]
  );

  useEffect(
    () => {
      const context = ctxRef.current;

      renderPolylines(lines, {
        width,
        height,
        context,
      });
    },
    [width, perspective]
  );

  return (
    <>
      <Canvas width={width} height={height} innerRef={ctxRef} />
      <SvgShortcutModal width={width} height={height} lines={lines} />
    </>
  );
};

export default Slopes;
