// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

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

// TODO: Make me a shared constant with SliderControl
const BORDER_RADIUS = 3;

const ToggleControl = ({
  width,
  height,
  value,
  updateValue,
  renderVisualization,
}: Props) => {
  const halfHeight = height / 2;

  return (
    <Wrapper style={{ width, height }}>
      <SubWrapper style={{ height: halfHeight }}>
        {renderVisualization({ width, height: halfHeight, value })}
      </SubWrapper>
      <ToggleWrapper style={{ height: halfHeight }}>
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

const SubWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleWrapper = styled(SubWrapper)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 ${BORDER_RADIUS}px ${BORDER_RADIUS}px 0;
`;

export default ToggleControl;
