// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';

import OcclusionLine from './OcclusionLine';

type Props = {
  width: number,
  height: number,
  value: boolean,
};

const OcclusionVisualization = ({ width, height, value }: Props) => {
  const isOccluded = value;

  // Our SVG might be something like 200x10. We want to scale that width to
  // match the provided height (eg. get `400` when our height is `20`).
  const scaledLineWidth =
    (OcclusionLine.viewboxWidth * height) / OcclusionLine.viewboxHeight;

  const frontLineOffset = isOccluded ? -90 : -100;

  const backLineOffset = isOccluded ? -63 : -77;

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
