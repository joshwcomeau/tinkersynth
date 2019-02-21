import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spring, animated, interpolate } from 'react-spring';

import { COLORS, CONTROL_RADIUS } from '../../constants';
import { getDeviceType } from '../../helpers/responsive.helpers';
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
  areHandlesVisible: boolean,
  updatePoint: (id: number, point: PointData) => void,
};

const LARGE_HANDLE_RADIUS = 15;
const SMALL_HANDLE_RADIUS = 10;
const BORDER_WIDTH = 12;
const DOT_SPACING = 15;

// Utility method that produces the SVG path directions for the curve, given
// 3 points.
const getInstructions = (p1, p2, p3) =>
  `
  M ${p1[0]},${p1[1]}
  Q ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}
`;

// NOTE: I'm assuming for now that this is a quadratic bezier curve, not
// a cubic one. If I want to restore cubic behaviour, check out what this
// fine looked like in 9e22f4a0ea3dd3c7f0193fdad57826daa21f26b5 or earlier.

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

      window.addEventListener('touchmove', this.handleDrag);
      window.addEventListener('touchend', this.handleRelease);

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
    let x, y;
    if (ev.touches) {
      ev.preventDefault();
      const touch = ev.touches[0];
      [x, y] = [touch.clientX, touch.clientY];
    } else {
      [x, y] = [ev.clientX, ev.clientY];
    }

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
      updatePoint,
      width,
      height,
      isAnimated,
      strokeColor,
      strokeWidth,
      areHandlesVisible,
    } = this.props;

    const svgWidth = width - BORDER_WIDTH * 2;
    const svgHeight = height - BORDER_WIDTH * 2;

    // The data we receive is in "raw" form: values range from 0-1, and the
    // coordinate system is inverted (the origin corner is bottom-left, not
    // top-left).
    //
    // Transform this data to be usable in our SVG.
    const [p1, p2, p3] = points.map(([x, y]) => [
      x * svgWidth,
      (1 - y) * svgHeight,
    ]);

    const curveType = typeof p4 !== 'undefined' ? 'cubic' : 'quadratic';

    const handleKeyDown = (ev, pointId) => {
      const STEP_SIZE = 0.03;

      const pointIndex = pointId.slice(1) - 1;
      const [x, y] = points[pointIndex];

      let newX = x;
      let newY = y;
      switch (ev.key) {
        case 'ArrowLeft': {
          newX = x - STEP_SIZE;
          break;
        }
        case 'ArrowRight': {
          newX = x + STEP_SIZE;
          break;
        }
        case 'ArrowUp': {
          newY = y + STEP_SIZE;
          break;
        }
        case 'ArrowDown': {
          newY = y - STEP_SIZE;
          break;
        }
      }

      updatePoint(pointId, [newX, newY]);
    };

    const handleRadius =
      getDeviceType() === 'mobile' ? LARGE_HANDLE_RADIUS : SMALL_HANDLE_RADIUS;

    return (
      <Spring native to={{ p1, p2, p3 }} immediate={!isAnimated}>
        {sprung => (
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

              <g
                data-layer-name="handles-and-line"
                style={{
                  opacity: areHandlesVisible ? 1 : 0,
                  transition: 'opacity 400ms',
                }}
              >
                <ControlLine
                  x1={sprung.p1.interpolate((x, y) => x)}
                  y1={sprung.p1.interpolate((x, y) => y)}
                  x2={sprung.p2.interpolate((x, y) => x)}
                  y2={sprung.p2.interpolate((x, y) => y)}
                />
                <ControlLine
                  x1={sprung.p2.interpolate((x, y) => x)}
                  y1={sprung.p2.interpolate((x, y) => y)}
                  x2={sprung.p3.interpolate((x, y) => x)}
                  y2={sprung.p3.interpolate((x, y) => y)}
                />

                <animated.path
                  d={interpolate(
                    [sprung.p1, sprung.p2, sprung.p3],
                    getInstructions
                  )}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />

                {/* End point */}
                <PointWrapper
                  onMouseDown={this.handleSelectPoint('p3')}
                  onTouchStart={this.handleSelectPoint('p3')}
                  onKeyDown={ev => handleKeyDown(ev, 'p3')}
                  tabIndex={0}
                  transform={sprung.p3.interpolate(
                    (x, y) => `
                    translate(
                      ${x - svgWidth / 2},
                      ${y - handleRadius}
                    )
                  `
                  )}
                >
                  <RoundHandle id="bezier-end" size={handleRadius * 2} />
                </PointWrapper>

                {/* Control point 1 */}
                <PointWrapper
                  onMouseDown={this.handleSelectPoint('p2')}
                  onTouchStart={this.handleSelectPoint('p2')}
                  onKeyDown={ev => handleKeyDown(ev, 'p2')}
                  tabIndex={0}
                  transform={sprung.p2.interpolate(
                    (x, y) =>
                      `
                    translate(
                      ${x - svgWidth / 2},
                      ${y - handleRadius}
                    )
                  `
                  )}
                >
                  <RoundHandle
                    id="bezier-control"
                    size={handleRadius * 2}
                    innerColor={COLORS.violet[100]}
                    outerColor={COLORS.violet[300]}
                  />
                </PointWrapper>

                {/* Start point */}
                <PointWrapper
                  onMouseDown={this.handleSelectPoint('p1')}
                  onTouchStart={this.handleSelectPoint('p1')}
                  onKeyDown={ev => handleKeyDown(ev, 'p1')}
                  tabIndex={0}
                  transform={sprung.p1.interpolate(
                    (x, y) =>
                      `
                    translate(
                      ${x - svgWidth / 2},
                      ${y - handleRadius}
                    )
                  `
                  )}
                >
                  <RoundHandle id="bezier-start" size={handleRadius * 2} />
                </PointWrapper>
              </g>
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
  border-color: ${COLORS.gray[1000]};
  border-radius: ${CONTROL_RADIUS}px;
`;

const Svg = styled.svg`
  position: relative;
  display: block;
  overflow: visible;
  touch-action: none;
`;

const PointWrapper = styled(animated.g)`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:focus {
    outline: 2px solid ${COLORS.pink[300]};
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

const ControlLine = styled(animated.line)`
  stroke: ${COLORS.gray[700]};
  stroke-width: 1;
`;

export default BezierCurve;
