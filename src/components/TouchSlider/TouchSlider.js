// @flow
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';
import { getScaledCanvasProps } from '../../helpers/canvas.helpers';
import useBoundingBox from '../../hooks/bounding-box.hook';

import { generateDotCoords } from './TouchSlider.helpers';

type Props = {
  value: number,
  updateValue: (num: number) => void,
  // Sliders work on a scale of 0-100 by default
  min: number,
  max: number,
  width: number,
  height: number,
  // Aesthetic choices
  dotSize: number,
};

const useOffscreenCanvasIfAvailable = (
  canvasRef,
  devicePixelRatio,
  width,
  height,
  props
) => {
  const supportsOffscreenCanvas = 'OffscreenCanvas' in window;

  const contextRef = useRef(null);

  // On mount
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // If the browser supports it, we want to allow the canvas to be painted
    // off of the main thread.
    if (supportsOffscreenCanvas) {
      canvasRef.current = canvasRef.current.transferControlToOffscreen();
    }

    contextRef.current = canvasRef.current.getContext('2d');
    contextRef.current.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, []);

  // On every update
  useEffect(() => {
    const ctx = contextRef.current;

    if (!ctx) {
      return;
    }

    const { value, max, dotSize } = props;

    const dotCoords = generateDotCoords(width, height, dotSize);

    const numToDisplay = Math.round(dotCoords.length * (value / max)) || 1;

    ctx.clearRect(0, 0, width, height);

    dotCoords.slice(0, numToDisplay).forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    });
  });
};

const TouchSlider = (props: Props) => {
  const { updateValue, min, max, width, height } = props;

  const [ref, boundingBox] = useBoundingBox();
  const canvasRef = useRef(null);

  const scaledCanvasProps = getScaledCanvasProps(width, height);

  useOffscreenCanvasIfAvailable(
    canvasRef,
    window.devicePixelRatio,
    width,
    height,
    props
  );

  const calculateAndSetNewValue = ev => {
    if (!boundingBox) {
      return;
    }

    // Figure out what value this click represents, from 0-100.
    // We want to make it easier to select edge values (0 and 100), so we'll
    // pad it a bit
    const CLICK_PADDING_AMOUNT = 8;
    const paddedBoundingBox = {
      left: boundingBox.left + CLICK_PADDING_AMOUNT,
      width: boundingBox.width - CLICK_PADDING_AMOUNT * 2,
    };
    const relativeLeft = ev.clientX - paddedBoundingBox.left;
    const ratio = clamp(relativeLeft / paddedBoundingBox.width, 0, 1);

    const newValue = normalize(ratio, 0, 1, min, max);

    updateValue(newValue);
  };

  return (
    <div ref={ref}>
      <Canvas
        ref={canvasRef}
        {...scaledCanvasProps}
        onMouseDown={calculateAndSetNewValue}
        onMouseMove={ev => {
          if (ev.buttons === 1) {
            calculateAndSetNewValue(ev);
          }
        }}
      />
    </div>
  );
};

TouchSlider.defaultProps = {
  min: 0,
  max: 100,
};

const Canvas = styled.canvas`
  cursor: pointer;
`;

export default TouchSlider;
