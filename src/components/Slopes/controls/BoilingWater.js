// @flow
import React from 'react';

import { COLORS } from '../../../constants';
import { createSvgPathForCurve } from '../../../helpers/line.helpers';
import { normalize } from '../../../utils';
import createNoiseGenerator from '../../../vendor/noise';

import type { Bezier } from '../../../types';

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

  const startPointY =
    normalize(
      perlin2(value * PERLIN_MULTIPLE, perlinRow),
      -1,
      1,
      top - 3 * ratio,
      top + 3 * ratio
    ) + boiledAwayOffset;
  const controlPoint1X = normalize(
    perlin2(value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS, perlinRow),
    -1,
    1,
    left + 2,
    left + 5
  );
  const controlPoint1Y =
    normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS,
        perlinRow
      ),
      -1,
      1,
      top - 6 * ratio,
      top + 6 * ratio
    ) + boiledAwayOffset;
  const controlPoint2X = normalize(
    perlin2(
      value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 2,
      perlinRow
    ),
    -1,
    1,
    left + width - 5,
    left + width
  );
  const controlPoint2Y = Math.min(
    normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 2,
        perlinRow
      ),
      -1,
      1,
      top - 2 * ratio,
      top + 10 * ratio
    ) + boiledAwayOffset,
    top + height
  );

  const endPointY =
    normalize(
      perlin2(
        value * PERLIN_MULTIPLE + PERLIN_OFFSET_BETWEEN_POINTS * 3,
        perlinRow
      ),
      -1,
      1,
      top - 4 * ratio,
      top + 4 * ratio
    ) + boiledAwayOffset;

  const waterCurve = {
    startPoint: [left, startPointY],
    controlPoint1: [controlPoint1X, controlPoint1Y],
    controlPoint2: [controlPoint2X, controlPoint2Y],
    endPoint: [left + width, endPointY],
  };

  const curvePath = createSvgPathForCurve(waterCurve);

  const closedPath = `
    ${curvePath}
    V ${top + height}
    H ${left}
    V ${startPointY}
    Z`;

  return (
    <path
      d={closedPath}
      fill={color}
      stroke={color}
      strokeWidth={1}
      strokeLinejoin="round"
    />
  );
};

// $FlowIgnore
export default React.memo(BoilingWater);
