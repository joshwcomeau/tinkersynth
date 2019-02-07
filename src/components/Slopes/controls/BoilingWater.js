// @flow
import React from 'react';
import { useSpring, animated, interpolate } from 'react-spring/hooks';

import { createSvgPathForCurve } from '../../../helpers/line.helpers';
import { normalize, clamp } from '../../../utils';
import createNoiseGenerator from '../../../vendor/noise';

const { perlin2 } = createNoiseGenerator(16);

type Props = {
  value: number,
  color: string,
  top: number,
  left: number,
  width: number,
  height: number,
  perlinRow: number,
  isAnimated: boolean,
};

const PERLIN_MULTIPLE = 0.25;
const PERLIN_OFFSET_BETWEEN_POINTS = 0.2;

const SPRING_CONFIG = {
  tension: 192,
  friction: 9,
};

const BoilingWater = ({
  value,
  color,
  top,
  left,
  width,
  height,
  perlinRow,
  isAnimated,
}: Props) => {
  const boiledAwayOffset = value * 0.075;

  const ratio = value / 100;

  const spring = useSpring({
    config: SPRING_CONFIG,
    immediate: !isAnimated,
    sx: left,
    sy:
      normalize(
        perlin2(value * PERLIN_MULTIPLE, perlinRow),
        -1,
        1,
        top - 10 * ratio,
        top + 12 * ratio
      ) + boiledAwayOffset,
    c1x: normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS,
        perlinRow * 10
      ),
      -1,
      1,
      left + 2,
      left + 6
    ),
    c1y:
      normalize(
        perlin2(
          value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS,
          perlinRow * 10
        ),
        -1,
        1,
        top - 8 * ratio,
        top + 16 * ratio
      ) + boiledAwayOffset,
    c2x: normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 2,
        perlinRow * 100
      ),
      -1,
      1,
      left + width - 8,
      left + width
    ),
    c2y: Math.min(
      normalize(
        perlin2(
          value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 2,
          perlinRow * 100
        ),
        -1,
        1,
        top - 15 * ratio,
        top + 10 * ratio
      ) + boiledAwayOffset,
      top + height
    ),
    ex: left + width,
    ey: clamp(
      normalize(
        perlin2(
          value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 3,
          perlinRow * 1000
        ),
        -1,
        1,
        top - 12 * ratio,
        top + 10 * ratio
      ) + boiledAwayOffset,
      0,
      top
    ),
  });

  const limiter = val => clamp(val, 0, top + height);

  return (
    <animated.path
      d={interpolate(
        [
          spring.sx,
          spring.sy,
          spring.c1x,
          spring.c1y,
          spring.c2x,
          spring.c2y,
          spring.ex,
          spring.sy,
        ],
        (sx, sy, c1x, c1y, c2x, c2y, ex, ey) => {
          const curve = {
            startPoint: [limiter(sx), limiter(sy)],
            controlPoint1: [limiter(c1x), limiter(c1y)],
            controlPoint2: [limiter(c2x), limiter(c2y)],
            endPoint: [limiter(ex), limiter(ey)],
          };

          const curvePath = createSvgPathForCurve(curve);

          return `
            ${curvePath}
            V ${top + height}
            H ${left}
            V ${limiter(sy)}
            Z`;
        }
      )}
      fill={color}
      stroke={color}
      strokeWidth={1}
      strokeLinejoin="round"
    />
  );
};

// $FlowIgnore
export default BoilingWater;
