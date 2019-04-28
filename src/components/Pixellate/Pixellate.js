// @flow
import React from 'react';
import styled from 'styled-components';

import {
  getScaledCanvasProps,
  getDevicePixelRatio,
} from '../../helpers/canvas.helpers';
import { getValuesForBezierCurve } from '../../helpers/line.helpers';
import { normalize } from '../../utils';

type Props = {
  size: number,
  aspectRatio: number,
  value: number,
  src: string,
};

const Pixellate = ({ size, aspectRatio, value, src }: Props) => {
  const canvasRef = React.useRef(null);

  const [ctx, setCtx] = React.useState(null);

  const workCanvasCtx = useWorkCanvas(size);

  const [img, hasImageLoaded] = useImage(src);

  React.useEffect(
    () => {
      if (!hasImageLoaded || !canvasRef.current) {
        return;
      }

      const ctx = canvasRef.current.getContext('2d');

      ctx.msImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      drawPixellatedImage(ctx, img, value, size, aspectRatio, workCanvasCtx);

      setCtx(ctx);
    },
    [hasImageLoaded]
  );

  React.useEffect(
    () => {
      if (!ctx) {
        return;
      }

      drawPixellatedImage(ctx, img, value, size, aspectRatio, workCanvasCtx);
    },
    [ctx, value]
  );

  const scaledCanvasProps = getScaledCanvasProps(size, size);

  return <canvas ref={canvasRef} {...scaledCanvasProps} />;
};

const useImage = src => {
  const [hasImageLoaded, setHasImageLoaded] = React.useState(false);
  const img = React.useRef(null);

  // On mount, load the image
  React.useEffect(() => {
    img.current = new Image();

    img.current.addEventListener(
      'load',
      () => {
        setHasImageLoaded(true);
      },
      false
    );
    img.current.src = src;
  }, []);

  return [img.current, hasImageLoaded];
};

const useWorkCanvas = size => {
  const [workCanvasCtx] = React.useState(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const dpr = getDevicePixelRatio();

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    return ctx;
  });

  return workCanvasCtx;
};

const drawPixellatedImage = (
  ctx,
  img,
  value,
  size,
  aspectRatio,
  workCanvasCtx
) => {
  // TODO: prop?
  const padding = 4;

  const sizeForDevice = size * (window.devicePixelRatio || 1);

  const maxWidth = sizeForDevice - padding * 2;

  const [, curvedValue] = getValuesForBezierCurve(
    {
      startPoint: [1, 0],
      endPoint: [1, 1],
      controlPoint1: [0, 0],
    },
    value / 100
  );

  const scaledWidth = normalize(curvedValue, 0, 1, 2, maxWidth);

  const scaledHeight = scaledWidth * aspectRatio;

  workCanvasCtx.clearRect(0, 0, sizeForDevice, sizeForDevice);
  ctx.clearRect(0, 0, sizeForDevice, sizeForDevice);

  // Draw a tiny image into the canvas
  // $FlowIgnore
  workCanvasCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

  // Scale that tiny version up
  ctx.drawImage(
    workCanvasCtx.canvas,
    0,
    0,
    scaledWidth,
    scaledHeight,
    padding,
    padding,
    maxWidth,
    maxWidth * aspectRatio
  );
};

export default Pixellate;
