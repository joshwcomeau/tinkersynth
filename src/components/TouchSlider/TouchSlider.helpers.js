// @flow
import { compose, range, normalize, roundToNearest } from '../../utils';
import { convertHSBToHSL, stringifyHSL } from '../../helpers/color.helpers';

const prepColor = compose(
  stringifyHSL,
  convertHSBToHSL
);

export const generateDotCoords = (
  width: number,
  height: number,
  dotSize: number
) => {
  let dotCoords = [];

  const dotSpacing = Math.round(dotSize);

  const numOfCols = Math.floor(width / (dotSize + dotSpacing)) - 2;
  const numOfRows = Math.floor(height / (dotSize + dotSpacing)) - 1;

  range(numOfCols).map(colIndex =>
    range(numOfRows)
      .reverse()
      .forEach(rowIndex => {
        const x = colIndex * (dotSize + dotSpacing) + 10;
        const y = rowIndex * (dotSize + dotSpacing) + 8;

        dotCoords.push([x, y, colIndex, rowIndex]);
      })
  );

  return { dotCoords, numOfCols };
};

export const getColorForColIndex = (colIndex: number, numOfCols: number) => {
  const colRatio = colIndex / numOfCols;

  const hue = roundToNearest(normalize(colRatio, 0, 1, 210, 50), 20);
  const saturation = Math.round(normalize(colRatio, 0, 1, 80, 90));
  const brightness = Math.round(normalize(colRatio, 0, 1, 90, 100));

  return prepColor({ hue, saturation, brightness });
};
