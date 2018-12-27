import React from 'react';
import styled from 'styled-components';

import TouchSlider from '../TouchSlider';
import { UNIT, COLORS, CONTROL_RADIUS } from '../../constants';
import Spacer from '../Spacer';

type Props = {
  value: number,
  updateValue: (num: number) => void,

  width: number,
  height: number,
  dotSize?: number,
  renderVisualization: (value: number, size: number) => React$Element,
};

const TouchSliderIconControl = ({
  value,
  updateValue,
  width,
  height,
  dotSize,
  renderVisualization,
}: Props) => {
  const iconSize = height;
  const iconPadding = UNIT / 2;
  const iconInnerSize = iconSize - iconPadding * 2;

  const touchSliderWidth = width - iconSize - UNIT;

  return (
    <Wrapper style={{ width }}>
      <IconWrapper
        style={{ width: iconSize, height: iconSize, padding: iconPadding }}
      >
        {renderVisualization(value, iconInnerSize)}
      </IconWrapper>

      <Spacer size={UNIT} />

      <TouchSlider
        value={value}
        updateValue={updateValue}
        width={touchSliderWidth}
        height={height}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${COLORS.gray[900]};
  border-radius: ${CONTROL_RADIUS}px;
  display: flex;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TouchSliderIconControl;
