// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';

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

  const isOccluded = value;

  // Scale that to match the available height.
  const scaledLineWidth = (LINES_WIDTH * height) / LINES_HEIGHT;

  const frontLineOffset = isOccluded ? -85 : -100;

  const backLineOffset = isOccluded ? -40 : -70;

  return (
    <Wrapper style={{ width, height }}>
      <InnerWrapper style={{ width: scaledLineWidth }}>
        <div style={{ position: 'absolute', top: 2 }}>
          <OcclusionLine
            version={2}
            height={height}
            color={COLORS.yellow[500]}
            offset={frontLineOffset}
          />
        </div>
        <div style={{ position: 'absolute' }}>
          <OcclusionLine
            version={1}
            height={height}
            color={COLORS.yellow[300]}
            isOccluded={isOccluded}
            offset={backLineOffset}
          />
        </div>
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
