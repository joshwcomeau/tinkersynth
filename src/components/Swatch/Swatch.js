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
  isAnimated: boolean,
};

const Swatch = ({ swatch, size, isSelected, isAnimated }: Props) => {
  const { colors, backgroundColor } = swatch;

  // The "Jelly Beans" palette has 14 colors, and it's a lot to animate.
  // With that many colors, it won't be obvious if we omit a few.
  // Clamp all palettes to 10 colors or less.
  const colorSubset = colors.slice(0, 10);

  return (
    <Wrapper style={{ width: size, height: size, backgroundColor }}>
      {colorSubset.map((color, index) => {
        const { x, y, ballSize } = swatch.getBallPositions(color, size);

        return (
          <Spring
            key={index}
            native
            immediate={!isAnimated}
            to={{
              transform: `translate(
                ${isSelected ? x : 0}px,
                ${isSelected ? y : 0}px
              )`,
            }}
            config={{
              tension: 500,
              friction: 20,
              mass: ballSize * 0.5,
            }}
          >
            {style => (
              <Ball
                color={color}
                style={{
                  width: ballSize,
                  height: ballSize,
                  backgroundColor: color,
                  borderColor: backgroundColor,
                  ...style,
                }}
              />
            )}
          </Spring>
        );
      })}
      <Border style={{ borderColor: backgroundColor }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
  /* Hide the balls if they spring out of the container */
  overflow: hidden;
`;

const Ball = styled(animated.div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: ${props => props.color};
  border-radius: 50%;
  border: 2px solid;
`;

const Border = styled.div`
  position: absolute;
  z-index: 2;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 3px solid;
  border-radius: 50%;
`;

// $FlowIgnore
export default React.memo(Swatch);
