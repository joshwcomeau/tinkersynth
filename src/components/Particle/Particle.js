import * as React from 'react';
import { Spring } from 'react-spring';

type Props = {
  size: number,
  top: number,
  left: number,
  angle: number,
  distance: number,
  fadeIn: number,
  spinFrom: number,
};

class Particle extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  static defaultProps = {
    fadeIn: false,
    spinFrom: 0,
  };

  static getDerivedStateFromProps(props) {
    const angleInRads = (props.angle * Math.PI) / 180;

    const x = Math.cos(angleInRads) * props.distance;
    const y = Math.sin(angleInRads) * props.distance;

    return {
      x,
      y,
    };
  }

  render() {
    const { x, y } = this.state;
    const { top, left, distance, fadeIn, spinFrom, children } = this.props;

    const springConfig = {
      tension: 100 - distance * 2,
      friction: 10,
    };

    return (
      <Spring
        from={{ x: 0, y: 0, opacity: fadeIn ? 0 : 1, rotation: spinFrom }}
        to={{ x, y, opacity: 1, rotation: 0 }}
        config={springConfig}
      >
        {interpolated => (
          <div
            style={{
              position: 'absolute',
              top,
              left,
              opacity: interpolated.opacity,
              transform: `translate(${interpolated.x}px, ${interpolated.y}px)`,
            }}
          >
            <div
              style={{
                transform: `rotate(${interpolated.rotation}deg)`,
              }}
            >
              {children}
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Particle;
