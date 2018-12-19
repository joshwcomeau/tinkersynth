import { occludeLineIfNecessary } from './Slopes.helpers';

describe('occludeLineIfNecessary', () => {
  const width = 10;
  const height = 10;

  describe.skip('unrelated lines', () => {
    const previousLines = [[[0, 20], [1, 40]]];
    const line = [[0, 10], [1, 20]];

    // Should be the same for any polarRatio values
    const polarRatioValues = [0, 0.5, 1];

    polarRatioValues.forEach(polarRatio => {
      it(`handles polarRatio ${polarRatio}`, () => {
        expect(
          occludeLineIfNecessary(line, previousLines, width, height, polarRatio)
        ).toEqual(line);
      });
    });
  });

  describe.skip('totally obscured lines', () => {
    const previousLines = [[[0, 5], [1, 10]]];
    const line = [[0, 10], [1, 20]];

    // Should be the same for any polarRatio values
    const polarRatioValues = [0, 0.5, 1];

    polarRatioValues.forEach(polarRatio => {
      it(`handles polarRatio ${polarRatio}`, () => {
        expect(
          occludeLineIfNecessary(line, previousLines, width, height, polarRatio)
        ).toEqual(null);
      });
    });
  });

  describe('with polarRatio 0', () => {
    const polarRatio = 0;

    it('handles a line being obscured', () => {
      const previousLines = [[[3, 6], [4, 8]]];
      const line = [[3, 7], [4, 7]];

      const intersection = [3.5, 7];

      const expectedTruncatedLine = [line[0], intersection];

      expect(
        occludeLineIfNecessary(line, previousLines, width, height, polarRatio)
      ).toEqual(expectedTruncatedLine);
    });
  });
});
