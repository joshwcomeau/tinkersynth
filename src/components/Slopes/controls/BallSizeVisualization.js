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
    return {
      id: 'pingpong',
      src: pingpongballSrc,
      dropFrom: 20,
      bounciness: 0.6,
      gravity: 0.1,
      squishiness: 1.5,
    };
  } else if (value < 40) {
    return {
      id: 'tennis',
      src: tennisballSrc,
      dropFrom: 16,
      bounciness: 0.6,
      gravity: 0.175,
      squishiness: 1.3,
    };
  } else if (value < 60) {
    return {
      id: 'baseball',
      src: baseballSrc,
      dropFrom: 12,
      bounciness: 0.4,
      gravity: 0.2,
      squishiness: 1.1,
    };
  } else if (value < 80) {
    return {
      id: 'basketball',
      src: basketballSrc,
      dropFrom: 7,
      bounciness: 0.85,
      gravity: 0.25,
      squishiness: 1.4,
    };
  } else {
    return {
      id: 'beachball',
      src: beachballSrc,
      dropFrom: 5,
      bounciness: 0.75,
      gravity: 0.1,
      squishiness: 1.6,
    };
  }
};

const BallSizeVisualization = ({ size, value }: Props) => {
  // Size is unused, because I'm lazy. Ideally it should size the images
  // according to the prop, but I made all the images assuming they'd be 32px.

  const {
    id,
    src,
    dropFrom,
    bounciness,
    squishiness,
    gravity,
  } = getDataForValue(value);

  return (
    <Ball
      key={id}
      id={id}
      src={src}
      dropFrom={dropFrom}
      bounciness={bounciness}
      squishiness={squishiness}
      gravity={gravity}
    />
  );
};

export default BallSizeVisualization;
