// @flow
import React from 'react';

import Drop from '../../Drop';

type Props = {
  id: string,
  src: string,
  bounciness: number,
  squishiness: number,
  gravity: number,
  dropFrom: number,
  isAnimated: boolean,
};

const Ball = ({
  id,
  src,
  bounciness,
  gravity,
  squishiness,
  dropFrom,
  isAnimated,
}: Props) => {
  const img = <img alt={id} src={src} />;

  if (!isAnimated) {
    return img;
  }

  return (
    <Drop
      distance={dropFrom}
      bounciness={bounciness}
      squishiness={squishiness}
      gravity={gravity}
    >
      {img}
    </Drop>
  );
};

export default Ball;
