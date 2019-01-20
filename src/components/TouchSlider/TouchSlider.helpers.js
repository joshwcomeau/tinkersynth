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

export type Colorway = 'cool' | 'red' | 'yellow' | 'blue';

export const getColorForColIndex = (
  colorway: Colorway,
  colIndex: number,
  numOfCols: number
) => {
  let hue, saturation, brightness;

  const colRatio = colIndex / numOfCols;

  const hueStep = 20;

  switch (colorway) {
    case 'cool': {
      hue = roundToNearest(normalize(colRatio, 0, 1, 210, 50), hueStep);
      saturation = Math.round(normalize(colRatio, 0, 1, 80, 90));
      brightness = Math.round(normalize(colRatio, 0, 1, 90, 100));

      break;
    }

    case 'red': {
      hue = roundToNearest(normalize(colRatio, 0, 1, 0, 60), 15);
      saturation = Math.round(normalize(colRatio, 0, 1, 100, 85));
      brightness = Math.round(normalize(colRatio, 0, 1, 100, 90));

      break;
    }
    case 'yellow': {
      hue = roundToNearest(normalize(colRatio, 0, 1, 60, 120), 20);
      saturation = Math.round(normalize(colRatio, 0, 1, 100, 100));
      brightness = Math.round(normalize(colRatio, 0, 1, 100, 100));

      break;
    }
    case 'blue': {
      hue = roundToNearest(normalize(colRatio, 0, 1, 180, 240), 20);
      saturation = Math.round(normalize(colRatio, 0, 1, 100, 70));
      brightness = Math.round(normalize(colRatio, 0, 1, 85, 100));

      break;
    }
  }

  return prepColor({ hue, saturation, brightness });
};
