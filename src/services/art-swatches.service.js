import type { SwatchData } from '../types';

const ballPositions = {
  'default-white-on-black': {
    '#FFFFFF': {
      xRatio: 0,
      yRatio: 0,
      sizeRatio: 0.6,
    },
  },
  'inverted-black-on-white': {
    '#000000': {
      xRatio: 0,
      yRatio: 0,
      sizeRatio: 0.6,
    },
  },
  'red-aqua': {
    '#FF0000': {
      xRatio: -0.1,
      yRatio: 0.05,
      sizeRatio: 0.6,
    },
    '#00FFFF': {
      xRatio: 0.15,
      yRatio: -0.1,
      sizeRatio: 0.45,
    },
  },
  'mossy-day': {
    '#D3F6DB': {
      xRatio: -0.1,
      yRatio: 0.05,
      sizeRatio: 0.6,
    },
    '#92D5E6': {
      xRatio: 0.15,
      yRatio: -0.1,
      sizeRatio: 0.45,
    },
    '#772D8B': {
      xRatio: 0.15,
      yRatio: -0.1,
      sizeRatio: 0.45,
    },
    '#A1EF8B': {
      xRatio: 0.15,
      yRatio: -0.1,
      sizeRatio: 0.45,
    },
  },
};

class Swatch {
  constructor({ id, colors, backgroundColor }) {
    this.id = id;
    this.colors = colors;
    this.backgroundColor = backgroundColor;
  }

  getBallPositions = (color, parentSize) => {
    const { xRatio, yRatio, sizeRatio } = ballPositions[this.id][color];

    return {
      x: xRatio * parentSize,
      y: yRatio * parentSize,
      ballSize: sizeRatio * parentSize,
    };
  };
}

const ART_SWATCHES: Array<SwatchData> = [
  new Swatch({
    id: 'default-white-on-black',
    colors: ['#FFFFFF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'inverted-black-on-white',
    colors: ['#000000'],
    backgroundColor: '#FFFFFF',
  }),
  new Swatch({
    id: 'red-aqua',
    colors: ['#FF0000', '#00FFFF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'mossy-day',
    colors: ['#D3F6DB', '#92D5E6', '#772D8B', '#A1EF8B'],
    backgroundColor: '#000000',
  }),
];

export const getSwatchById = id =>
  ART_SWATCHES.find(swatch => swatch.id === id);

export default ART_SWATCHES;
