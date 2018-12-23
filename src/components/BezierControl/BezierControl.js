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
        viewBoxWidth={width}
        viewBoxHeight={height}
        points={[points.startPoint, points.controlPoint1, points.endPoint]}
        updatePoint={(id, point) => {
          let name;
          switch (id) {
            case 0:
              name = 'startPoint';
              break;

            case 1:
              name = 'controlPoint1';
              break;
            case 2:
              name = 'endPoint';
              break;
            default:
              throw new Error('unsupported ID');
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

const VisualizationWrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const SliderWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px 0;
`;

export default BezierControl;
