// @flow
import React from 'react';

import { range } from '../../utils';
import { CONTROL_RADIUS } from '../../constants';

const Background = ({ width, height, squareSize, onMouseDown }) => {
  // We want to create a dotted backdrop. Ideally, we'd do this every 25px,
  // but we want them to be evenly spaced, including at the edges... so we
  // should choose a specific cell size that fits within our grid.
  const numOfCols = Math.round(width / squareSize);
  const numOfRows = Math.round(height / squareSize);

  const dots = range(numOfRows - 1).map(rowIndex =>
    range(numOfCols - 1).map(colIndex => (
      <circle
        key={colIndex}
        cx={width * ((colIndex + 1) / numOfCols)}
        cy={height * ((rowIndex + 1) / numOfRows)}
        r={1}
        fill="rgba(255, 255, 255, 0.25)"
        fillOpacity={0.5}
        stroke={null}
      />
    ))
  );

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={0}
        y={0}
        rx={CONTROL_RADIUS}
        ry={CONTROL_RADIUS}
        width={width}
        height={height}
        fill="rgba(255, 255, 255, 0.05)"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth={1}
      />
      {dots}
    </g>
  );
};

// $FlowIgnore
export default React.memo(Background);
