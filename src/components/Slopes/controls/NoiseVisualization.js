// @flow
import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring/hooks';

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

const generateRandomLines = (id, width, height, numOfPoints) =>
  range(numOfPoints)
    .map(i => {
      const p1 = [
        width * (i / numOfPoints),
        Math.round(Math.random() * height),
      ];

      const p2 = [
        width * ((i + 1) / numOfPoints),
        clamp(
          Math.round((Math.random() - 0.5) * (height * 0.75) + p1[1]),
          0,
          height
        ),
      ];

      return [p1, p2];
    })
    .filter(line => line);

const generateLine = (numOfPoints, smoothPoints, randomLines, ratio) => {
  return smoothPoints
    .reduce((acc, point, i) => {
      if (i === 0) {
        return acc;
      }

      const randomLine = randomLines.current[i];

      const previousPoint = mixPoints(
        smoothPoints[i - 1],
        randomLine[0],
        1 - ratio
      );

      const currentPoint = mixPoints(point, randomLine[1], 1 - ratio);

      acc.push(`M ${previousPoint.join(',')} L ${currentPoint.join(',')}`);
      return acc;
    }, [])
    .join('\n');
};

const springConfig = {
  tension: 120,
  friction: 7,
};

const NoiseVisualization = ({ width, height, value }: Props) => {
  const ratio = value / 100;

  const horizontalPadding = 30;
  const verticalPadding = 30;
  const innerWidth = width - horizontalPadding * 2;
  const innerHeight = height - verticalPadding * 2;

  // prettier-ignore
  const curve = {
    startPoint: [
      horizontalPadding,
      verticalPadding + innerHeight
    ],
    controlPoint1: [
      horizontalPadding + innerWidth * 0.33,
      verticalPadding + innerHeight * -1.25,
    ],
    controlPoint2: [
      horizontalPadding + innerWidth * 0.66,
      verticalPadding + innerHeight * 1.75,
    ],
    endPoint: [
      horizontalPadding + innerWidth,
      innerHeight / 2,
    ],
  };

  const numOfPoints = Math.round(innerWidth / 5) + 1;

  const randomLines1 = useRef(
    generateRandomLines(1, width, height, numOfPoints)
  );
  const randomLines2 = useRef(
    generateRandomLines(2, width, height, numOfPoints)
  );
  const randomLines3 = useRef(
    generateRandomLines(3, width, height, numOfPoints)
  );
  const randomLines4 = useRef(
    generateRandomLines(4, width, height, numOfPoints)
  );
  const randomLines5 = useRef(
    generateRandomLines(5, width, height, numOfPoints)
  );

  const smoothPoints = range(numOfPoints).map(i => {
    const t = i / numOfPoints;
    return getValuesForBezierCurve(curve, t);
  });

  const spring = useSpring({
    ratio,
    config: springConfig,
  });

  const lineColors = [
    COLORS.red[500],
    COLORS.yellow[500],
    COLORS.green[500],
    COLORS.blue[300],
    COLORS.violet[300],
  ];

  const lines = [
    randomLines1,
    randomLines2,
    randomLines3,
    randomLines4,
    randomLines5,
  ];

  return (
    <Svg width={width} height={height}>
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
      {lineColors.map((color, index) => (
        <animated.path
          key={index}
          d={spring.ratio.interpolate(ratio =>
            generateLine(numOfPoints, smoothPoints, lines[index], ratio)
          )}
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          style={{ mixBlendMode: 'color-dodge' }}
        />
      ))}
    </Svg>
  );
};

// $FlowFixMe
export default React.memo(NoiseVisualization);
