// @flow
import React from 'react';
import { useSpring, animated } from 'react-spring/hooks';
import styled from 'styled-components';

import { COLORS } from '../../../constants';
import { range, mix } from '../../../utils';
import { getDevicePixelRatio } from '../../../helpers/canvas.helpers';
import { plotAsPolarCoordinate } from '../../Slopes/Slopes.helpers';

import Svg from '../../Svg';

type Props = {
  width: number,
  height: number,
  horizontalPadding?: number,
  verticalPadding?: number,
  numOfLines?: number,
  value: number,
  springConfig: any,
  isBroken: boolean,
};

const devicePixelRatio = getDevicePixelRatio();

const MAX_DENSITY = devicePixelRatio * 2;
const SPRING_CONFIG = {
  tension: 120,
  friction: 18,
};

const calculatePointsForLine = (value, width, height, rowIndex, numOfLines) => {
  const omegaRatio = value / 100;

  const numOfPointsPerLine = Math.ceil(width / MAX_DENSITY);

  const rowHeight = height / numOfLines;

  const rowNum = rowIndex + 1;

  const y = height * (rowNum / numOfLines) - rowHeight / 2;

  return range(numOfPointsPerLine).map(colIndex => {
    const x = colIndex * MAX_DENSITY;

    const [polarX, polarY] = plotAsPolarCoordinate({
      point: [x, y],
      width,
      height,
      sampleIndex: colIndex,
      samplesPerRow: numOfPointsPerLine,
      omegaRatio,
      omegaRadiusSubtractAmount: height,
      polarTanRatio: 0,
      polarTanMultiplier: 0,
      radiusMultiple: 0.7,
    });

    return [mix(polarX, x, omegaRatio), mix(polarY, y, omegaRatio)];
  });
};

const getPolylinePointsAsString = points =>
  points.map(point => `${point[0]},${point[1]}`).join(' ');

const getColorForLineIndex = (
  index: number,
  numOfLines: number,
  isBroken: boolean
) => {
  if (isBroken) {
    return COLORS.white;
  }

  // HACK: Refactor
  if (numOfLines === 3) {
    switch (index) {
      case 0:
        return COLORS.aqua[300];
      case 1:
        return COLORS.yellow[300];
      default:
        return COLORS.red[300];
    }
  }

  switch (index) {
    case 0:
      return COLORS.aqua[300];
    case 1:
      return COLORS.green[300];
    case 2:
      return COLORS.yellow[300];
    case 3:
      return COLORS.orange[300];
    default:
      return COLORS.red[300];
  }
};

const PolarAmountVisualization = ({
  width,
  height,
  horizontalPadding = 20,
  verticalPadding = 40,
  numOfLines = 5,
  value,
  springConfig = SPRING_CONFIG,
  isBroken,
}: Props) => {
  const innerWidth = width - horizontalPadding;
  const innerHeight = height - verticalPadding;

  const spring = useSpring({ value, config: springConfig });

  return (
    <Svg width={innerWidth} height={innerHeight} fill="none">
      {range(numOfLines).map(rowIndex => (
        <animated.polyline
          key={rowIndex}
          points={spring.value.interpolate(value => {
            const line = calculatePointsForLine(
              value,
              innerWidth,
              innerHeight,
              rowIndex,
              numOfLines
            );
            return getPolylinePointsAsString(line);
          })}
          stroke={getColorForLineIndex(rowIndex, numOfLines, isBroken)}
          strokeWidth={devicePixelRatio > 1 ? 2.5 : 2}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
};

export default PolarAmountVisualization;
