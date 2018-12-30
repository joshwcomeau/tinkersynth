// @flow
import React from 'react';
import { useSpring, animated } from 'react-spring/hooks';

type Props = {
  id: string,
  src: string,
  dropFrom: number,
};

const Ball = ({ id, src, dropFrom }: Props) => {
  const spring = useSpring({
    distance: 0,
    from: { distance: dropFrom },
  });

  return (
    <animated.img
      alt={id}
      src={src}
      style={{
        transform: spring.distance.interpolate(d => `translateY(-${d}px)`),
      }}
    />
  );
};

export default Ball;
