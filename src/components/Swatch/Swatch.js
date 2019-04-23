// @flow
import React from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';

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
          <Spring
            key={index}
            native
            to={{ x: isSelected ? x : 0, y: isSelected ? y : 0 }}
          >
            {interpolated => (
              <Ball
                color={color}
                x={interpolated.x}
                y={interpolated.y}
                size={ballSize}
                style={{ borderColor: backgroundColor }}
              />
            )}
          </Spring>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
`;

const Ball = styled(animated.div)`
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
  border: 2px solid;
`;

export default Swatch;
