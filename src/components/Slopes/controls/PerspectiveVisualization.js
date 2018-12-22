// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';

import Grid from './Grid';

const PerspectiveVisualization = ({ width, height, value }) => {
  const ratio = 1 - value / 100;

  const gridHeight = height / 2;
  const gridWidth = gridHeight * (4 / 3);

  const gridRotation = ratio * 80;

  return (
    <Wrapper style={{ width, height }}>
      <GridWrapper
        style={{
          width: gridWidth,
          height: gridHeight,
          transform: `perspective(200px) rotateX(${gridRotation}deg)`,
        }}
      >
        <Grid
          height={gridHeight}
          width={gridWidth}
          rows={6}
          cols={8}
          stroke={COLORS.blue[300]}
          strokeOpacity={0.5}
          strokeWidth={2}
        />
        <svg width={gridWidth} height={gridHeight} />
      </GridWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const GridWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom center;
  transform-style: preserve-3d;
`;

export default PerspectiveVisualization;
