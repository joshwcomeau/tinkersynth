// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT, CONTROL_RADIUS } from '../../constants';

import Toggle from '../Toggle';

type Props = {
  width: number,
  height: number,
  value: number,
  updateValue: (isToggled: boolean) => void,
  visualizationComponent: any,
};

const ToggleControl = ({
  width,
  height,
  value,
  updateValue,
  visualizationComponent,
}: Props) => {
  const visualizationRatio = 0.5;

  const visualizationSpacing = UNIT / 2;
  const visualizationWidth = width - visualizationSpacing * 2;
  const visualizationHeight = Math.floor(
    height * visualizationRatio - visualizationSpacing * 2
  );

  const Visualization = visualizationComponent;

  return (
    <Wrapper style={{ width, height }}>
      <VisualizationWrapper
        style={{ height: height * visualizationRatio }}
        onClick={() => updateValue(!value)}
      >
        <Visualization
          value={value}
          width={visualizationWidth}
          height={visualizationHeight}
        />
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

// $FlowIgnore
export default React.memo(ToggleControl);
