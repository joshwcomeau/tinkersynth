// @flow

export type Point = [number, number];

export type Curve = {
  startPoint: Point,
  controlPoint1: Point,
  controlPoint2?: Point,
  endPoint: Point,
};

export type SetNumber = (val: number) => void;

export type Toast = {
  id: string,
  title?: string,
  message: string,
};

export type Line = Array<Point>;

export type Rows = Array<Array<Line>>;

export type CanvasSize = 'small' | 'medium' | 'large';
