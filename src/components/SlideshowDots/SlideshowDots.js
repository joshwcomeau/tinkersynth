// @flow
import React from 'react';
import styled from 'styled-components';

import { range } from '../../utils';
import { COLORS, UNIT } from '../../constants';

import UnstyledButton from '../UnstyledButton';

type Props = {
  selectedIndex: number,
  count: number,
  handleSelect: (index: number) => void,
};

const SlideshowDots = ({ selectedIndex, count, handleSelect }: Props) => {
  return (
    <Wrapper>
      {range(count).map(index => (
        <DotTrigger key={index} onClick={() => handleSelect(index)}>
          <Dot isSelected={index === selectedIndex} />
        </DotTrigger>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DotTrigger = styled(UnstyledButton)`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 ${UNIT / 2}px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: ${COLORS.white};
  opacity: ${props => (props.isSelected ? 1 : 0.5)};
  transform: scale(${props => (props.isSelected ? '1.5, 1.5' : '1, 1')});
  transition: transform 400ms, opacity 400ms;
  will-change: opacity;
`;

export default SlideshowDots;
