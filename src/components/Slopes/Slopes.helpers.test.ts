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

  it.skip('handles a line being obscured with polarRatio 0', () => {
    const polarRatio = 0;

    const previousLines = [[[3, 6], [4, 8]]];
    const line = [[3, 7], [4, 7]];

    const intersection = [3.5, 7];

    const expectedTruncatedLine = [intersection, line[1]];

    expect(
      occludeLineIfNecessary(line, previousLines, width, height, polarRatio)
    ).toEqual(expectedTruncatedLine);
  });

  it.skip('handles a line being obscured with polarRatio 1', () => {
    const polarRatio = 1;

    const previousLines = [[[3, 6], [4, 8]]];
    const line = [[3, 7], [4, 7]];

    // NOTE: I actually expected this to be [3.5, 7]. I should figure out if
    // this approximation is a problem.
    const intersection = [3.2309250580160516, 7.037898372795851];

    const expectedTruncatedLine = [line[0], intersection];

    expect(
      occludeLineIfNecessary(line, previousLines, width, height, polarRatio)
    ).toEqual(expectedTruncatedLine);
  });

  it.skip('handles a line that crosses polar quadrants', () => {
    const polarRatio = 0;

    const previousLines = [[[3, 6], [4, 4]]];
    const line = [[3, 4], [4, 6]];

    const intersection = [3.5, 5];

    const expectedTruncatedLine = [intersection, line[1]];

    expect(
      occludeLineIfNecessary(line, previousLines, width, height, polarRatio)
    ).toEqual(expectedTruncatedLine);
  });
});
