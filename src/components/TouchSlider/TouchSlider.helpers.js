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

  const numOfCols = Math.floor(width / (dotSize + dotSpacing));
  const numOfRows = Math.floor(height / (dotSize + dotSpacing));

  range(numOfCols).map(colIndex =>
    range(numOfRows)
      .reverse()
      .map(rowIndex => {
        const x = ((colIndex + 1) / (numOfCols + 1)) * width;
        const y = ((rowIndex + 1) / (numOfRows + 1)) * height;

        coords.push([x, y]);
      })
  );

  return coords;
};
