// @flow
import { range } from '../../utils';

import type { Point } from '../../types';

export const generateDotCoords = (
  width: number,
  height: number,
  dotSize: number
): Array<Point> => {
  let coords = [];

  const dotSpacing = Math.round(dotSize);

  const numOfCols = Math.floor(width / (dotSize + dotSpacing)) - 1;
  const numOfRows = Math.floor(height / (dotSize + dotSpacing));

  range(numOfCols).map(colIndex =>
    range(numOfRows)
      .reverse()
      .forEach(rowIndex => {
        const x = colIndex * (dotSize + dotSpacing) + dotSize + dotSpacing;
        const y = rowIndex * (dotSize + dotSpacing) + dotSize + dotSpacing;

        coords.push([x, y]);
      })
  );

  return coords;
};
