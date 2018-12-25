import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';
import { normalize } from '../../../utils';

const PeaksCurveStrengthVisualization = ({ value, size }) => {
  const startX = normalize(value, 0, 100, 16, 0);
  const endX = normalize(value, 0, 100, 20, 36);

  return (
    <Wrapper style={{ width: size, height: size }}>
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 36 36"
        style={{ overflow: 'visible' }}
      >
        <path
          d={`
            M ${startX} 36
            Q 18 -36, ${endX} 36
          `}
          fill="none"
          stroke={COLORS.yellow[500]}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PeaksCurveStrengthVisualization;
