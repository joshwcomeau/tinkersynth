import React from 'react';
import { useSpring, animated, interpolate } from 'react-spring/hooks';

import useToggle from '../../hooks/toggle.hook';
import { random, range, normalize } from '../../utils';

const RESOLUTION = 2;

const useBezier = (width, height) => {
  const padding = 8;

  const defaultCurve = {
    startPoint: [padding, height - padding],
    controlPoint1: [width / 2, 0],
    endPoint: [width - padding, height - padding],
  };

  const [curve, setCurve] = React.useState(defaultCurve);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setCurve({
        startPoint: [
          random(padding, padding * 2),
          random(padding, height - padding),
        ],
        controlPoint1: [
          random(padding, width - padding),
          random(-height * 0.3, height),
        ],
        endPoint: [
          random(width - padding * 2, width - padding),
          random(padding, height - padding),
        ],
      });

      timeoutId = window.setTimeout(update, random(250, 1500));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return useSpring({
    startX: curve.startPoint[0],
    startY: curve.startPoint[1],
    controlPointX: curve.controlPoint1[0],
    controlPointY: curve.controlPoint1[1],
    endX: curve.endPoint[0],
    endY: curve.endPoint[1],
    config: { tension: 10, friction: 5 },
  });
};

const LoadingBezier = ({ width = 64, height = 38 }) => {
  const [hasBegun, toggleBegun] = useToggle(false);

  const bezierSpring = useBezier(width, height);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      toggleBegun();
    }, 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <svg width={width} height={height} viewBox="0 0 64 38" fill="none">
      <rect width="64" height="38" rx="4" fill="#2B2B2B" />
      <animated.path
        d={interpolate(
          [
            bezierSpring.startX,
            bezierSpring.startY,
            bezierSpring.controlPointX,
            bezierSpring.controlPointY,
            bezierSpring.endX,
            bezierSpring.endY,
          ],
          (startX, startY, controlPointX, controlPointY, endX, endY) => `
              M ${startX},${startY}
              Q ${controlPointX},${controlPointY}
                ${endX},${endY}`
        )}
        stroke="#FF27FF"
        strokeWidth="4"
        strokeLinecap="round"
        style={{
          opacity: hasBegun ? 1 : 0,
          transition: 'opacity 750ms',
        }}
      />
    </svg>
  );
};

export default LoadingBezier;
