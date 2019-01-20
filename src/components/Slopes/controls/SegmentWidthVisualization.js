import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { range, normalize } from '../../../utils';
import { createSvgPathForPoints } from '../../../helpers/line.helpers';

import Svg from '../../Svg';

const SegmentWidthVisualization = ({ value, size, isAnimated }) => {
  const spring = useSpring({
    value,
    config: {
      tension: 80,
      friction: 14,
    },
    immediate: !isAnimated,
  });

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Svg width={size} height={size} fill="none">
        {/* TODO */}
      </Svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SegmentWidthVisualization;
