import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../../constants';

type PointData = [number, number];

type Props = {
  points: Array<[number, number]>,
  viewBoxWidth?: number,
  viewBoxHeight?: number,
  strokeColor?: string,
  strokeWidth?: number,
  grabbable?: boolean,
  updatePoint: (id: number, point: PointData) => void,
};

class BezierCurve extends PureComponent<Props> {
  state = {
    draggingPointId: null,
  };

  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    viewBoxWidth: PropTypes.number,
    viewBoxHeight: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    updatePoint: PropTypes.func,
  };

  static defaultProps = {
    viewBoxWidth: 1000,
    viewBoxHeight: 250,
    strokeColor: COLORS.violet[500],
    strokeWidth: 0.025,
    grabbable: true,
  };

  handleSelectPoint = pointId => () => {
    if (this.props.grabbable) {
      // TODO: Get distance from point center, so that clicking and dragging a
      // new point doesn't center it on the cursor.
      this.setState({ draggingPointId: pointId });
    }
  };

  handleRelease = () => {
    this.setState({ draggingPointId: null });
  };

  handleDrag = ev => {
    // This event handles both mouseMove and touchMove.
    const [x, y] = [ev.clientX, ev.clientY];

    const { viewBoxWidth, viewBoxHeight, updatePoint, grabbable } = this.props;
    const { draggingPointId } = this.state;

    if (!draggingPointId || !grabbable || !updatePoint) {
      return;
    }

    const svgBB = this.node.getBoundingClientRect();
    const positionRelativeToSvg = [x - svgBB.left, y - svgBB.top];

    const positionWithinViewBox = [
      (positionRelativeToSvg[0] * viewBoxWidth) / svgBB.width,
      (positionRelativeToSvg[1] * viewBoxHeight) / svgBB.height,
    ];

    updatePoint(draggingPointId, positionWithinViewBox);
  };

  render() {
    const {
      points,
      viewBoxWidth,
      viewBoxHeight,
      strokeColor,
      strokeWidth,
      grabbable,
    } = this.props;
    const [p1, p2, p3, p4] = points.map(([x, y]) => [x, viewBoxHeight - y]);

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

    return (
      <Svg
        ref={node => (this.node = node)}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        onMouseMove={this.handleDrag}
        onTouchMove={this.handleDrag}
        onMouseUp={this.handleRelease}
        onTouchEnd={this.handleRelease}
      >
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

        <EndPoint
          rx={0.04}
          ry={0.04}
          cx={p1[0]}
          cy={p1[1]}
          onMouseDown={this.handleSelectPoint('p1')}
          onTouchStart={this.handleSelectPoint('p1')}
          grabbable={grabbable}
          isMobile={isMobile}
        />

        <ControlPoint
          rx={0.04}
          ry={0.04}
          cx={p2[0]}
          cy={p2[1]}
          onMouseDown={this.handleSelectPoint('p2')}
          onTouchStart={this.handleSelectPoint('p2')}
          grabbable={grabbable}
          isMobile={isMobile}
        />

        {curveType === 'cubic' && (
          <ControlPoint
            rx={0.04}
            ry={0.04}
            cx={p3[0]}
            cy={p3[1]}
            onMouseDown={this.handleSelectPoint('p3')}
            onTouchStart={this.handleSelectPoint('p3')}
            grabbable={grabbable}
            isMobile={isMobile}
          />
        )}

        <EndPoint
          rx={0.04}
          ry={0.04}
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          onMouseDown={this.handleSelectPoint(lastPointId)}
          onTouchStart={this.handleSelectPoint(lastPointId)}
          grabbable={grabbable}
          isMobile={isMobile}
        />
      </Svg>
    );
  }
}

const ControlPoint = ({
  rx,
  ry,
  cx,
  cy,
  onMouseDown,
  onTouchStart,
  grabbable,
  isMobile,
}) => (
  <g>
    <VisibleControlPoint
      rx={rx}
      ry={ry}
      cx={cx}
      cy={cy}
      grabbable={grabbable}
      isMobile={isMobile}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  </g>
);

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible;
  touch-action: none;
`;

const Point = styled.ellipse`
  cursor: ${props => (props.grabbable ? '-webkit-grab' : 'not-allowed')};

  &:active {
    cursor: ${props => (props.grabbable ? '-webkit-grabbing' : 'not-allowed')};
  }
`;

const EndPoint = styled(Point)`
  fill: ${props => (props.grabbable ? COLORS.pink[500] : COLORS.violet[500])};
`;

const VisibleControlPoint = styled(Point)`
  fill: white;
  stroke: ${props => (props.grabbable ? COLORS.pink[500] : COLORS.violet[500])};
  stroke-width: 0.01;
`;

const ControlLine = styled.line`
  stroke: ${COLORS.gray[300]};
  stroke-width: 0.005;
`;

export default BezierCurve;
