// @flow
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { u2728 as boomIcon } from 'react-icons-kit/noto_emoji_regular/u2728';

import { COLORS, CONTROL_RADIUS } from '../../constants';

import Slider from '../Slider';

type Props = {
  value: number,
  updateValue: (num: number) => void,
  min?: number,
  max?: number,

  width: number,
  height: number,
  spacing?: number,
  visualizationComponent: any,
  isPoweredOn: boolean,
  canBreakOutOfRangeOnKeyboard: boolean,
};

const SliderVideoControl = ({
  value,
  updateValue,
  width,
  height,
  spacing = 4,
  visualizationComponent,
  isPoweredOn,
  canBreakOutOfRangeOnKeyboard,
}: Props) => {
  const isOutOfBounds = value < 0 || value > 100;

  // The `width` provided is for the whole unit.
  const sliderWidth = 28;
  const sliderHeight = height - 8;

  const visualizationWidth = width - sliderWidth - spacing * 4;
  const visualizationHeight = height - spacing * 2;

  const Visualization = visualizationComponent;

  return (
    <Wrapper style={{ width, height }}>
      <VisualizationWrapper
        style={{
          padding: spacing,
          opacity: isPoweredOn ? 1 : 0,
          transition: !isPoweredOn ? 'opacity 400ms' : null,
          backgroundColor: isOutOfBounds && COLORS.red[500],
        }}
        onClick={() => {
          if (!isPoweredOn) {
            return;
          }

          return value > 50 ? updateValue(0) : updateValue(100);
        }}
      >
        <Visualization
          value={value}
          width={visualizationWidth}
          height={visualizationHeight}
          isBroken={isOutOfBounds}
        />
      </VisualizationWrapper>

      <SliderWrapper style={{ padding: 4 }}>
        <Slider
          value={value}
          updateValue={updateValue}
          width={sliderWidth}
          height={sliderHeight}
          extendRange={isOutOfBounds}
          isDisabled={!isPoweredOn}
          canBreakOutOfRangeOnKeyboard={canBreakOutOfRangeOnKeyboard}
        />
      </SliderWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  background: ${COLORS.gray[1000]};
  border-radius: ${CONTROL_RADIUS}px;
`;

const VisualizationWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px 0;
`;

// $FlowIgnore
export default React.memo(SliderVideoControl);
