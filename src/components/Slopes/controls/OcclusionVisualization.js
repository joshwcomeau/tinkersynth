// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';

import EndlessRotation from '../../EndlessRotation';
import { Line1, Line2 } from './OcclusionLines';

type Props = {
  width: number,
  height: number,
  value: number,
};

const OcclusionVisualization = ({ width, height, value }: Props) => {
  const LINES_WIDTH = 193;
  const LINES_HEIGHT = 16;

  // Scale that to match the available height.
  const scaledLineWidth = (LINES_WIDTH * height) / LINES_HEIGHT;

  return (
    <Wrapper style={{ width, height }}>
      <InnerWrapper style={{ width: scaledLineWidth }}>
        <EndlessRotation
          duration={10000}
          repeatAfter={80}
          style={{ position: 'absolute', top: -2 }}
        >
          <Line2 height={height} color={COLORS.yellow[500]} />
        </EndlessRotation>
        <EndlessRotation
          duration={7500}
          repeatAfter={80}
          style={{ position: 'absolute' }}
        >
          <Line1 height={height} color={COLORS.violet[500]} occluded={value} />
        </EndlessRotation>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  position: relative;
`;

export default OcclusionVisualization;
