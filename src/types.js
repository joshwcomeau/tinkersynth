export type Point = [number, number];

export type Line = [Point, Point];
export type Polyline = Array<Point>;

export type Bezier = {
  startPoint: Point,
  controlPoint1: Point,
  controlPoint2?: Point,
  endPoint: Point,
};
