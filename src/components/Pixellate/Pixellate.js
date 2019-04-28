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

const drawPixellatedImage = (ctx, img, value, size, aspectRatio) => {
  // TODO: prop?
  const padding = 4;

  const maxWidth = size - padding * 2;

  const scaledWidth = normalize(value, 0, 100, 2, maxWidth);
  const scaledHeight = scaledWidth * aspectRatio;

  console.log('DRAW', scaledWidth);

  ctx.clearRect(0, 0, size, size);

  ctx.drawImage(img, padding, padding, scaledWidth, scaledHeight);
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

      // TODO: Reenable
      // const devicePixelRatio = getDevicePixelRatio();
      // ctx.scale(devicePixelRatio, devicePixelRatio);

      drawPixellatedImage(ctx, img, value, size, aspectRatio);

      setCtx(ctx);
    },
    [hasImageLoaded]
  );

  React.useEffect(
    () => {
      if (!ctx) {
        return;
      }

      drawPixellatedImage(ctx, img, value, size, aspectRatio);
    },
    [ctx, value]
  );

  const scaledCanvasProps = getScaledCanvasProps(size, size);

  return <Canvas ref={canvasRef} {...scaledCanvasProps} />;
};

const Canvas = styled.canvas``;

export default Pixellate;
