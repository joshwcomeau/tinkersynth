// @flow
import React from 'react';
import { useSpring, animated, interpolate } from 'react-spring/hooks';

import { createSvgPathForCurve } from '../../../helpers/line.helpers';
import { normalize } from '../../../utils';
import createNoiseGenerator from '../../../vendor/noise';

const { perlin2 } = createNoiseGenerator(9);

type Props = {
  value: number,
  color: string,
  top: number,
  left: number,
  width: number,
  height: number,
  perlinRow: number,
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
}: Props) => {
  const boiledAwayOffset = value * 0.075;

  const ratio = value / 100;

  const spring = useSpring({
    config: SPRING_CONFIG,
    sx: left,
    sy:
      normalize(
        perlin2(value * PERLIN_MULTIPLE, perlinRow),
        -1,
        1,
        top - 5 * ratio,
        top + 5 * ratio
      ) + boiledAwayOffset,
    c1x: normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS,
        perlinRow
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
          perlinRow
        ),
        -1,
        1,
        top - 8 * ratio,
        top + 8 * ratio
      ) + boiledAwayOffset,
    c2x: normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 2,
        perlinRow
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
          perlinRow
        ),
        -1,
        1,
        top - 5 * ratio,
        top + 10 * ratio
      ) + boiledAwayOffset,
      top + height
    ),
    ex: left + width,
    ey:
      normalize(
        perlin2(
          value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 3,
          perlinRow
        ),
        -1,
        1,
        top - 4 * ratio,
        top + 4 * ratio
      ) + boiledAwayOffset,
  });

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
            startPoint: [sx, sy],
            controlPoint1: [c1x, c1y],
            controlPoint2: [c2x, c2y],
            endPoint: [ex, ey],
          };

          const curvePath = createSvgPathForCurve(curve);

          return `
            ${curvePath}
            V ${top + height}
            H ${left}
            V ${sy}
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
