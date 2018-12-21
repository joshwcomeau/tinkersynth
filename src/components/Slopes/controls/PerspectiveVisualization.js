// @flow
import React, { useState, useEffect, useRef } from 'react';

import { mix, normalize } from '../../../utils';
import { getScaledCanvasProps } from '../../../helpers/canvas.helpers';

const STARTING_BOX = {
  top: 2 / 10,
  left: 2 / 10,
  width: 6 / 10,
  height: 6 / 10,
};

const ENDING_BOX = {
  top: 3 / 10,
  left: 5 / 10,
  width: 4 / 10,
  height: 2 / 10,
};

const useVisualization = (ctx, width, height, value) => {
  if (!ctx) {
    return;
  }
  // This visualization features a look down a hallway.
  // The hallway is symmetrical horizontally, but becomes asymmetrical
  // vertically as the value increases.
  const boxTop = mix(ENDING_BOX.top, STARTING_BOX.top, value / 100) * height;
  const boxLeft = mix(ENDING_BOX.left, STARTING_BOX.left, value / 100) * width;
  const boxWidth =
    mix(ENDING_BOX.width, STARTING_BOX.width, value / 100) * width;
  const boxHeight =
    mix(ENDING_BOX.height, STARTING_BOX.height, value / 100) * height;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'hotpink';
  ctx.strokeRect(boxTop, boxLeft, boxWidth, boxHeight);
};

const PerspectiveVisualization = ({ width, height, value }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;

    ctx.scale(devicePixelRatio, devicePixelRatio);

    setCtx(ctx);
  }, []);

  const scaledCanvasValues = getScaledCanvasProps(width, height);

  useVisualization(ctx, width, height, value);

  return <canvas ref={canvasRef} {...scaledCanvasValues} />;
};

export default PerspectiveVisualization;
