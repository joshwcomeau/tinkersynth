import type { SwatchData } from '../types';

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
    id: 'soft-pastels',
    colors: ['#8CEEEE', '#26BFBF', '#FF8A47', '#FC6170', '#FFD747'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'marbles',
    colors: ['#0066FF', '#EB00FF', '#FFE500'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'lemonade',
    colors: ['#FFE82D', '#FF21FF'],
    backgroundColor: '#000000',
  }),
];

export const getSwatchById = id =>
  ART_SWATCHES.find(swatch => swatch.id === id);

export default ART_SWATCHES;

const ballPositions = {
  'default-white-on-black': {
    '#FFFFFF': { xRatio: 0, yRatio: 0, sizeRatio: 0.6 },
  },
  'inverted-black-on-white': {
    '#000000': { xRatio: 0, yRatio: 0, sizeRatio: 0.6 },
  },
  'red-aqua': {
    '#FF0000': { xRatio: -0.1, yRatio: 0.05, sizeRatio: 0.6 },
    '#00FFFF': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
  },
  'soft-pastels': {
    '#8CEEEE': { xRatio: -0.35, yRatio: 0.2, sizeRatio: 0.8 },
    '#26BFBF': { xRatio: 0.25, yRatio: 0.1, sizeRatio: 0.65 },
    '#FF8A47': { xRatio: -0.1, yRatio: -0.2, sizeRatio: 0.5 },
    '#FC6170': { xRatio: 0.25, yRatio: -0.2, sizeRatio: 0.5 },
    '#FFD747': { xRatio: 0, yRatio: 0.05, sizeRatio: 0.4 },
  },
  marbles: {
    '#0066FF': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.65 },
    '#EB00FF': { xRatio: 0.25, yRatio: 0, sizeRatio: 0.525 },
    '#FFE500': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.4 },
  },
  lemonade: {
    '#FFE82D': { xRatio: -0.2, yRatio: 0, sizeRatio: 0.6 },
    '#FF21FF': { xRatio: 0.2, yRatio: 0, sizeRatio: 0.6 },
  },
};
