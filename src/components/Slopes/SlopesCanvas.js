// @flow
import React, { useRef, useEffect, useContext } from 'react';

import { COLORS } from '../../constants';
import { clamp, mix, normalize } from '../../utils';
import {
  getScaledCanvasProps,
  getDevicePixelRatio,
} from '../../helpers/canvas.helpers';
import useCanvas from '../../hooks/canvas.hook';
import {
  renderPolylines,
  polylinesToSVG,
} from '../../services/polylines.service';

import transformParameters from './Slopes.params';
import SlopesWorker from './SlopesCanvas.worker';
import { getRenderOptions } from './SlopesCanvas.helpers';

import type { RenderImageKind } from '../../types';

type Props = {
  width: number,
  height: number,
  kind: RenderImageKind,
};

const SlopesCanvas = ({ width, height, kind, ...params }: Props) => {
  const { style, ...dimensions } = getScaledCanvasProps(width, height);
  const devicePixelRatio = getDevicePixelRatio();

  // The user can tweak "high-level parameters" like spikyness, perspective,
  // etc. These values need to be reduced to low-level variables used in
  // calculation. There is not a 1:1 mapping between them: a single
  // high-level param might tweak several low-level vars, and the same
  // variable might be affected by multiple params.
  const drawingVariables = transformParameters({
    width,
    height,
    ...params,
  });

  // `messageData` is everything specific to SlopesCanvas, and not stuff that
  // would be automatically passed by the generic OffscreenCanvas hook.
  const messageData = {
    width,
    height,
    kind,
    ...drawingVariables,
  };

  const { canvasRef } = useCanvas(
    SlopesWorker,
    messageData,
    (context, data) => {
      const { rows, ...passedData } = data;

      if (!rows) {
        return;
      }

      renderPolylines(
        rows,
        context,
        getRenderOptions(width, height, kind, passedData)
      );
    }
  );

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

// $FlowIgnore
export default React.memo(SlopesCanvas);
