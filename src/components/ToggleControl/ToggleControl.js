// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import Toggle from '../Toggle';
import useHoverElement from '../../hooks/hover-element';

type RenderProps = {
  width: number,
  height: number,
  value: number,
};

type Props = {
  ...RenderProps,
  updateValue: (isToggled: boolean) => void,
  renderVisualization: (props: RenderProps) => React$Element,
};

// TODO: Make me a shared constant with SliderControl
const BORDER_RADIUS = 3;

const ToggleControl = ({
  width,
  height,
  value,
  updateValue,
  renderVisualization,
}: Props) => {
  const visualizationRatio = 0.6;

  const visualizationSpacing = UNIT / 2;
  const visualizationWidth = width - visualizationSpacing * 2;
  const visualizationHeight =
    height * visualizationRatio - visualizationSpacing * 2;

  const [ref, isHovering] = useHoverElement();

  return (
    <Wrapper ref={ref} style={{ width, height }}>
      <VisualizationWrapper style={{ height: height * visualizationRatio }}>
        {renderVisualization({
          width: visualizationWidth,
          height: visualizationHeight,
          runAnimation: isHovering,
          value,
        })}
      </VisualizationWrapper>
      <ToggleWrapper style={{ height: height - height * visualizationRatio }}>
        <Toggle
          width={60}
          height={20}
          isToggled={value}
          handleToggle={updateValue}
        />
      </ToggleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray[900]};
  border-radius: ${BORDER_RADIUS}px;
`;

const VisualizationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${UNIT / 2}px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0;
`;

export default ToggleControl;
