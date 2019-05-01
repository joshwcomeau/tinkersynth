// @flow
import React, { useEffect } from 'react';
import ImageCache from '../../../vendor/image-cache';

import baseballSrc from '../../../images/baseball.svg';
import basketballSrc from '../../../images/basketball.svg';
import pingpongballSrc from '../../../images/pingpongball.svg';
import beachballSrc from '../../../images/beachball.svg';
import tennisballSrc from '../../../images/tennisball.svg';

import Ball from './Ball';

const images = [
  baseballSrc,
  basketballSrc,
  pingpongballSrc,
  beachballSrc,
  tennisballSrc,
];

type Props = {
  size: number,
  value: number,
  isAnimated: boolean,
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
      bounciness: 0.8,
      gravity: 0.25,
      squishiness: 1.4,
    };
  } else {
    return {
      id: 'beachball',
      src: beachballSrc,
      dropFrom: 5,
      bounciness: 0.7,
      gravity: 0.1,
      squishiness: 1.6,
    };
  }
};

const BallSizeVisualization = ({ size, value, isAnimated }: Props) => {
  // Size is unused, because I'm lazy. Ideally it should size the images
  // according to the prop, but I made all the images assuming they'd be 32px.

  // On mount, wait a little bit and then preload all ball images used in
  // this visualization.
  // We want to preload them so that there's no gap between ball-drops when
  // moving the slider.
  // We want to wait a bit so that we aren't fetching and processing the images
  // during the hectic first couple seconds after initial mount.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      ImageCache.stuff(images);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

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
      isAnimated={isAnimated}
    />
  );
};

export default BallSizeVisualization;
