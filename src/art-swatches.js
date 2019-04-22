class Swatch {
  constructor({ id, colors, backgroundColor }) {
    this.id = id;
    this.colors = colors;
    this.backgroundColor = backgroundColor;
  }

  get colorHexCodes() {
    return this.colors.map(color => color.hex);
  }

  getBallPositions = (parentSize, colorIndex) => {
    const { xRatio, yRatio, sizeRatio } = this.colors[colorIndex];

    return {
      x: xRatio * parentSize,
      y: yRatio * parentSize,
      ballSize: sizeRatio * parentSize,
    };
  };
}

const ART_SWATCHES = [
  new Swatch({
    id: 'default-white-on-black',
    colors: [
      {
        hex: '#FFFFFF',
        xRatio: 0,
        yRatio: 0,
        sizeRatio: 0.6,
      },
    ],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'inverted-black-on-white',
    colors: [
      {
        hex: '#000000',
        xRatio: 0,
        yRatio: 0,
        sizeRatio: 0.6,
      },
    ],
    backgroundColor: '#FFFFFF',
  }),
  new Swatch({
    id: 'red-aqua',
    colors: [
      {
        hex: '#FF0000',
        xRatio: -0.1,
        yRatio: 0.05,
        sizeRatio: 0.6,
      },
      {
        hex: '#00FFFF',
        xRatio: 0.15,
        yRatio: -0.1,
        sizeRatio: 0.45,
      },
    ],
    backgroundColor: '#000000',
  }),
  new Swatch({
    id: 'mossy-day',
    colors: [
      {
        hex: '#D3F6DB',
        xRatio: -0.1,
        yRatio: 0.05,
        sizeRatio: 0.6,
      },
      {
        hex: '#92D5E6',
        xRatio: 0.15,
        yRatio: -0.1,
        sizeRatio: 0.45,
      },
      {
        hex: '#772D8B',
        xRatio: 0.15,
        yRatio: -0.1,
        sizeRatio: 0.45,
      },
      {
        hex: '#A1EF8B',
        xRatio: 0.15,
        yRatio: -0.1,
        sizeRatio: 0.45,
      },
    ],
    backgroundColor: '#000000',
  }),
];

export default ART_SWATCHES;
