// @flow

type Point = [number, number];

type Curve = {
  startPoint: Point,
  controlPoint1: Point,
  controlPoint2?: Point,
  endPoint: Point,
};

type SetNumber = (val: number) => void;
