// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, CONTROL_RADIUS, UNIT } from '../../constants';

import Column from '../Column';
import Slider from '../Slider';

const SliderIconControl = ({
  value,
  width,
  height,
  spacing = 4,
  renderIcon,
  ...sliderProps
}) => {
  const sliderIconSize = width;

  const sliderWidth = width - spacing * 2;
  const sliderHeight = height - sliderIconSize - spacing * 2;

  return (
    <Wrapper>
      {renderIcon({ size: sliderIconSize, value })}

      <SliderWrapper style={{ width, padding: spacing }}>
        <Slider
          value={value}
          width={sliderWidth}
          height={sliderHeight}
          {...sliderProps}
        />
      </SliderWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  background: ${COLORS.gray[900]};
  border-radius: ${CONTROL_RADIUS}px;
`;

const SliderWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px;
`;

export default SliderIconControl;
