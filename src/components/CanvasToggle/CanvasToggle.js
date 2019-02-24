import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import UnstyledButton from '../UnstyledButton';

const CanvasToggle = ({
  size = 38,
  isActive,
  isPoweredOn,
  handleToggle,
  children,
}) => {
  return (
    <Button
      style={{ width: size, height: size }}
      onClick={handleToggle}
      disabled={!isPoweredOn}
    >
      <LED
        style={{
          backgroundColor: isPoweredOn
            ? isActive
              ? COLORS.green[300]
              : COLORS.gray[300]
            : 'transparent',
        }}
      />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Button>
  );
};

const Button = styled(UnstyledButton)`
  position: relative;
  background: ${COLORS.gray[1000]};
  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 0;
  right: 0;
  bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LED = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: -3px;
  margin: auto;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 3px solid ${COLORS.gray[900]};
`;

export default CanvasToggle;
