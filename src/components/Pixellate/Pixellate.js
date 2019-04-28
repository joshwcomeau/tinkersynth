// @flow
import React from 'react';
import styled from 'styled-components';

import {
  getScaledCanvasProps,
  getDevicePixelRatio,
} from '../../helpers/canvas.helpers';

type Props = {
  size: number,
  value: number,
  src: string,
  imagePositionValues: [number, number, number, number],
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

const Pixellate = ({ size, value, src, imagePositionValues }) => {
  const canvasRef = React.createRef(null);
  const ctxRef = React.createRef(null);

  const [img, hasImageLoaded] = useImage(src);

  React.useEffect(
    () => {
      if (!hasImageLoaded || !canvasRef.current) {
        return;
      }

      ctxRef.current = canvasRef.current.getContext('2d');
      const ctx = ctxRef.current;

      const devicePixelRatio = getDevicePixelRatio();

      ctx.scale(devicePixelRatio, devicePixelRatio);

      ctx.drawImage(img, ...imagePositionValues);
    },
    [hasImageLoaded]
  );

  const scaledCanvasProps = getScaledCanvasProps(size, size);

  return <Canvas ref={canvasRef} {...scaledCanvasProps} />;
};

const Canvas = styled.canvas``;

export default Pixellate;
