// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT, CONTROL_RADIUS } from '../../constants';

import Toggle from '../Toggle';

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

const ToggleControl = ({
  width,
  height,
  value,
  updateValue,
  renderVisualization,
}: Props) => {
  const visualizationRatio = 0.5;

  const visualizationSpacing = UNIT / 2;
  const visualizationWidth = width - visualizationSpacing * 2;
  const visualizationHeight = Math.floor(
    height * visualizationRatio - visualizationSpacing * 2
  );

  return (
    <Wrapper style={{ width, height }}>
      <VisualizationWrapper style={{ height: height * visualizationRatio }}>
        {renderVisualization({
          width: visualizationWidth,
          height: visualizationHeight,
          value,
        })}
      </VisualizationWrapper>

      <ToggleWrapper style={{ height: height - height * visualizationRatio }}>
        <Toggle
          width={60}
          height={22}
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
  border-radius: ${CONTROL_RADIUS}px;
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
  border-radius: 0 ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px 0;
`;

export default ToggleControl;
