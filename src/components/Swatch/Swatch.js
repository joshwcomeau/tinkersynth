// @flow
import React from 'react';
import styled from 'styled-components';

import { random } from '../../utils';

import type { SwatchData } from '../../types';

type Props = {
  swatch: SwatchData,
  size: number,
  isSelected: boolean,
};

const Swatch = ({ size, isSelected, swatch }: Props) => {
  const { colors, backgroundColor } = swatch;

  return (
    <Wrapper style={{ width: size, height: size, backgroundColor }}>
      {colors.map((color, index) => {
        const { x, y, ballSize } = swatch.getBallPositions(color, size);

        return (
          <Ball
            key={index}
            color={color.hex}
            borderColor={backgroundColor}
            x={x}
            y={y}
            size={ballSize}
          />
        );
      })}
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
  transform: ${props => `translate(${props.x}px, ${props.y}px)}`};
  background-color: ${props => props.color};
  border-radius: 50%;
  border: 2px solid ${props => props.borderColor};
`;

export default Swatch;
