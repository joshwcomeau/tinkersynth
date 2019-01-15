// @flow
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import {
  getScaledCanvasProps,
  getDevicePixelRatio,
} from '../../../helpers/canvas.helpers';
import { normalize, mix } from '../../../utils';

const RESOLUTION = 2;

// Start fading the static in at 50% up the range.
const startAppearingAtValue = 50;

const StaticNoise = ({ value, size }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(
    () => {
      if (!canvasRef) {
        console.warn('No canvas ref recorded :/');
        return;
      }

      // TODO: Should I use an offscreen canvas?
      if (!contextRef.current) {
        contextRef.current = canvasRef.current.getContext('2d');

        const devicePixelRatio = getDevicePixelRatio();

        contextRef.current.scale(devicePixelRatio, devicePixelRatio);
      }

      const ctx = contextRef.current;

      const maxNumOfCells = size / RESOLUTION;

      ctx.clearRect(0, 0, size, size);

      // No sense painting all the noise if it isn't visible!
      if (value < startAppearingAtValue) {
        return;
      }

      const alpha = normalize(value, startAppearingAtValue, 100, 0, 1);

      for (let rowIndex = 0; rowIndex < maxNumOfCells; rowIndex++) {
        const lineBrightness = Math.round(Math.random() * 255);
        for (let colIndex = 0; colIndex < maxNumOfCells; colIndex++) {
          const cellBrightness = Math.round(Math.random() * 255);
          const brightness = mix(lineBrightness, cellBrightness);
          ctx.fillStyle = `
            rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})
          `;

          ctx.fillRect(
            colIndex * RESOLUTION,
            rowIndex * RESOLUTION,
            RESOLUTION,
            RESOLUTION
          );
        }
      }
    },
    [value]
  );

  const scaledCanvasProps = getScaledCanvasProps(size, size);

  return <Canvas ref={canvasRef} {...scaledCanvasProps} />;
};

const Canvas = styled.canvas`
  display: block;
`;

export default StaticNoise;
