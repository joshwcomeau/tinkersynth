import React from 'react';
import RetroNumbers from 'react-retro-hit-counter';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { chevronUp } from 'react-icons-kit/feather/chevronUp';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';
import { u2049 as bangQuestion } from 'react-icons-kit/noto_emoji_regular/u2049';

import { COLORS, UNIT } from '../../constants';

import Spacer from '../Spacer';
import UnstyledButton from '../UnstyledButton';

const HEIGHT = 54;

const SeedPicker = ({ seed, setSeed, isPoweredOn }) => {
  return (
    <Wrapper>
      <Heading>
        <Label>Seed #</Label>
      </Heading>
      <MainContent
        style={{ opacity: isPoweredOn ? 1 : 0, transition: 'opacity 600ms' }}
      >
        <RetroNumbers
          hits={seed}
          size={20}
          minLength={6}
          padding={0}
          digitSpacing={2}
          segmentThickness={2}
          segmentSpacing={0.5}
          withBorder={false}
          segmentActiveColor={COLORS.pink[500]}
          segmentInactiveColor="rgba(242, 24, 188, 0.2)"
          backgroundColor="transparent"
        />

        <Spacer size={UNIT} />

        <Actions>
          <IncrementDecrementButton
            disabled={seed === 65535 || !isPoweredOn}
            onClick={() => setSeed(seed + 1)}
          >
            <Icon icon={chevronUp} size={16} />
          </IncrementDecrementButton>
          <IncrementDecrementButton
            disabled={seed === 0 || !isPoweredOn}
            onClick={() => setSeed(seed - 1)}
          >
            <Icon icon={chevronDown} size={16} />
          </IncrementDecrementButton>
        </Actions>
      </MainContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: ${HEIGHT}px;
  background: ${COLORS.gray[1000]};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  height: 22px;
  line-height: 16px;
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
  padding-right: ${UNIT * 0.75}px;
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

const IncrementDecrementButton = styled(UnstyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;

  &:active {
    background: ${COLORS.pink[300]};
  }

  &:disabled {
    cursor: default;
    opacity: 0;
  }

  & svg {
    display: block !important;
  }
`;

export default SeedPicker;
