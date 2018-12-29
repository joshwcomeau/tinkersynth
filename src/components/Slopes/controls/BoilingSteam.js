// @flow
import React, { useState } from 'react';
import { useSpring, animated, interpolate } from 'react-spring/hooks';

import { normalize } from '../../../utils';
import createNoiseGenerator from '../../../vendor/noise';

const { perlin2 } = createNoiseGenerator(9);

type Props = {
  value: number,
  strength: number,
  offset: number,
};

const SPRING_CONFIG = {
  tension: 15,
  friction: 6,
};

const BoilingSteam = ({ value, strength = 0.01, offset }: Props) => {
  const ratio = value / 100;

  const [isMidTransition, setIsMidTransition] = useState(false);

  const opacity = ratio;

  const spring = useSpring({
    config: SPRING_CONFIG,
    after: {
      style: 'border: 10px solid red',
    },
    sx: normalize(
      perlin2(value * 0.02, offset + 0.25) * strength,
      -1,
      1,
      0,
      32
    ),
    c1x: normalize(
      perlin2(value * 0.02, offset + 0.5) * strength,
      -1,
      1,
      8,
      24
    ),
    c1y: normalize(
      perlin2(value * 0.02, offset + 0.75) * strength,
      -1,
      1,
      4,
      12
    ),
    c2x: normalize(perlin2(value * 0.02, offset + 1) * strength, -1, 1, 4, 28),
    c2y: normalize(
      perlin2(value * 0.02, offset + 1.25) * strength,
      -1,
      1,
      12,
      18
    ),
    ex: normalize(
      perlin2(value * 0.0214, offset + 1.5) * strength,
      -1,
      1,
      12,
      20
    ),
  });

  const renderPath = (sx, c1x, c1y, c2x, c2y, ex) => `
    M ${sx},0
    C ${c1x},${c1y} ${c2x},${c2y} ${ex},18
  `;

  return (
    <animated.path
      d={interpolate(
        [spring.sx, spring.c1x, spring.c1y, spring.c2x, spring.c2y, spring.ex],
        renderPath
      )}
      fill="none"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth={2}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

// $FlowIgnore
export default React.memo(BoilingSteam);
