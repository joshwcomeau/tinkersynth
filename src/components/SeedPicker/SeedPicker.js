import React from 'react';
import RetroNumbers from 'react-retro-hit-counter';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { chevronUp } from 'react-icons-kit/feather/chevronUp';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';
import { COLORS, UNIT } from '../../constants';

import Spacer from '../Spacer';
import HelpButton from '../HelpButton';

const HEIGHT = 43;

const SeedPicker = () => {
  return (
    <Wrapper>
      <Heading>
        <Label>Seed #</Label>
        <HelpButton />
      </Heading>
      <MainContent>
        <RetroNumbers
          hits={1337}
          size={18}
          minLength={6}
          padding={0}
          digitSpacing={1}
          segmentThickness={2}
          segmentSpacing={0.5}
          withBorder={false}
          segmentActiveColor={COLORS.pink[500]}
          segmentInactiveColor="rgba(242, 24, 188, 0.2)"
          backgroundColor={COLORS.gray[900]}
        />

        <Spacer size={UNIT} />

        <Actions>
          <IncrementDecrementButton>
            <Icon icon={chevronUp} size={16} />
          </IncrementDecrementButton>
          <IncrementDecrementButton>
            <Icon icon={chevronDown} size={16} />
          </IncrementDecrementButton>
        </Actions>
      </MainContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: ${HEIGHT}px;
  background: ${COLORS.gray[900]};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${UNIT}px;
`;

const Label = styled.label`
  font-size: 10px;
  font-weight: bold;
  color: ${COLORS.white};
`;

const MainContent = styled.div`
  padding: ${UNIT}px;
  padding-top: 0;
  padding-right: ${UNIT / 2}px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IncrementDecrementButton = styled.button`
  width: 16px;
  height: 16px;
  padding: 0;
  background: transparent;
  border: none;
  color: white;

  &:active {
    background: ${COLORS.pink[300]};
  }
`;

export default SeedPicker;
