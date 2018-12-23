import {
  isPointValid,
  arePointsEqual,
  getDistanceBetweenPoints,
  createDashedLine,
  getSlopeAndInterceptForLine,
  groupPolylines,
  getValuesForBezierCurve,
  retraceLines,
  getDistanceToBezierCurve,
} from './line.helpers';

describe('isPointValid', () => {
  it('accepts a regular point', () => {
    const p1 = [3, 6];

    expect(isPointValid(p1)).toBe(true);
  });

  it('accepts a negative point', () => {
    const p1 = [-3, 0];

    expect(isPointValid(p1)).toBe(true);
  });

  it('does not accept a 3D point', () => {
    const p1 = [-3, 0, 1];

    expect(isPointValid(p1)).toBe(false);
  });

  it('does not accept an alternative format', () => {
    const p1 = { x: 1, y: 3 };

    expect(isPointValid(p1)).toBe(false);
  });
});

describe('arePointsEqual', () => {
  it('Checks two identical points for equality', () => {
    const p1 = [0, 1];
    const p2 = [0, 1];

    expect(arePointsEqual(p1, p2)).toBe(true);
  });

  it('Checks two different points for equality', () => {
    const p1 = [0, 1];
    const p2 = [1, 0];

    expect(arePointsEqual(p1, p2)).toBe(false);
  });
});

describe('getDistanceBetweenPoints', () => {
  it('calculates the hypothenuse', () => {
    const p1 = [0, 0];
    const p2 = [3, 4];

    const expectedOutput = 5;
    const actualOutput = getDistanceBetweenPoints(p1, p2);

    expect(actualOutput).toEqual(expectedOutput);
  });

  it('starts from non-zero', () => {
    const p1 = [5, 5];
    const p2 = [8, 9];

    const expectedOutput = 5;
    const actualOutput = getDistanceBetweenPoints(p1, p2);

    expect(actualOutput).toEqual(expectedOutput);
  });
});
it('creates a small horizontal 4-dotted line', () => {
  describe('createDashedLine', () => {
    const p1 = [0, 0];
    const p2 = [5, 0];
    const numOfDashes = 5;
    const dashLength = 0.01;

    const actualOutput = createDashedLine({
      p1,
      p2,
      numOfDashes,
      dashLength,
    });
    const expectedOutput = [
      [[0, 0], [0.01, 0]],
      [[1, 0], [1.01, 0]],
      [[2, 0], [2.0100000000000002, 0]], // yayyyyy javascript
      [[3, 0], [3.01, 0]],
      [[4, 0], [4.01, 0]],
    ];

    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe('getSlopeAndInterceptForLine', () => {
  it('calculates the slope/intercept for an offset line', () => {
    const p1 = [0, 2];
    const p2 = [2, 4];

    const expectedSolution = { slope: 1, intercept: 2 };
    const actualSolution = getSlopeAndInterceptForLine([p1, p2]);

    expect(actualSolution).toEqual(expectedSolution);
  });

  it('calculates the slope/intercept for a steep line', () => {
    const p1 = [-1, -5];
    const p2 = [1, 5];

    const expectedSolution = { slope: 5, intercept: 0 };
    const actualSolution = getSlopeAndInterceptForLine([p1, p2]);

    expect(actualSolution).toEqual(expectedSolution);
  });

  it('calculates the slope/intercept for a parallel-to-X line', () => {
    const p1 = [0, 4];
    const p2 = [2, 4];

    const expectedSolution = { slope: 0, intercept: 4 };
    const actualSolution = getSlopeAndInterceptForLine([p1, p2]);

    expect(actualSolution).toEqual(expectedSolution);
  });
});

describe('groupPolylines', () => {
  it('ignores totally unconnected lines', () => {
    const line1 = [[0, 0], [1, 1]];
    const line2 = [[2, 3], [4, 5]];
    const line3 = [[6, 7], [8, 9]];

    const lines = [line1, line2, line3];

    const actualSolution = groupPolylines(lines);
    const expectedSolution = lines;

    expect(actualSolution).toEqual(expectedSolution);
  });

  it('groups 3 contiguous lines', () => {
    const line1 = [[0, 0], [1, 1]];
    const line2 = [[1, 1], [2, 2]];
    const line3 = [[2, 2], [3, 3]];

    const lines = [line1, line2, line3];

    const actualSolution = groupPolylines(lines);
    const expectedSolution = [[[0, 0], [1, 1], [2, 2], [3, 3]]];

    expect(actualSolution).toEqual(expectedSolution);
  });

  it('handles gaps between groups', () => {
    const line1 = [[0, 0], [1, 1]];
    const line2 = [[1, 1], [2, 2]];
    const line3 = [[3, 3], [4, 10]]; // gap 1
    const line4 = [[4, 10], [5, 2]];
    const line5 = [[5, 5], [6, 8]]; // gap 2

    const lines = [line1, line2, line3, line4, line5];

    const actualSolution = groupPolylines(lines);
    const expectedSolution = [
      [[0, 0], [1, 1], [2, 2]],
      [[3, 3], [4, 10], [5, 2]],
      [[5, 5], [6, 8]],
    ];

    expect(actualSolution).toEqual(expectedSolution);
  });
});

describe('getValuesForBezierCurve', () => {
  it('Finds the initial value for a quadratic bezier curve', () => {
    const curve = {
      startPoint: [0, 0],
      endPoint: [1, 1],
      controlPoint1: [1, 0],
    };
    const ratio = 0;

    const actualValue = getValuesForBezierCurve(curve, ratio);
    const expectedValue = [0, 0];

    expect(actualValue).toEqual(expectedValue);
  });

  it('Finds the final value for a quadratic bezier curve', () => {
    const curve = {
      startPoint: [0, 0],
      endPoint: [1, 1],
      controlPoint1: [1, 0],
    };
    const ratio = 1;

    const actualValue = getValuesForBezierCurve(curve, ratio);
    const expectedValue = [1, 1];

    expect(actualValue).toEqual(expectedValue);
  });

  it('Finds a midpoint value for a quadratic bezier curve', () => {
    const curve = {
      startPoint: [0, 0],
      endPoint: [1, 1],
      controlPoint1: [1, 0],
    };
    const ratio = 0.5;

    const actualValue = getValuesForBezierCurve(curve, ratio);
    const expectedValue = [0.75, 0.25];

    expect(actualValue).toEqual(expectedValue);
  });

  it('Finds the initial value for a cubic bezier curve', () => {
    const curve = {
      startPoint: [0, 0],
      endPoint: [1, 1],
      controlPoint1: [1, 0],
      controlPoint2: [0, 1],
    };
    const ratio = 0;

    const actualValue = getValuesForBezierCurve(curve, ratio);
    const expectedValue = [0, 0];

    expect(actualValue).toEqual(expectedValue);
  });

  it('Finds the final value for a cubic bezier curve', () => {
    const curve = {
      startPoint: [0, 0],
      endPoint: [1, 1],
      controlPoint1: [1, 0],
      controlPoint2: [0, 1],
    };
    const ratio = 1;

    const actualValue = getValuesForBezierCurve(curve, ratio);
    const expectedValue = [1, 1];

    expect(actualValue).toEqual(expectedValue);
  });

  it('Finds a midpoint value for a cubic bezier curve', () => {
    const curve = {
      startPoint: [0, 0],
      endPoint: [1, 1],
      controlPoint1: [1, 0],
      controlPoint2: [1, 0],
    };
    const ratio = 0.25;

    const actualValue = getValuesForBezierCurve(curve, ratio);
    const expectedValue = [0.578125, 0.015625];

    expect(actualValue).toEqual(expectedValue);
  });
});

describe('retraceLines', () => {
  it('retraces a simple line', () => {
    // prettier-ignore
    const polylines = [
      [[0, 0], [2, 2]]
    ];

    const actualValue = retraceLines(polylines, 4);
    const expectedValue = [
      [[0, 0], [2, 2]],
      [[2, 2], [0, 0]],
      [[0, 0], [2, 2]],
      [[2, 2], [0, 0]],
    ];

    expect(actualValue).toEqual(expectedValue);
  });
});

describe('getDistanceToBezierCurve', () => {
  it('finds a point on a straight line quadratic bezier', () => {
    const curve = {
      startPoint: [0.5, 0],
      controlPoint1: [0.5, 0.5],
      endPoint: [0.5, 1],
    };

    const point = [0, 0];

    const expectedResult = 0.5;
    const actualResult = getDistanceToBezierCurve({ point, curve });

    expect(actualResult).toEqual(expectedResult);
  });

  it('finds a point on a straight line cubic bezier', () => {
    const curve = {
      startPoint: [0.5, 0],
      controlPoint1: [0.5, 0.33],
      controlPoint2: [0.5, 0.66],
      endPoint: [0.5, 1],
    };

    const point = [0, 0];

    const expectedResult = 0.5;
    const actualResult = getDistanceToBezierCurve({
      point,
      curve,
    });

    expect(actualResult).toEqual(expectedResult);
  });

  it('finds a point on a curved cubic bezier', () => {
    const curve = {
      startPoint: [0, 0],
      controlPoint1: [1, 0],
      controlPoint2: [0, 1],
      endPoint: [1, 1],
    };

    const point = [0.25, 0.25];

    const expectedResult = 0.20366639388961552;
    const actualResult = getDistanceToBezierCurve({
      point,
      curve,
    });

    expect(actualResult).toEqual(expectedResult);
  });
});
