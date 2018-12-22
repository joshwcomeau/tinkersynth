// @flow
import React from 'react';
import { range } from '../../../utils';

const Grid = ({ width, height, rows, cols, ...lineProps }) => {
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {range(rows + 1).map(i => (
        <line
          key={i}
          x1={0}
          y1={(i / rows) * height}
          x2={width}
          y2={(i / rows) * height}
          {...lineProps}
        />
      ))}
      {range(cols + 1).map(i => (
        <line
          key={i}
          x1={(i / cols) * width}
          y1={0}
          x2={(i / cols) * width}
          y2={height}
          {...lineProps}
        />
      ))}
    </svg>
  );
};

export default Grid;
