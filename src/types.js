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

export type SwatchData = {
  id: string,
  backgroundColor: string,
  foregroundColors: Array<string>,
  positions: Array<{
    x: number,
    y: number,
    size: number,
  }>,
};

export type RenderImageKind =
  | 'main'
  | 'download-transparent'
  | 'download-opaque';
