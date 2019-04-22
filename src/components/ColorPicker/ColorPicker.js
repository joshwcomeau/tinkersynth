import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { chevronUp } from 'react-icons-kit/feather/chevronUp';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';

import { COLORS } from '../../constants';
import artSwatches from '../../art-swatches.js';

import Swatch from '../Swatch';
import UnstyledButton from '../UnstyledButton';

const ColorPicker = ({ size }) => {
  return (
    <Wrapper style={{ width: size * 1.5, height: size }}>
      <Swatches>
        {artSwatches.map(swatch => (
          <SwatchWrapper key={swatch.id} style={{ width: size, height: size }}>
            <Swatch size={size * 0.6} swatch={swatch} />
          </SwatchWrapper>
        ))}
      </Swatches>

      <Controls style={{ width: size / 2 }}>
        <IncrementDecrementButton
          style={{ width: size / 2, height: size / 2 }}
          disabled={false}
          onClick={() => console.log('Click')}
        >
          <Icon icon={chevronUp} size={16} />
        </IncrementDecrementButton>
        <IncrementDecrementButton
          style={{ width: size / 2, height: size / 2 }}
          disabled={false}
          onClick={() => console.log('Click!')}
        >
          <Icon icon={chevronDown} size={16} />
        </IncrementDecrementButton>
      </Controls>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[900]};
  border-radius: 4px;
  overflow: hidden;
  display: flex;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Swatches = styled.div`
  flex: 1;
`;

const SwatchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controls = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray[1000]};
`;

const IncrementDecrementButton = styled(UnstyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

export default ColorPicker;
