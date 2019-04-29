import type { SwatchData } from '../types';

class Swatch {
  constructor({ id, label, colors, backgroundColor }) {
    this.id = id;
    this.label = label;
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
    label: 'White on Black',
    colors: ['#FFFFFF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'inverted-black-on-white',
    label: 'Black on White',
    colors: ['#000000'],
    backgroundColor: '#FFFFFF',
  }),
  new Swatch({
    id: 'red-aqua',
    label: '8-bit',
    colors: ['#FF0000', '#00FFFF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'hell-is-other-demons',
    label: 'Hell Is Other Demons',
    colors: ['#FFFFFF', '#ff0063', '#3b00a6'],
    backgroundColor: '#020b14',
  }),
  new Swatch({
    id: 'soft-pastels',
    label: 'Soft Pastels',
    colors: ['#8CEEEE', '#26BFBF', '#FF8A47', '#FC6170', '#FFD747'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'hotrod',
    label: 'Hotrod',
    colors: ['#0066FF', '#EB00FF', '#FFE500'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'faded-peach',
    label: 'Faded peach',
    colors: ['#324242', '#fffedd', '#ff8826'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'lemonade',
    label: 'Lemonade',
    colors: ['#FFE82D', '#FF21FF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'material-rainbow-light',
    label: 'Rainbow (light)',
    colors: ['#D32F2F', '#F57C00', '#FBC02D', '#388E3C', '#1976D2', '#7B1FA2'],
    backgroundColor: '#FFFFFF',
  }),
  new Swatch({
    id: 'material-rainbow-dark',
    label: 'Rainbow (dark)',
    colors: ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'beachday',
    label: 'Beach Day',
    colors: ['#4ecdc4', '#ffe76d', '#ff6b6b', '#f8fff7'],
    backgroundColor: '#1a535c',
  }),
  new Swatch({
    id: 'bloodline',
    label: 'Bloodline',
    colors: ['#494949', '#7c7a7b', '#FFFFFF', '#ff2d4b'],
    backgroundColor: '#000000',
  }),
];

export const getSwatchById = id =>
  ART_SWATCHES.find(swatch => swatch.id === id) || ART_SWATCHES[0];

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
  'hell-is-other-demons': {
    '#FFFFFF': { xRatio: -0.1, yRatio: 0.1, sizeRatio: 0.75 },
    '#ff0063': { xRatio: 0, yRatio: -0.25, sizeRatio: 0.45 },
    '#3b00a6': { xRatio: 0.3, yRatio: 0, sizeRatio: 0.45 },
  },
  'soft-pastels': {
    '#8CEEEE': { xRatio: -0.35, yRatio: 0.2, sizeRatio: 0.8 },
    '#26BFBF': { xRatio: 0.25, yRatio: 0.1, sizeRatio: 0.65 },
    '#FF8A47': { xRatio: -0.1, yRatio: -0.2, sizeRatio: 0.5 },
    '#FC6170': { xRatio: 0.25, yRatio: -0.2, sizeRatio: 0.5 },
    '#FFD747': { xRatio: 0, yRatio: 0.05, sizeRatio: 0.4 },
  },
  hotrod: {
    '#0066FF': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.65 },
    '#EB00FF': { xRatio: 0.25, yRatio: 0, sizeRatio: 0.525 },
    '#FFE500': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.4 },
  },
  'faded-peach': {
    '#324242': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.8 },
    '#fffedd': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.55 },
    '#ff8826': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
  },
  lemonade: {
    '#FFE82D': { xRatio: -0.2, yRatio: 0, sizeRatio: 0.6 },
    '#FF21FF': { xRatio: 0.2, yRatio: 0, sizeRatio: 0.6 },
  },
  'material-rainbow-light': {
    '#D32F2F': { xRatio: -0.2, yRatio: -0.1, sizeRatio: 0.65 },
    '#F57C00': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.6 },
    '#FBC02D': { xRatio: 0.2, yRatio: -0.1, sizeRatio: 0.55 },
    '#388E3C': { xRatio: 0.2, yRatio: 0.2, sizeRatio: 0.5 },
    '#1976D2': { xRatio: 0, yRatio: 0.3, sizeRatio: 0.45 },
    '#7B1FA2': { xRatio: -0.2, yRatio: 0.2, sizeRatio: 0.4 },
  },
  'material-rainbow-dark': {
    '#F44336': { xRatio: -0.2, yRatio: -0.1, sizeRatio: 0.65 },
    '#FF9800': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.6 },
    '#FFEB3B': { xRatio: 0.2, yRatio: -0.1, sizeRatio: 0.55 },
    '#4CAF50': { xRatio: 0.2, yRatio: 0.2, sizeRatio: 0.5 },
    '#2196F3': { xRatio: 0, yRatio: 0.3, sizeRatio: 0.45 },
    '#9C27B0': { xRatio: -0.2, yRatio: 0.2, sizeRatio: 0.4 },
  },
  beachday: {
    '#4ecdc4': { xRatio: -0.1, yRatio: 0.1, sizeRatio: 0.75 },
    '#f8fff7': { xRatio: 0, yRatio: -0.25, sizeRatio: 0.45 },
    '#ffe76d': { xRatio: -0.2, yRatio: -0.2, sizeRatio: 0.6 },
    '#ff6b6b': { xRatio: 0.3, yRatio: 0, sizeRatio: 0.45 },
  },
  bloodline: {
    '#494949': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.8 },
    '#7c7a7b': { xRatio: 0, yRatio: 0.05, sizeRatio: 0.7 },
    '#FFFFFF': { xRatio: 0, yRatio: 0.2, sizeRatio: 0.6 },
    '#ff2d4b': { xRatio: 0, yRatio: 0.2, sizeRatio: 0.35 },
  },
};
