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
  isBroken: boolean,
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

      // While resizing the window, we can wind up with less lines than
      // we originally expect.
      // Ignore this situation.
      if (!randomLine) {
        return acc;
      }

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

const NoiseVisualization = ({
  width,
  height,
  value,
  onClick,
  isBroken,
}: Props) => {
  const ratio = value / 100;

  const horizontalPadding = 30;
  const verticalPadding = 30;
  const innerWidth = width - horizontalPadding * 2;
  const innerHeight = height - verticalPadding * 2;

  // When the `value` is 0, we want to draw a little smiley-face mouth.
  // As the value increases, it fractures into noise, but this curve is
  // used to calculate that "from" position.
  // prettier-ignore
  const curve = {
    startPoint: [
      horizontalPadding,
      verticalPadding + innerHeight / 2
    ],
    controlPoint1: [
      horizontalPadding + innerWidth * 0.5,
      innerHeight * 1.25
    ],

    endPoint: [
      horizontalPadding + innerWidth,
      verticalPadding + innerHeight / 2
    ],
  };

  const numOfPoints = Math.round(innerWidth / 4) + 1;

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

  // As the value increases from 0 to 1, each colour of noise will follow
  // the same pattern of exploding outwards... it looks really mechanical /
  // artificial, though, if the shape is too perfect (eg. at 0.5, it still
  // forms a vague curve shape).
  //
  // Apply different easings to different springs by using bezier curves, and
  // mapping the value onto them.
  const linearCurve = {
    startPoint: [0, 0],
    controlPoint1: [0.5, 0.5],
    endPoint: [1, 1],
  };
  const eagerCurve = {
    startPoint: [0, 0],
    controlPoint1: [0, 1],
    endPoint: [1, 1],
  };
  const reticentCurve = {
    startPoint: [0, 0],
    controlPoint1: [1, 0],
    endPoint: [1, 1],
  };

  const spring1 = useSpring({
    ratio: getValuesForBezierCurve(linearCurve, ratio)[1],
    config: {
      tension: 120,
      friction: 12,
    },
  });
  const spring2 = useSpring({
    ratio: getValuesForBezierCurve(linearCurve, ratio)[1] * 1.25,
    config: {
      tension: 150,
      friction: 10,
    },
  });
  const spring3 = useSpring({
    ratio: getValuesForBezierCurve(eagerCurve, ratio)[1],
    config: {
      tension: 75,
      friction: 10,
    },
  });
  const spring4 = useSpring({
    ratio: getValuesForBezierCurve(eagerCurve, ratio)[1] * 1.15,
    config: {
      tension: 260,
      friction: 35,
    },
  });
  const spring5 = useSpring({
    ratio: getValuesForBezierCurve(reticentCurve, ratio)[1],
    config: {
      tension: 225,
      friction: 12,
    },
  });

  const lineColors = [
    COLORS.red[500],
    COLORS.yellow[500],
    COLORS.green[500],
    COLORS.blue[300],
    COLORS.white,
  ];

  const lines = [
    randomLines1,
    randomLines2,
    randomLines3,
    randomLines4,
    randomLines5,
  ];

  const springs = [spring1, spring2, spring3, spring4, spring5];

  return (
    <Svg width={width} height={height}>
      {lineColors.map((color, index) => (
        <animated.path
          key={index}
          d={springs[index].ratio.interpolate(ratio =>
            generateLine(numOfPoints, smoothPoints, lines[index], ratio)
          )}
          stroke={isBroken ? COLORS.white : color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeOpacity={1}
        />
      ))}
    </Svg>
  );
};

// $FlowFixMe
export default React.memo(NoiseVisualization);
