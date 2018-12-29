// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';
import { plotAsPolarCoordinate } from '../../Slopes/Slopes.helpers';
import { normalize, range, convertPolarToCartesian, mix } from '../../../utils';

import Svg from '../../Svg';

type Props = {
  width: number,
  height: number,
  value: number,
};

// TODO: Base this off window.devicePixelRatio?
const MAX_DENSITY = 4;

const calculateLinePoints = (value, width, height, numOfLines = 5) => {
  const omegaRatio = value / 100;

  const lineIndexes = range(numOfLines);

  // const numOfPointsPerLine = Math.floor(
  //   mix(6, width / MAX_DENSITY, omegaRatio)
  // );
  const numOfPointsPerLine = Math.round(width / MAX_DENSITY);

  const rowHeight = height / numOfLines;

  const points = lineIndexes.map(rowIndex => {
    const rowNum = rowIndex + 1;
    // Our `y` value, to be used for cartesian coordinates

    const y = height * (rowNum / numOfLines) - rowHeight / 2;

    // // We also calculate polar coordinates, to mix between.
    // const radius = (height / 2) * (rowNum / numOfLines);

    return range(numOfPointsPerLine).map(colIndex => {
      const x = colIndex * MAX_DENSITY;

      const [polarX, polarY] = plotAsPolarCoordinate({
        point: [x, y],
        width,
        height,
        sampleIndex: colIndex,
        samplesPerRow: numOfPointsPerLine,
        omegaRatio: 1,
        omegaRadiusSubtractAmount: height,
      });

      return [mix(polarX, x, omegaRatio), mix(polarY, y, omegaRatio)];
    });
  });

  return points;
};

const getPolylinePointsAsString = points =>
  points.map(point => `${point[0]},${point[1]}`).join(' ');

const getColorForLineIndex = (index: number) => {
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

const PolarAmountVisualization = ({ width, height, value }: Props) => {
  const innerWidth = width - 20;
  const innerHeight = height - 40;
  const lines = calculateLinePoints(value, innerWidth, innerHeight);
  const stringifiedLines = lines.map(line => getPolylinePointsAsString(line));

  return (
    <Svg width={innerWidth} height={innerHeight}>
      {stringifiedLines.map((pointsString, i) => (
        <polyline
          key={i}
          points={pointsString}
          stroke={getColorForLineIndex(i)}
          strokeWidth={window.devicePixelRatio > 1 ? 2.5 : 2}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
};

export default PolarAmountVisualization;
