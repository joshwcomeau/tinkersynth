import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';

import RoundHandle from '../RoundHandle';

type PointData = [number, number];

type Props = {
  points: Array<[number, number]>,
  width: number,
  height: number,
  strokeColor?: string,
  strokeWidth?: number,
  updatePoint: (id: number, point: PointData) => void,
};

class BezierCurve extends PureComponent<Props> {
  state = {
    draggingPointId: null,
  };

  static defaultProps = {
    strokeColor: COLORS.pink[700],
    strokeWidth: 6,
  };

  handleSelectPoint = pointId => () => {
    // TODO: Get distance from point center, so that clicking and dragging a
    // new point doesn't center it on the cursor.
    this.setState({ draggingPointId: pointId }, () => {
      window.addEventListener('mousemove', this.handleDrag);
      window.addEventListener('mouseup', this.handleRelease);

      document.body.style.cursor = 'grabbing';
    });
  };

  handleRelease = () => {
    this.setState({ draggingPointId: null });

    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleRelease);

    document.body.style.cursor = null;
  };

  handleDrag = ev => {
    // This event handles both mouseMove and touchMove.
    const [x, y] = [ev.clientX, ev.clientY];

    const { width, height, updatePoint } = this.props;
    const { draggingPointId } = this.state;

    if (!draggingPointId || !updatePoint) {
      return;
    }

    const svgBB = this.node.getBoundingClientRect();
    const positionRelativeToSvg = [x - svgBB.left, y - svgBB.top];

    const positionWithinViewBox = [
      (positionRelativeToSvg[0] * width) / svgBB.width,
      (positionRelativeToSvg[1] * height) / svgBB.height,
    ];

    const rawValue = [
      normalize(positionWithinViewBox[0], 0, width),
      1 - normalize(positionWithinViewBox[1], 0, height),
    ];

    rawValue[0] = clamp(rawValue[0], 0, 1);
    rawValue[1] = clamp(rawValue[1], 0, 1);

    updatePoint(draggingPointId, rawValue);
  };

  render() {
    const { points, width, height, strokeColor, strokeWidth } = this.props;

    // The data we receive is in "raw" form: values range from 0-1, and the
    // coordinate system is inverted (the origin corner is bottom-left, not
    // top-left).
    //
    // Transform this data to be usable in our SVG.
    const [p1, p2, p3, p4] = points.map(([x, y]) => [
      x * width,
      (1 - y) * height,
    ]);

    const curveType = typeof p4 !== 'undefined' ? 'cubic' : 'quadratic';

    const instructions =
      curveType === 'cubic'
        ? `
            M ${p1[0]},${p1[1]}
            C ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}
          `
        : `
            M ${p1[0]},${p1[1]}
            Q ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}
          `;

    const lastPoint = curveType === 'cubic' ? p4 : p3;
    const lastPointId = curveType === 'cubic' ? 'p4' : 'p3';

    const isMobile = false;

    const HANDLE_RADIUS = 10;

    return (
      <Svg width={width} height={height} ref={node => (this.node = node)}>
        <ControlLine x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />
        {curveType === 'quadratic' && (
          <ControlLine x1={p2[0]} y1={p2[1]} x2={p3[0]} y2={p3[1]} />
        )}
        {curveType === 'cubic' && (
          <ControlLine x1={p3[0]} y1={p3[1]} x2={p4[0]} y2={p4[1]} />
        )}
        <path
          d={instructions}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Start point */}
        <PointWrapper
          onMouseDown={this.handleSelectPoint('p1')}
          transform={`translate(${p1[0] - width / 2}, ${p1[1] -
            HANDLE_RADIUS})`}
        >
          <RoundHandle id="bezier-start" size={HANDLE_RADIUS * 2} />
        </PointWrapper>

        {/* Control point 1 */}
        <PointWrapper
          onMouseDown={this.handleSelectPoint('p2')}
          transform={`translate(${p2[0] - width / 2}, ${p2[1] -
            HANDLE_RADIUS})`}
        >
          <RoundHandle
            id="bezier-control"
            size={HANDLE_RADIUS * 2}
            innerColor={COLORS.violet[100]}
            outerColor={COLORS.violet[300]}
          />
        </PointWrapper>

        {/* Control point 2 - currently unused */}
        {curveType === 'cubic' && (
          <PointWrapper
            onMouseDown={this.handleSelectPoint('p3')}
            transform={`translate(${p3[0] - width / 2}, ${p3[1] -
              HANDLE_RADIUS})`}
          >
            <RoundHandle size={HANDLE_RADIUS * 2} />
          </PointWrapper>
        )}

        {/* End point */}
        <PointWrapper
          onMouseDown={this.handleSelectPoint(lastPointId)}
          transform={`translate(${lastPoint[0] - width / 2}, ${lastPoint[1] -
            HANDLE_RADIUS})`}
        >
          <RoundHandle id="bezier-end" size={HANDLE_RADIUS * 2} />
        </PointWrapper>
      </Svg>
    );
  }
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible;
  touch-action: none;
`;

const PointWrapper = styled.g`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const ControlLine = styled.line`
  stroke: ${COLORS.gray[700]};
  stroke-width: 1;
`;

export default BezierCurve;
