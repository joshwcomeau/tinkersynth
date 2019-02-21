import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

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
  isAnimated: boolean,
  isPoweredOn: boolean,
};

const TouchSliderIconControl = ({
  value,
  updateValue,
  width,
  height,
  visualizationComponent,
  isAnimated,
  isPoweredOn,
  ...delegated
}: Props) => {
  const iconSize = height;

  const touchSliderWidth = width - iconSize;

  const Visualization = visualizationComponent;

  return (
    <Wrapper style={{ width }}>
      <IconWrapper
        style={{
          width: iconSize,
          height: iconSize,
          opacity: isPoweredOn ? 1 : 0,
          transition: 'opacity 400ms',
        }}
        onClick={() => {
          if (!isPoweredOn) {
            return;
          }

          return value > 50 ? updateValue(0) : updateValue(100);
        }}
      >
        <Visualization value={value} size={iconSize} isAnimated={isAnimated} />
      </IconWrapper>

      <Spacer size={0} />

      <TouchSliderWrapper>
        <Spring to={{ value }}>
          {interpolated => (
            <TouchSlider
              value={interpolated.value}
              updateValue={updateValue}
              width={touchSliderWidth}
              height={height}
              {...delegated}
            />
          )}
        </Spring>
      </TouchSliderWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${COLORS.gray[1000]};
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
  background: rgba(255, 255, 255, 0.08);
`;

export default React.memo(TouchSliderIconControl);
