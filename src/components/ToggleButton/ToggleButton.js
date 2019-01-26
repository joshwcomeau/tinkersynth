// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import BounceIn from '../BounceIn';

type Props = {
  isToggled: boolean,
  onClick: () => void,
  children: React$Node,
};

const ToggleButton = ({ isToggled, onClick, children }: Props) => {
  // Can't easily use CSS hover because I only want to toggle this when inactive.
  const [isHovered, setHovered] = React.useState(false);

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: isToggled ? 1 : isHovered ? 0.75 : 0.5 }}
    >
      {children}

      {isToggled && (
        <UnderlinePositioner>
          <BounceIn>
            <Underline />
          </BounceIn>
        </UnderlinePositioner>
      )}
    </Button>
  );
};

const Button = styled(UnstyledButton)`
  position: relative;
  font-size: 24px;
  font-weight: 600;
  color: ${COLORS.gray[900]};
`;

const UnderlinePositioner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 4px;
`;

const Underline = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${COLORS.aqua[300]};
`;

export default ToggleButton;
