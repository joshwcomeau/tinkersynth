import {
  convertPolarToCartesian,
  convertCartesianToPolar,
  shallowCompare,
} from './utils';

describe('polar and cartesian conversions', () => {
  // I'm lazy; rather than check that each function produces values, I'm
  // assuming that if it can re-convert back to where it started, that's
  // good enough.
  it('can do a round-trip conversion', () => {
    const x = 10;
    const y = 5;

    const [theta, radius] = convertCartesianToPolar([x, y]);
    const converted = convertPolarToCartesian([theta, radius]);

    // Stupid floating-points
    const roundedConverted = [
      Math.round(converted[0]),
      Math.round(converted[1]),
    ];

    expect(roundedConverted).toEqual([x, y]);
  });

  it('handles negative cartesian values', () => {
    const x = -10;
    const y = -5;

    const [theta, radius] = convertCartesianToPolar([x, y]);
    const converted = convertPolarToCartesian([theta, radius]);

    // Stupid floating-points
    const roundedConverted = [
      Math.round(converted[0]),
      Math.round(converted[1]),
    ];

    expect(roundedConverted).toEqual([x, y]);
  });
});

describe('shallowCompare', () => {
  it('accepts identical objects', () => {
    const o1 = { hi: 5 };
    const o2 = { hi: 5 };
    const keys = ['hi'];

    expect(shallowCompare(o1, o2, keys)).toBe(true);
  });

  it('catches different values', () => {
    const o1 = { hi: 5 };
    const o2 = { hi: 6 };
    const keys = ['hi'];

    expect(shallowCompare(o1, o2, keys)).toBe(false);
  });

  it('is only shallow', () => {
    const o1 = { hi: { bye: 5 } };
    const o2 = { hi: { bye: 5 } };
    const keys = ['hi'];

    expect(shallowCompare(o1, o2, keys)).toBe(false);
  });

  it('only checks provided keys', () => {
    const o1 = { hi: 5 };
    const o2 = { hi: 5, bye: 10 };
    const keys = ['hi'];

    expect(shallowCompare(o1, o2, keys)).toBe(true);
  });

  it('ignores keys that dont exist', () => {
    const o1 = { hi: 5 };
    const o2 = { hi: 5 };
    const keys = ['hi', 'bye'];

    expect(shallowCompare(o1, o2, keys)).toBe(true);
  });
});
