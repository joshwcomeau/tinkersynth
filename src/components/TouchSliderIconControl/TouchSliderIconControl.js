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
  min,
  max,
  dotSize = 3,
  renderVisualization,
}: Props) => {
  const iconSize = height;
  const iconPadding = UNIT / 2;
  const iconInnerSize = iconSize - iconPadding * 2;

  const touchSliderWidth = width - iconSize - UNIT;
  const touchSliderPadding = 2;

  return (
    <Wrapper style={{ width }}>
      <IconWrapper
        style={{ width: iconSize, height: iconSize, padding: iconPadding }}
      >
        {renderVisualization(value, iconInnerSize)}
      </IconWrapper>

      <Spacer size={UNIT} />

      <TouchSliderWrapper style={{ padding: touchSliderPadding }}>
        <TouchSlider
          value={value}
          updateValue={updateValue}
          width={touchSliderWidth}
          height={height - touchSliderPadding * 2}
          min={min}
          max={max}
          dotSize={dotSize}
        />
      </TouchSliderWrapper>
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

const TouchSliderWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
`;

export default TouchSliderIconControl;
