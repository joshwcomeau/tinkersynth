// @flow
import React from 'react';
import styled from 'styled-components';

import { random } from '../../utils';

import type { Colors } from '../../types';

type Props = {
  colors: Colors,
  size: number,
  isSelected: boolean,
};

const Swatch = ({ size, isSelected, colors }: Props) => {
  const { backgroundColor, foregroundColors } = colors;

  return (
    <Wrapper style={{ width: size, height: size, backgroundColor }}>
      {foregroundColors.map((color, index) => (
        <Ball
          key={index}
          color={color}
          offsetX={random(size * -0.2, size * 0.2)}
          offsetY={random(size * -0.2, size * 0.2)}
          size={random(size * 0.2, size * 0.4)}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
`;

const Ball = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  transform: ${props => `translate(${props.offsetX}px, ${props.offsetY}px)}`};
  background-color: ${props => props.color};
  border-radius: 50%;
`;

export default Swatch;
