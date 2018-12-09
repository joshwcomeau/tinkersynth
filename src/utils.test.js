import { convertPolarToCartesian, convertCartesianToPolar } from './utils';

describe('utils', () => {
  describe('polar and cartesian conversions', () => {
    // I'm lazy; rather than check that each function produces values, I'm
    // assuming that if it can re-convert back to where it started, that's
    // good enough.
    it('can do a round-trip conversion', () => {
      const x = 10;
      const y = 5;

      const [radius, theta] = convertCartesianToPolar([x, y]);
      const converted = convertPolarToCartesian([radius, theta]);

      expect(converted).toEqual([x, y]);
    });
  });
});
