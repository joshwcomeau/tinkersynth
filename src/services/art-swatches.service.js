import { random, shuffle, sample } from '../utils';

import type { SwatchData } from '../types';

const RANDOM_BALL_SIZES = [0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75];

class Swatch {
  constructor({ id, label, colors, backgroundColor }) {
    this.id = id;
    this.label = label;
    this.colors = colors;
    this.backgroundColor = backgroundColor;
  }

  getBallPositions = (color, parentSize) => {
    const { type, xRatio, yRatio, sizeRatio } = ballPositions[this.id][color];

    if (type === 'random') {
      return {
        x: random(parentSize * -0.35, parentSize * 0.35),
        y: random(parentSize * -0.35, parentSize * 0.35),
        ballSize: parentSize * sample(RANDOM_BALL_SIZES),
      };
    }

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
    id: 'fire-mint',
    label: 'Fire Mint',
    colors: ['#FF0000', '#00FFFF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'hell-is-other-demons',
    label: 'Hell Is Other Demons',
    colors: ['#FFFFFF', '#3b00a6', '#ff0063'],
    backgroundColor: '#020b14',
  }),
  new Swatch({
    id: 'fun-dip',
    label: 'Fun Dip',
    colors: ['#8CEEEE', '#26BFBF', '#FF8A47', '#FC6170', '#FFD747'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'cyber-samurai',
    label: 'Cyber Samurai',
    colors: ['#e9275b', '#f44d9b', '#5de8e5'],
    backgroundColor: '#392270',
  }),
  new Swatch({
    id: 'electric-citrus',
    label: 'Electric Citrus',
    colors: ['#0066FF', '#EB00FF', '#FFE500'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'superway',
    label: 'Superway',
    colors: ['#324242', '#fffedd', '#ff8826'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'ribbons',
    label: 'Ribbons',
    colors: ['#f81735', '#41ead5', '#fdfffc', '#ff9f1c'],
    backgroundColor: '#011627',
  }),
  new Swatch({
    id: 'happy-circuits',
    label: 'Happy Circuits',
    colors: ['#364f6b', '#3fc1c9', '#fc5185'],
    backgroundColor: '#F5F5F5',
  }),
  new Swatch({
    id: 'lemonade',
    label: 'Lemonade',
    colors: ['#FFE82D', '#FF21FF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'night-bus',
    label: 'Night Bus',
    colors: ['#1A1A64', '#2C2A89', '#453AA4', '#5C49C6'],
    backgroundColor: '#0B0930',
  }),
  new Swatch({
    id: 'vibrano',
    label: 'Vibrano',
    colors: ['#302387', '#ff3796', '#00faac', '#fffdaf'],
    backgroundColor: '#111111',
  }),
  new Swatch({
    id: 'sepia',
    label: 'Sepia',
    colors: ['#bc9369', '#cda882', '#d4b595', '#dcc1a7', '#e3ceb9'],
    backgroundColor: '#eadbcb',
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
  new Swatch({
    id: 'highlighters',
    label: 'Highlighters',
    colors: ['#ff00f4', '#2aff00', '#fdff00'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'merica',
    label: 'Merica',
    colors: ['#ff0020', '#1446ff', '#FFFFFF'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'velvet',
    label: 'Velvet',
    colors: ['#560a86', '#f148fb', '#7122fa', '#ffacfc'],
    backgroundColor: '#120129',
  }),
  new Swatch({
    id: 'faded-polaroid',
    label: 'Faded Polaroid',
    colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff'],
    backgroundColor: '#111',
  }),
  new Swatch({
    id: 'jelly-beans',
    label: 'Jelly Beans',
    colors: shuffle([
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#3D5AFE',
      '#81D4FA',
      '#1DE9B6',
      '#4CAF50',
      '#8BC34A',
      '#C6FF00',
      '#FFEB3B',
      '#FFA000',
      '#FF3D00',
    ]),
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'rainbow-light',
    label: 'Rainbow (light)',
    colors: ['#D32F2F', '#F57C00', '#FBC02D', '#388E3C', '#1976D2', '#7B1FA2'],
    backgroundColor: '#FFFFFF',
  }),
  new Swatch({
    id: 'rainbow-dark',
    label: 'Rainbow (dark)',
    colors: ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0'],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'trans-flag',
    label: 'Trans Flag',
    colors: ['#3498ff', '#ff4889', '#FFFFFF', '#FF4889', '#3498FF'],
    backgroundColor: '#000',
  }),
  new Swatch({
    id: 'pan-flag',
    label: 'Pan Flag',
    colors: ['#ff228c', '#ffd800', '#22b1ff'],
    backgroundColor: '#000',
  }),
  new Swatch({
    id: 'intersex-flag',
    label: 'Intersex Flag',
    colors: ['#ffd800', '#9e00df'],
    backgroundColor: '#000',
  }),
  new Swatch({
    id: 'bisexual-flag',
    label: 'Bisexual Flag',
    colors: ['#d70170', '#0052f5', '#873dcd'],
    backgroundColor: '#000',
  }),
  new Swatch({
    id: 'ace-flag',
    label: 'Ace Flag',
    colors: ['#a3a3a3', '#ffffff', '#d900d6'],
    backgroundColor: '#000',
  }),
  new Swatch({
    id: 'agender-flag',
    label: 'Agender Flag',
    colors: ['#b9b9b9', '#ffffff', '#8ef434', '#FFFFFF', '#B9B9B9'],
    backgroundColor: '#000',
  }),
  new Swatch({
    id: 'non-binary-flag',
    label: 'Non-Binary Flag',
    colors: ['#2d2d2d', '#ffffff', '#a34bea', '#fff420'],
    backgroundColor: '#000000',
  }),
];

export const getSwatchById = id =>
  ART_SWATCHES.find(swatch => swatch.id === id) || ART_SWATCHES[0];

export default ART_SWATCHES;

const ballPositions = {
  'default-white-on-black': {
    '#FFFFFF': { xRatio: 0, yRatio: 0.1, sizeRatio: 0.6 },
  },
  'inverted-black-on-white': {
    '#000000': { xRatio: 0, yRatio: -0.1, sizeRatio: 0.6 },
  },
  'fire-mint': {
    '#FF0000': { xRatio: -0.1, yRatio: 0.05, sizeRatio: 0.6 },
    '#00FFFF': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
  },
  'hell-is-other-demons': {
    '#FFFFFF': { xRatio: -0.1, yRatio: 0.1, sizeRatio: 0.75 },
    '#3b00a6': { xRatio: 0.25, yRatio: 0, sizeRatio: 0.45 },
    '#ff0063': { xRatio: -0.15, yRatio: -0.2, sizeRatio: 0.45 },
  },
  'fun-dip': {
    '#8CEEEE': { xRatio: -0.35, yRatio: 0.2, sizeRatio: 0.8 },
    '#26BFBF': { xRatio: 0.25, yRatio: 0.1, sizeRatio: 0.65 },
    '#FF8A47': { xRatio: -0.1, yRatio: -0.2, sizeRatio: 0.5 },
    '#FC6170': { xRatio: 0.25, yRatio: -0.2, sizeRatio: 0.5 },
    '#FFD747': { xRatio: 0, yRatio: 0.05, sizeRatio: 0.4 },
  },
  'cyber-samurai': {
    '#e9275b': { xRatio: -0.35, yRatio: 0.2, sizeRatio: 0.9 },
    '#f44d9b': { xRatio: -0.1, yRatio: -0.1, sizeRatio: 0.6 },
    '#5de8e5': { xRatio: 0.325, yRatio: 0.1, sizeRatio: 0.5 },
  },
  'electric-citrus': {
    '#0066FF': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.65 },
    '#EB00FF': { xRatio: 0.25, yRatio: 0, sizeRatio: 0.525 },
    '#FFE500': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.4 },
  },
  superway: {
    '#324242': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.8 },
    '#fffedd': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.55 },
    '#ff8826': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
  },
  ribbons: {
    '#f81735': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.8 },
    '#41ead5': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.55 },
    '#fdfffc': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
    '#ff9f1c': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
  },
  'happy-circuits': {
    '#364f6b': { xRatio: 0, yRatio: -0.1, sizeRatio: 1.2 },
    '#3fc1c9': { xRatio: 0.1, yRatio: 0.1, sizeRatio: 0.7 },
    '#fc5185': { xRatio: -0.15, yRatio: 0.25, sizeRatio: 0.4 },
  },
  lemonade: {
    '#FFE82D': { xRatio: -0.2, yRatio: 0, sizeRatio: 0.6 },
    '#FF21FF': { xRatio: 0.2, yRatio: 0, sizeRatio: 0.6 },
  },
  'night-bus': {
    '#1A1A64': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.8 },
    '#2C2A89': { xRatio: -0.15, yRatio: 0.1, sizeRatio: 0.55 },
    '#453AA4': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
    '#5C49C6': { xRatio: 0.15, yRatio: -0.1, sizeRatio: 0.45 },
  },

  vibrano: {
    '#302387': { xRatio: -0.1, yRatio: 0.1, sizeRatio: 0.75 },
    '#ff3796': { xRatio: 0, yRatio: -0.25, sizeRatio: 0.45 },
    '#00faac': { xRatio: -0.2, yRatio: -0.2, sizeRatio: 0.6 },
    '#fffdaf': { xRatio: 0.3, yRatio: 0, sizeRatio: 0.45 },
  },

  sepia: {
    '#bc9369': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.8 },
    '#cda882': { xRatio: -0.25, yRatio: 0.1, sizeRatio: 0.55 },
    '#d4b595': { xRatio: 0.25, yRatio: -0.1, sizeRatio: 0.45 },
    '#dcc1a7': { xRatio: 0.1, yRatio: -0.1, sizeRatio: 0.45 },
    '#e3ceb9': { xRatio: 0.1, yRatio: 0.3, sizeRatio: 0.55 },
  },
  'rainbow-light': {
    '#D32F2F': { xRatio: -0.2, yRatio: -0.1, sizeRatio: 0.65 },
    '#F57C00': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.6 },
    '#FBC02D': { xRatio: 0.2, yRatio: -0.1, sizeRatio: 0.55 },
    '#388E3C': { xRatio: 0.2, yRatio: 0.2, sizeRatio: 0.5 },
    '#1976D2': { xRatio: 0, yRatio: 0.3, sizeRatio: 0.45 },
    '#7B1FA2': { xRatio: -0.2, yRatio: 0.2, sizeRatio: 0.4 },
  },
  'rainbow-dark': {
    '#F44336': { xRatio: -0.2, yRatio: -0.1, sizeRatio: 0.65 },
    '#FF9800': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.6 },
    '#FFEB3B': { xRatio: 0.2, yRatio: -0.1, sizeRatio: 0.55 },
    '#4CAF50': { xRatio: 0.2, yRatio: 0.2, sizeRatio: 0.5 },
    '#2196F3': { xRatio: 0, yRatio: 0.3, sizeRatio: 0.45 },
    '#9C27B0': { xRatio: -0.2, yRatio: 0.2, sizeRatio: 0.4 },
  },
  'trans-flag': {
    '#3498ff': { xRatio: 0, yRatio: -0.4, sizeRatio: 0.45 },
    '#ff4889': { xRatio: 0, yRatio: -0.25, sizeRatio: 0.45 },
    '#FFFFFF': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.45 },
    '#FF4889': { xRatio: 0, yRatio: 0.15, sizeRatio: 0.45 },
    '#3498FF': { xRatio: 0, yRatio: 0.4, sizeRatio: 0.45 },
  },
  'pan-flag': {
    '#ff228c': { xRatio: 0, yRatio: -0.3, sizeRatio: 0.6 },
    '#ffd800': { xRatio: 0, yRatio: 0, sizeRatio: 0.6 },
    '#22b1ff': { xRatio: 0, yRatio: 0.3, sizeRatio: 0.6 },
  },
  'intersex-flag': {
    '#ffd800': { xRatio: 0, yRatio: -0.1, sizeRatio: 0.9 },
    '#9e00df': { xRatio: 0, yRatio: -0.1, sizeRatio: 0.45 },
  },
  'bisexual-flag': {
    '#d70170': { xRatio: 0, yRatio: -0.35, sizeRatio: 0.9 },
    '#0052f5': { xRatio: 0, yRatio: 0.25, sizeRatio: 0.9 },
    '#873dcd': { xRatio: 0, yRatio: -0.05, sizeRatio: 0.45 },
  },
  'ace-flag': {
    '#a3a3a3': { xRatio: 0, yRatio: 0.1, sizeRatio: 1 },
    '#ffffff': { xRatio: 0, yRatio: 0.1, sizeRatio: 0.7 },
    '#d900d6': { xRatio: 0, yRatio: 0.15, sizeRatio: 0.4 },
  },
  'agender-flag': {
    '#b9b9b9': { xRatio: 0, yRatio: -0.5, sizeRatio: 0.6 },
    '#ffffff': { xRatio: 0, yRatio: -0.3, sizeRatio: 0.6 },
    '#8ef434': { xRatio: 0, yRatio: 0, sizeRatio: 0.6 },
    '#FFFFFF': { xRatio: 0, yRatio: 0.3, sizeRatio: 0.6 },
    '#B9B9B9': { xRatio: 0, yRatio: 0.5, sizeRatio: 0.6 },
  },
  'non-binary-flag': {
    '#2d2d2d': { xRatio: -0.25, yRatio: 0.25, sizeRatio: 0.6 },
    '#ffffff': { xRatio: 0, yRatio: -0.1, sizeRatio: 0.8 },
    '#a34bea': { xRatio: 0.15, yRatio: 0.25, sizeRatio: 0.45 },
    '#fff420': { xRatio: 0, yRatio: -0.25, sizeRatio: 0.45 },
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
  highlighters: {
    '#ff00f4': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.5 },
    '#2aff00': { xRatio: 0.2, yRatio: 0.125, sizeRatio: 0.5 },
    '#fdff00': { xRatio: -0.2, yRatio: 0.125, sizeRatio: 0.5 },
  },
  merica: {
    '#ff0020': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.8 },
    '#1446ff': { xRatio: 0.2, yRatio: 0.125, sizeRatio: 0.8 },
    '#FFFFFF': { xRatio: -0.2, yRatio: 0.125, sizeRatio: 0.8 },
  },
  velvet: {
    '#560a86': { xRatio: 0, yRatio: -0.2, sizeRatio: 0.6 },
    '#f148fb': { xRatio: 0.2, yRatio: 0.125, sizeRatio: 0.8 },
    '#7122fa': { xRatio: -0.2, yRatio: 0.125, sizeRatio: 0.8 },
    '#ffacfc': { xRatio: -0.2, yRatio: 0.125, sizeRatio: 0.6 },
  },
  'faded-polaroid': {
    '#ffb3ba': { xRatio: -0.15, yRatio: 0.2, sizeRatio: 0.8 },
    '#ffdfba': { xRatio: 0.25, yRatio: 0.1, sizeRatio: 0.65 },
    '#ffffba': { xRatio: -0.1, yRatio: -0.2, sizeRatio: 0.5 },
    '#baffc9': { xRatio: 0.25, yRatio: -0.2, sizeRatio: 0.5 },
    '#bae1ff': { xRatio: 0, yRatio: 0.05, sizeRatio: 0.4 },
  },

  'jelly-beans': {
    '#F44336': { type: 'random' },
    '#E91E63': { type: 'random' },
    '#9C27B0': { type: 'random' },
    '#673AB7': { type: 'random' },
    '#3F51B5': { type: 'random' },
    '#3D5AFE': { type: 'random' },
    '#81D4FA': { type: 'random' },
    '#1DE9B6': { type: 'random' },
    '#4CAF50': { type: 'random' },
    '#8BC34A': { type: 'random' },
    '#C6FF00': { type: 'random' },
    '#FFEB3B': { type: 'random' },
    '#FFA000': { type: 'random' },
    '#FF3D00': { type: 'random' },
  },
};
