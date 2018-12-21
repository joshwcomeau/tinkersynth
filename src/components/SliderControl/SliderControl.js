// @flow
import React from 'react';
import styled from 'styled-components';

import Slider from '../Slider';

type Props = {
  value: number,
  updateValue: (num: number) => void,
  min?: number,
  max?: number,

  width: number,
  height: number,
  spacing?: number,
  renderVisualization: (value: number) => React$Element,
};

const BORDER_RADIUS = 3;

const SliderControl = ({
  value,
  updateValue,
  min = 0,
  max = 1,
  width,
  height,
  spacing = 4,
  renderVisualization,
}: Props) => {
  // The `width` provided is for the whole unit.
  const sliderWidth = 28;
  const sliderHeight = height - spacing * 2;

  const visualizationWidth = width - sliderWidth - spacing * 4;
  const visualizationHeight = height - spacing * 2;

  return (
    <Wrapper style={{ width, height }}>
      <VisualizationWrapper style={{ padding: spacing }}>
        {renderVisualization({
          value,
          width: visualizationWidth,
          height: visualizationHeight,
        })}
      </VisualizationWrapper>

      <SliderWrapper style={{ padding: spacing }}>
        <Slider
          value={value}
          updateValue={updateValue}
          min={min}
          max={max}
          width={sliderWidth}
          height={sliderHeight}
        />
      </SliderWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  background: #2b2b2b;
  border-radius: ${BORDER_RADIUS}px;
`;

const VisualizationWrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const SliderWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0;
`;

export default SliderControl;
