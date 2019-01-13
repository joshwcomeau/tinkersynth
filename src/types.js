// @flow

export type Point = [number, number];

export type Curve = {
  startPoint: Point,
  controlPoint1: Point,
  controlPoint2?: Point,
  endPoint: Point,
};

export type SetNumber = (val: number) => void;

export type ToastType = 'success' | 'error' | 'notice';
export type Toast = {
  id: string,
  type: ToastType,
  title?: string,
  message: string,
};
