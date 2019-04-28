// @flow
import React from 'react';
import styled from 'styled-components';

import catSrc from '../../images/cat.png';

type Props = {
  amount: number,
};

// const useImage = src => {
//   const [hasImageLoaded, setHasImageLoaded] = React.useState(false);
//   const img = React.useRef(null);

//   // On mount, load the image
//   React.useEffect(() => {
//     img.current = new Image();

//     img.current.addEventListener(
//       'load',
//       () => {
//         setHasImageLoaded(true);
//       },
//       false
//     );
//     img.current.src = catSrc;
//   }, []);

//   return [img.current, hasImageLoaded];
// };

const useImage = src => {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;

    setImage(img);
  }, []);

  return image;
};

const Pixellate = ({ amount }) => {
  const canvasRef = React.createRef(null);
  const ctxRef = React.createRef(null);

  const img = useImage(catSrc);

  React.useEffect(
    () => {
      if (!img) {
        return;
      }

      ctxRef.current = canvasRef.current.getContext('2d');

      ctxRef.current.drawImage(img, 0, 0);
    },
    [img]
  );

  React.useEffect(() => {}, []);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas``;

export default Pixellate;
