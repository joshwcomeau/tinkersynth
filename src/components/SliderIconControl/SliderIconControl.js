// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, CONTROL_RADIUS, UNIT } from '../../constants';

import Column from '../Column';
import Slider from '../Slider';

type Props = {
  value: number,
  updateValue: (val: number) => void,
  width: number,
  height: number,
  spacing?: number,
  isDisabled: boolean,
  visualizationComponent: any,
  isAnimated: boolean,
  isPoweredOn: boolean,
};

const SliderIconControl = ({
  value,
  updateValue,
  width,
  height,
  spacing = 4,
  isDisabled,
  visualizationComponent,
  isAnimated,
  isPoweredOn,
  ...sliderProps
}: Props) => {
  const sliderIconSize = width;

  const sliderWidth = width - spacing * 2;
  const sliderHeight = height - sliderIconSize - spacing * 2;

  const Visualization = visualizationComponent;

  return (
    <Wrapper>
      <VisualizationWrapper
        style={{
          width: sliderIconSize,
          height: sliderIconSize,
          opacity: isPoweredOn ? 1 : 0,
          transition: !isPoweredOn ? 'opacity 400ms' : null,
        }}
        onClick={() => {
          if (!isPoweredOn) {
            return;
          }

          return value > 50 ? updateValue(0) : updateValue(100);
        }}
      >
        <Visualization
          size={sliderIconSize}
          value={value}
          isAnimated={isAnimated}
        />
      </VisualizationWrapper>

      <SliderWrapper style={{ width, padding: spacing }}>
        <Slider
          value={value}
          updateValue={updateValue}
          width={sliderWidth}
          height={sliderHeight}
          isDisabled={isDisabled || !isPoweredOn}
          {...sliderProps}
        />
      </SliderWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  background: ${COLORS.gray[1000]};
  border-radius: ${CONTROL_RADIUS}px;
`;

const VisualizationWrapper = styled.div`
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px;
`;

// $FlowIgnore
export default React.memo(SliderIconControl);
