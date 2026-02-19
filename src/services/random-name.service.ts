import { sample } from '../utils';

const adjectives = [
  'delightful',
  'whimsical',
  'joyous',
  'grand',
  'sublime',
  'superb',
  'fluorescent',
  'neon',
  'glowing',
  'volatile',
  'brilliant',
  'wonderful',
  'glorious',
  'radiant',
  'resplendent',
  'effulgent',
  'bright',
  'blazing',
  'dazzling',
  'incandescent',
  'lustrous',
  'gleaming',
  'glittering',
  'magnificent',
  'splendid',
  'incalculable',
];

const nouns = [
  'artwork',
  'masterpiece',
  'handiwork',
  'craft',
  'design',
  'composition',
  'object of art',
  'canvas',
  'plane',
  'gem',
  'monument',
  'treasure',
  'showpiece',
  'magnum opus',
  'tour de force',
];

export default function generateRandomName() {
  return [sample(adjectives), sample(nouns)].join(' ');
}
