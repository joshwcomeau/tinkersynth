// @flow
import React from 'react';

type Props = {
  src: string,
  dropFrom: number,
};

const Ball = ({ id, src, dropFrom }: Props) => {
  return <img alt={id} src={src} />;
};

export default Ball;
