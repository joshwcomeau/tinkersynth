// @flow
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import spritesheetSrc from '../../images/cat-spritesheet.png';

const SPRITESHEET_HEIGHT = 125;
const SPRITESHEET_CELL_WIDTH = 160;

// type SimpleState = {
//   frames: Array<number>,
//   rate: number,
// };

// type TransitionState = {
//   ...SimpleState,
//   transitionFrom: number,
// }

// const actions = {
//   walking: {
//     transition: [],
//     loop: [0, 1, 2],
//   },
// }

type Status = 'walking' | 'sitting' | 'lying-awake' | 'lying-asleep';

type Props = {
  status: Status,
};

const Cat = ({ status }: Props) => {
  console.log(status);
  return (
    <Wrapper
      style={{ height: SPRITESHEET_HEIGHT, width: SPRITESHEET_CELL_WIDTH }}
    >
      <Img status={status} alt="animated kitten" src={spritesheetSrc} />
    </Wrapper>
  );
};

const walkingAnimation = keyframes`
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -4}px);
  }
`;
const sittingAnimation = keyframes`
  from {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -5}px);
  }

  to {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -9}px);
  }
`;

const getAnimationForStatus = ({ status }) => {
  switch (status) {
    case 'walking':
      return css`
        ${walkingAnimation} 750ms steps(4) infinite
      `;
    case 'sitting':
      return css`
        ${sittingAnimation} 1500ms steps(4) infinite
      `;
  }
};

const Wrapper = styled.div`
  overflow: hidden;
`;

const Img = styled.img`
  height: 100%;
  animation: ${getAnimationForStatus};
`;

// $FlowIgnore
export default React.memo(Cat);
