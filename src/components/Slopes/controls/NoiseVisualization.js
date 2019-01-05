// @flow
import React, { useRef } from 'react';
import { Spring } from 'react-spring';

import { COLORS } from '../../../constants';
import {
  getValuesForBezierCurve,
  mixPoints,
} from '../../../helpers/line.helpers';
import { range, clamp } from '../../../utils';

import Svg from '../../Svg';

type Props = {
  width: number,
  height: number,
  value: number,
};

const generateRandomLines = (width, height, numOfPoints) =>
  range(numOfPoints).map(i => {
    const p1 = [width * (i / numOfPoints), Math.round(Math.random() * height)];

    const p2 = [
      width * ((i + 1) / numOfPoints),
      clamp(
        Math.round((Math.random() - 0.5) * (height * 0.75) + p1[1]),
        0,
        height
      ),
    ];

    return [p1, p2];
  });

const NoiseVisualization = ({ width, height, value }: Props) => {
  const ratio = value / 100;

  const innerWidth = width - 20;
  const innerHeight = height - 60;

  const curve = {
    startPoint: [0, innerHeight],
    controlPoint1: [innerWidth * 0.33, innerHeight * -1.75],
    controlPoint2: [innerWidth * 0.66, innerHeight * 2.25],
    endPoint: [innerWidth, innerHeight / 2],
  };

  const numOfPoints = Math.round(innerWidth / 3) + 1;

  const randomLines1 = useRef(
    generateRandomLines(innerWidth, innerHeight, numOfPoints)
  );
  const randomLines2 = useRef(
    generateRandomLines(innerWidth, innerHeight, numOfPoints)
  );

  const rawPointData = range(numOfPoints).map(i => {
    const t = i / numOfPoints;
    return getValuesForBezierCurve(curve, t);
  });

  const points1 = rawPointData
    .reduce((acc, point, i) => {
      if (i === 0) {
        return acc;
      }

      const randomLine = randomLines1.current[i];

      const previousPoint = mixPoints(
        rawPointData[i - 1],
        randomLine[0],
        1 - ratio
      );

      const currentPoint = mixPoints(point, randomLine[1], 1 - ratio);

      acc.push(`M ${previousPoint.join(',')} L ${currentPoint.join(',')}`);
      return acc;
    }, [])
    .join('\n');

  const points2 = rawPointData
    .reduce((acc, point, i) => {
      if (i === 0) {
        return acc;
      }

      const randomLine = randomLines2.current[i];

      const previousPoint = mixPoints(
        rawPointData[i - 1],
        randomLine[0],
        1 - ratio
      );

      const currentPoint = mixPoints(point, randomLine[1], 1 - ratio);

      acc.push(`M ${previousPoint.join(',')} L ${currentPoint.join(',')}`);
      return acc;
    }, [])
    .join('\n');

  return (
    <Svg width={innerWidth} height={innerHeight}>
      {/*
      TODO: Uncomment this, use it when ratio is 0.

      <path
        d={`
          M 0,${innerHeight}
          C ${innerWidth * 0.33},${innerHeight * -1.75}
            ${innerWidth * 0.66},${innerHeight * 2.25}
            ${innerWidth},${innerHeight / 2}
        `}
        stroke={COLORS.aqua[500]}
        strokeWidth={5}
        strokeLinecap="round"
      /> */}
      <path
        d={points1}
        stroke={COLORS.aqua[500]}
        strokeWidth={4}
        strokeLinecap="round"
        style={{ mixBlendMode: 'color-dodge' }}
      />
      <path
        d={points2}
        stroke={COLORS.yellow[300]}
        strokeWidth={4}
        strokeLinecap="round"
        style={{ mixBlendMode: 'color-dodge' }}
      />
    </Svg>
  );
};

// $FlowFixMe
export default React.memo(NoiseVisualization);
