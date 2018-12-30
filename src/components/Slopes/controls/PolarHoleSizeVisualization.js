// @flow
import React from 'react';

import baseballSrc from '../../../assets/baseball.svg';
import basketballSrc from '../../../assets/basketball.svg';
import pingpongballSrc from '../../../assets/pingpongball.svg';
import beachballSrc from '../../../assets/beachball.svg';
import tennisballSrc from '../../../assets/tennisball.svg';

import Ball from './Ball';

type Props = {
  size: number,
  value: number,
};

const getDataForValue = (value: number) => {
  if (value < 20) {
    return { id: 'pingpong', src: pingpongballSrc, dropFrom: 20 };
  } else if (value < 40) {
    return { id: 'tennis', src: tennisballSrc, dropFrom: 16 };
  } else if (value < 60) {
    return { id: 'baseball', src: baseballSrc, dropFrom: 12 };
  } else if (value < 80) {
    return { id: 'basketball', src: basketballSrc, dropFrom: 7 };
  } else {
    return { id: 'beachball', src: beachballSrc, dropFrom: 5 };
  }
};

const PolarHoleSizeVisualization = ({ size, value }: Props) => {
  // Size is unused, because I'm lazy. Ideally it should size the images
  // according to the prop, but I made all the images assuming they'd be 32px.

  const { id, src, dropFrom } = getDataForValue(value);

  return <Ball key={id} src={src} dropFrom={dropFrom} />;
};

export default PolarHoleSizeVisualization;
