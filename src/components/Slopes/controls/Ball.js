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
};

const Ball = ({
  id,
  src,
  bounciness,
  gravity,
  squishiness,
  dropFrom,
}: Props) => {
  return (
    <Drop
      distance={dropFrom}
      bounciness={bounciness}
      squishiness={squishiness}
      gravity={gravity}
    >
      <img alt={id} src={src} />
    </Drop>
  );
};

export default Ball;
