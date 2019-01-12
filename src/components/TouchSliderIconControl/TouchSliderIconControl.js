import React from 'react';
import styled from 'styled-components';

import TouchSlider from '../TouchSlider';
import { COLORS, CONTROL_RADIUS } from '../../constants';
import Spacer from '../Spacer';

type Props = {
  value: number,
  updateValue: (num: number) => void,
  width: number,
  height: number,
  dotSize?: number,
  visualizationComponent: any,
};

const TouchSliderIconControl = ({
  value,
  updateValue,
  width,
  height,
  dotSize = 3,
  visualizationComponent,
}: Props) => {
  const iconSize = height;

  const touchSliderWidth = width - iconSize;

  const Visualization = visualizationComponent;

  return (
    <Wrapper style={{ width }}>
      <IconWrapper style={{ width: iconSize, height: iconSize }}>
        <Visualization value={value} size={iconSize} />
      </IconWrapper>

      <Spacer size={0} />

      <TouchSliderWrapper>
        <TouchSlider
          value={value}
          updateValue={updateValue}
          width={touchSliderWidth}
          height={height}
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
  overflow: hidden;
`;

const TouchSliderWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
`;

export default React.memo(TouchSliderIconControl);
