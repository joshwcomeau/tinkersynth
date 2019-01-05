// @flow
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring/hooks';

type Props = {
  width?: number,
  height?: number,
  color: string,
};

const useSelfDrawing = () => {
  const ref = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [strokeDashoffset, setStrokeDashOffset] = useState(0);
  const [transitionLength, setTransitionLength] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      throw new Error('Could not access ref');
    }

    const pathLength = ref.current.getTotalLength();

    setPathLength(pathLength);
    setStrokeDashOffset(pathLength);

    window.requestAnimationFrame(() => {
      setStrokeDashOffset(0);
      const transitionLength = 1000;
      setTransitionLength(transitionLength);
    });
  }, []);

  const strokeDasharray = pathLength;
  const styles = {
    strokeDasharray,
    strokeDashoffset,
    transition: `stroke-dashoffset ${transitionLength}ms`,
  };

  return [ref, styles];
};

export const OpenCircle = ({ width = 8, height = 8, color }: Props) => {
  const [ref, styles] = useSelfDrawing();

  return (
    <svg width={width} height={height} viewBox="0 0 8 8" fill="none">
      <animated.path
        ref={ref}
        d="M6.47029 2.29774C6.82988 2.81958 7.01499 3.4419 6.99905 4.07544C6.98311 4.70898 6.76696 5.3212 6.38158 5.8243C5.9962 6.32741 5.46139 6.69554 4.85386 6.87592C4.24633 7.0563 3.59729 7.03965 2.9998 6.82836C2.40232 6.61707 1.8871 6.22199 1.52802 5.6998C1.16894 5.1776 0.984457 4.5551 1.00103 3.92157C1.01759 3.28804 1.23436 2.67604 1.62024 2.17332C2.00612 1.6706 2.54129 1.303 3.149 1.12323"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles}
      />
    </svg>
  );
};

export const Squiggle = ({ width = 14, height = 5, color }: Props) => {
  const [ref, styles] = useSelfDrawing();

  return (
    <svg width={width} height={height} viewBox="0 0 14 5" fill="none">
      <animated.path
        ref={ref}
        d="M13 1L10.6 4L8.2 0.999999L5.8 4L3.4 0.999999L1 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles}
      />
    </svg>
  );
};

export const Star = ({ width = 12, height = 12, color }: Props) => {
  const [ref, styles] = useSelfDrawing();

  return (
    <svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <animated.path
        ref={ref}
        d="M6 1L7.46946 3.97746L10.7553 4.45492L8.37764 6.77254L8.93893 10.0451L6 8.5L3.06107 10.0451L3.62236 6.77254L1.24472 4.45492L4.53054 3.97746L6 1Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        style={styles}
      />
    </svg>
  );
};

export const Swirl = ({ width = 13, height = 12, color }: Props) => {
  const [ref, styles] = useSelfDrawing();

  return (
    <svg width={width} height={height} viewBox="0 0 13 12" fill="none">
      <animated.path
        ref={ref}
        d="M7 4C7 4 9 6.17154 9 6.99997C9 8.17154 5.82838 7.82839 4.99995 6.99997C4 6.00002 4 4.5 4.99995 3C6.08303 1.37529 8.49996 1.24992 10 2.49997C13 5 12 8.5 11 9.50001C9.06702 11.433 4.49845 11.3652 2.49999 9.50001C0.358775 7.50155 1.49996 2.00001 1.49996 2.00001"
        stroke={color}
        strokeWidth="2"
        style={styles}
      />
    </svg>
  );
};

export const X = ({ width = 6, height = 6, color }: Props) => {
  const [ref, styles] = useSelfDrawing();

  return (
    <svg width={width} height={height} viewBox="0 0 6 6" fill="none">
      <animated.path
        ref={ref}
        d="M1 5L5 1M1 1L3 3L5 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles}
      />
    </svg>
  );
};
