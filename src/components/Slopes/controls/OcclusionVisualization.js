// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';

import EndlessRotation from '../../EndlessRotation';
import OcclusionLine from './OcclusionLine';

type Props = {
  width: number,
  height: number,
  runAnimation: boolean,
  value: number,
};

const OcclusionVisualization = ({
  width,
  height,
  runAnimation,
  value,
}: Props) => {
  const LINES_WIDTH = 193;
  const LINES_HEIGHT = 16;

  // Scale that to match the available height.
  const scaledLineWidth = (LINES_WIDTH * height) / LINES_HEIGHT;

  return (
    <Wrapper style={{ width, height }}>
      <InnerWrapper style={{ width: scaledLineWidth }}>
        <EndlessRotation
          duration={12500}
          repeatAfter={100 * (4 / 5)}
          run={runAnimation}
          style={{ position: 'absolute', top: 2 }}
        >
          <OcclusionLine
            version={2}
            height={height}
            color={COLORS.yellow[500]}
          />
        </EndlessRotation>
        <EndlessRotation
          duration={7500}
          repeatAfter={100 * (4 / 5)}
          run={runAnimation}
          style={{ position: 'absolute' }}
        >
          <OcclusionLine
            version={1}
            height={height}
            color={COLORS.yellow[300]}
            occluded={value}
          />
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
