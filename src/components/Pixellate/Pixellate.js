// @flow
import React from 'react';
import styled from 'styled-components';

import {
  getScaledCanvasProps,
  getDevicePixelRatio,
} from '../../helpers/canvas.helpers';
import { normalize } from '../../utils';

type Props = {
  size: number,
  aspectRatio: number,
  value: number,
  src: string,
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

const drawPixellatedImage = (canvas, ctx, img, value, size, aspectRatio) => {
  // TODO: prop?
  const padding = 4;

  const calculateCanvas = document.createElement('canvas');
  calculateCanvas.width = size * window.devicePixelRatio;
  calculateCanvas.height = size * window.devicePixelRatio;
  const calcCtx = calculateCanvas.getContext('2d');

  const maxWidth = size * window.devicePixelRatio - padding * 2;

  const scaledWidth = normalize(value, 0, 100, 2, maxWidth);
  const scaledHeight = scaledWidth * aspectRatio;

  calcCtx.clearRect(
    0,
    0,
    size * window.devicePixelRatio,
    size * window.devicePixelRatio
  );
  ctx.clearRect(
    0,
    0,
    size * window.devicePixelRatio,
    size * window.devicePixelRatio
  );

  // Draw a tiny image into the canvas
  calcCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

  // Scale that tiny version up
  ctx.drawImage(
    calculateCanvas,
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

const Pixellate = ({ size, aspectRatio, value, src }: Props) => {
  const canvasRef = React.createRef(null);
  const [ctx, setCtx] = React.useState(null);

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

      // const devicePixelRatio = getDevicePixelRatio();
      // ctx.scale(devicePixelRatio, devicePixelRatio);

      drawPixellatedImage(
        canvasRef.current,
        ctx,
        img,
        value,
        size,
        aspectRatio
      );

      setCtx(ctx);
    },
    [hasImageLoaded]
  );

  React.useEffect(
    () => {
      if (!ctx) {
        return;
      }

      drawPixellatedImage(
        canvasRef.current,
        ctx,
        img,
        value,
        size,
        aspectRatio
      );
    },
    [ctx, value]
  );

  const scaledCanvasProps = getScaledCanvasProps(size, size);

  return <Canvas ref={canvasRef} {...scaledCanvasProps} />;
};

const Canvas = styled.canvas``;

export default Pixellate;
