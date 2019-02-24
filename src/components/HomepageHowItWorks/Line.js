import React from 'react';
import { Spring } from 'react-spring';

import { COLORS, UNIT } from '../../constants';
import { normalize } from '../../utils';

const getLinePath = (width, height, lineLength, lineCurve) => {
  const startX = normalize(lineLength, 0, 100, width * 0.1, width * 0.6);
  const endX = normalize(lineLength, 0, 100, width * 0.9, width * 0.4);

  const startY = normalize(lineCurve, 0, 100, height * 0.8, height * 0.2);
  const endY = normalize(lineCurve, 0, 100, height * 0.8, height * 0.2);

  const controlX = width / 2;
  const controlY = normalize(lineCurve, 0, 100, -height * 0.25, height * 1.45);

  return `
    M ${startX}, ${startY}
    Q ${controlX}, ${controlY}
      ${endX}, ${endY}
  `;
};

const Line = ({ width, height, lineLength, lineCurve, springConfig }) => (
  <svg width={width} height={height} viewBox="0 0 184 92">
    <Spring to={{ lineLength, lineCurve }} config={springConfig}>
      {interpolated => (
        <path
          d={getLinePath(
            width,
            height,
            interpolated.lineLength,
            interpolated.lineCurve
          )}
          fill="none"
          stroke={COLORS.white}
          strokeWidth={5}
          strokeLinecap="round"
        />
      )}
    </Spring>
  </svg>
);

export default Line;
