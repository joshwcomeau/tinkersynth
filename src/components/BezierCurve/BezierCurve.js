import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { COLORS, CONTROL_RADIUS } from '../../constants';
import { clamp, normalize } from '../../utils';

import RoundHandle from '../RoundHandle';
import Background from './Background';

type PointData = [number, number];

type Props = {
  width: number,
  height: number,
  isAnimated: boolean,
  points: Array<[number, number]>,
  strokeColor?: string,
  strokeWidth?: number,
  updatePoint: (id: number, point: PointData) => void,
};

const HANDLE_RADIUS = 10;
const BORDER_WIDTH = 12;
const DOT_SPACING = 15;

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

    const svgWidth = width - BORDER_WIDTH * 2;
    const svgHeight = height - BORDER_WIDTH * 2;

    if (!draggingPointId || !updatePoint) {
      return;
    }

    const svgBB = this.node.getBoundingClientRect();
    const positionRelativeToSvg = [x - svgBB.left, y - svgBB.top];

    const positionWithinViewBox = [
      (positionRelativeToSvg[0] * svgWidth) / svgBB.width,
      (positionRelativeToSvg[1] * svgHeight) / svgBB.height,
    ];

    const rawValue = [
      normalize(positionWithinViewBox[0], 0, svgWidth),
      1 - normalize(positionWithinViewBox[1], 0, svgHeight),
    ];

    rawValue[0] = clamp(rawValue[0], 0, 1);
    rawValue[1] = clamp(rawValue[1], 0, 1);

    updatePoint(draggingPointId, rawValue);
  };

  render() {
    const {
      points,
      width,
      height,
      isAnimated,
      strokeColor,
      strokeWidth,
    } = this.props;

    const svgWidth = width - BORDER_WIDTH * 2;
    const svgHeight = height - BORDER_WIDTH * 2;

    // The data we receive is in "raw" form: values range from 0-1, and the
    // coordinate system is inverted (the origin corner is bottom-left, not
    // top-left).
    //
    // Transform this data to be usable in our SVG.
    const [p1, p2, p3, p4] = points.map(([x, y]) => [
      x * svgWidth,
      (1 - y) * svgHeight,
    ]);

    const curveType = typeof p4 !== 'undefined' ? 'cubic' : 'quadratic';

    const getInstructions = (p1, p2, p3, p4) =>
      `
        M ${p1[0]},${p1[1]}
        Q ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}
      `;

    // NOTE: I'm assuming for now that this is a quadratic bezier curve, not
    // a cubic one. If I want to restore cubic behaviour, check out what this
    // fine looked like in 9e22f4a0ea3dd3c7f0193fdad57826daa21f26b5 or earlier.
    return (
      <Spring to={{ p1, p2, p3, p4 }} immediate={!isAnimated}>
        {interpolated => (
          <Wrapper style={{ width, height }}>
            <Svg
              width={svgWidth}
              height={svgHeight}
              ref={node => (this.node = node)}
            >
              <Background
                width={svgWidth}
                height={svgHeight}
                squareSize={DOT_SPACING}
              />

              <ControlLine
                x1={interpolated.p1[0]}
                y1={interpolated.p1[1]}
                x2={interpolated.p2[0]}
                y2={interpolated.p2[1]}
              />
              <ControlLine
                x1={interpolated.p2[0]}
                y1={interpolated.p2[1]}
                x2={interpolated.p3[0]}
                y2={interpolated.p3[1]}
              />

              <path
                d={getInstructions(
                  interpolated.p1,
                  interpolated.p2,
                  interpolated.p3,
                  interpolated.p4
                )}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />

              {/* Start point */}
              <PointWrapper
                onMouseDown={this.handleSelectPoint('p1')}
                transform={`
                  translate(
                    ${interpolated.p1[0] - svgWidth / 2},
                    ${interpolated.p1[1] - HANDLE_RADIUS}
                  )
                `}
              >
                <RoundHandle id="bezier-start" size={HANDLE_RADIUS * 2} />
              </PointWrapper>

              {/* Control point 1 */}
              <PointWrapper
                onMouseDown={this.handleSelectPoint('p2')}
                transform={`
                  translate(
                    ${interpolated.p2[0] - svgWidth / 2},
                    ${interpolated.p2[1] - HANDLE_RADIUS}
                  )
                `}
              >
                <RoundHandle
                  id="bezier-control"
                  size={HANDLE_RADIUS * 2}
                  innerColor={COLORS.violet[100]}
                  outerColor={COLORS.violet[300]}
                />
              </PointWrapper>

              {/* End point */}
              <PointWrapper
                onMouseDown={this.handleSelectPoint('p3')}
                transform={`
                  translate(
                    ${interpolated.p3[0] - svgWidth / 2},
                    ${interpolated.p3[1] - HANDLE_RADIUS}
                  )
                `}
              >
                <RoundHandle id="bezier-end" size={HANDLE_RADIUS * 2} />
              </PointWrapper>
            </Svg>
          </Wrapper>
        )}
      </Spring>
    );
  }
}

const Wrapper = styled.div`
  border-width: ${BORDER_WIDTH}px;
  border-style: solid;
  border-color: ${COLORS.gray[900]};
  border-radius: ${CONTROL_RADIUS}px;
`;

const Svg = styled.svg`
  position: relative;
  display: block;
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
