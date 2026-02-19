export type Point = [number, number];

export type Curve = {
  startPoint: Point;
  controlPoint1: Point;
  controlPoint2?: Point;
  endPoint: Point;
};

export type SetNumber = (val: number) => void;

export type Toast = {
  id: string;
  title?: string;
  message: string;
};

export type Line = Array<Point>;

/** Alias for a line (array of points); used in line.helpers */
export type Polyline = Line;

/** Alias for Curve; used in line.helpers for Bezier curves */
export type Bezier = Curve;

export type Rows = Array<Array<Line>>;

export type CanvasSize = 'small' | 'medium' | 'large';

export type SwatchBallPosition = {
  x: number;
  y: number;
  ballSize: number;
};

export type SwatchData = {
  id: string;
  label?: string;
  backgroundColor: string;
  colors: Array<string>;
  getBallPositions: (color: string, parentSize: number) => SwatchBallPosition;
};

export type ColoringMode = 'row' | 'segment';

export type RenderImageKind =
  | 'main'
  | 'download-transparent'
  | 'download-opaque';
