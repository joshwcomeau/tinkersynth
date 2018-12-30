// @flow
import React from 'react';

import Drop from '../../Drop';

type Props = {
  id: string,
  src: string,
  dropFrom: number,
};

const Ball = ({ id, src, bounciness, dropFrom }: Props) => {
  return (
    <Drop distance={dropFrom} bounciness={bounciness}>
      <img alt={id} src={src} />
    </Drop>
  );
};

export default Ball;
