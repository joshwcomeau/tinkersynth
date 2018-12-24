// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, CONTROL_RADIUS, UNIT } from '../../constants';

import Column from '../Column';
import Slider from '../Slider';

const SliderIconControl = ({
  width,
  height,
  spacing = 4,
  renderIcon,
  ...sliderProps
}) => {
  const sliderIconSize = width;

  const sliderWidth = width - spacing * 2;
  const sliderHeight = height - sliderIconSize - spacing * 2 - UNIT;

  return (
    <Column>
      <SliderWrapper style={{ width, padding: spacing }}>
        <Slider width={sliderWidth} height={sliderHeight} {...sliderProps} />
      </SliderWrapper>

      <div
        style={{
          width: sliderIconSize,
          height: sliderIconSize,
          background: 'red',
        }}
      />
    </Column>
  );
};

const SliderWrapper = styled.div`
  background: ${COLORS.gray[700]};
  border-radius: ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px;
`;

export default SliderIconControl;
