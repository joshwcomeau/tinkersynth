// @flow
import React from 'react';
import { range } from '../../../utils';

type Props = {
  width: number,
  height: number,
  rows: number,
  cols: number,
};

const Grid = ({ width, height, rows, cols, ...lineProps }: Props) => {
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="none"
        {...lineProps}
      />
      {range(rows - 1).map(i => (
        <line
          key={i}
          x1={0}
          y1={((i + 1) / rows) * height}
          x2={width}
          y2={((i + 1) / rows) * height}
          {...lineProps}
        />
      ))}
      {range(cols - 1).map(i => (
        <line
          key={i}
          x1={((i + 1) / cols) * width}
          y1={0}
          x2={((i + 1) / cols) * width}
          y2={height}
          {...lineProps}
        />
      ))}
    </svg>
  );
};

export default Grid;
