import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import UnstyledButton from '../UnstyledButton';

const CanvasToggle = ({ size = 38, isActive, handleToggle, children }) => {
  const Visualization = visualizationComponent;

  return (
    <Button style={{ width: size, height: size }}>
      <LED
        style={{
          backgroundColor: isActive ? COLORS.green[300] : COLORS.gray[300],
        }}
      />
      {children}
    </Button>
  );
};

const Button = styled(UnstyledButton)`
  position: relative;
  background: ${COLORS.gray[900]};
  border-radius: 4px;
`;

const VisualizationWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const LED = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  margin: auto;
  z-index: 2;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 3px solid ${COLORS.gray[900]};
`;

export default CanvasToggle;
