// @flow
import React from 'react';
import RetroNumbers from 'react-retro-hit-counter';
import styled from 'styled-components';

import { COLORS, MIN_NUM_ROWS, MAX_NUM_ROWS } from '../../../constants';
import { normalize } from '../../../utils';

import Svg from '../../Svg';

type Props = {
  size: number,
  value: number,
};

const LineAmountVisualization = ({ size, value }: Props) => {
  const numOfLines = Math.round(
    normalize(value, 0, 100, MIN_NUM_ROWS, MAX_NUM_ROWS)
  );

  const padding = 5;
  const innerSize = size - padding * 2 - 6;

  return (
    <Wrapper style={{ height: size }}>
      <RetroNumbers
        minLength={2}
        hits={numOfLines}
        size={innerSize}
        padding={padding}
        digitSpacing={2}
        segmentThickness={2}
        segmentSpacing={0.5}
        withBorder={false}
        segmentActiveColor={COLORS.pink[500]}
        segmentInactiveColor="rgba(242, 24, 188, 0.2)"
        backgroundColor="transparent"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default LineAmountVisualization;
