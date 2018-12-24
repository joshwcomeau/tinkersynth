// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, CONTROL_RADIUS } from '../../constants';

import Slider from '../Slider';
import BezierCurve from '../BezierCurve';

type Point = [number, number];

type BezierCurvePoints = {
  startPoint: Point,
  controlPoint1: Point,
  controlPoint2?: Point,
  endPoint: Point,
};

type Props = {
  points: BezierCurvePoints,
  updatePoint: (name: string, curve: BezierCurvePoints) => void,
  width: number,
  height: number,
};

const BezierControl = ({ points, updatePoint, width, height }: Props) => {
  return (
    <Wrapper style={{ width, height }}>
      <BezierCurve
        width={width}
        height={height}
        points={[points.startPoint, points.controlPoint1, points.endPoint]}
        updatePoint={(id, point) => {
          // The BezierCurve returns a point based on ID, and the coordinates
          // assume a top/left origin.
          // Our curves are named differently, and are based from the
          // bottom-left corner.
          //
          // TODO: It would be much nicer to just update the BezierCurve
          // component to match this project.
          let name;

          switch (id) {
            case 'p1':
              name = 'startPoint';
              break;

            case 'p2':
              name = 'controlPoint1';
              break;
            case 'p3':
              name = 'endPoint';
              break;
            default:
              throw new Error('unsupported ID: ' + id);
          }

          updatePoint(name, point);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  background: ${COLORS.gray[900]};
  border-radius: ${CONTROL_RADIUS}px;
`;

export default BezierControl;
