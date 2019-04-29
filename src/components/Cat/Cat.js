// @flow
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import spritesheetSrc from '../../images/cat-spritesheet.png';

const SPRITESHEET_HEIGHT = 125;
const SPRITESHEET_CELL_WIDTH = 160;

type Status =
  | 'walking'
  | 'walk-sit-transition'
  | 'sitting'
  | 'sit-lie-transition'
  | 'lying-awake'
  | 'lying-asleep';

type Props = {
  status: Status,
};

const Cat = ({ status }: Props) => {
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

const walkSitTransitionAnimation = keyframes`
  from {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -4}px);
  }

  to {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -5}px);
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

const sitLieTransitionAnimation = keyframes`
  from {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -9}px);
  }

  to {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -10}px);
  }
`;

const lyingAwakeAnimation = keyframes`
  from {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -10}px);
  }

  to {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -14}px);
  }
`;

const lyingAsleepAnimation = keyframes`
  from {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -14}px);
  }

  to {
    transform: translateX(${SPRITESHEET_CELL_WIDTH * -18}px);
  }
`;

const getAnimationForStatus = ({ status }) => {
  switch (status) {
    case 'walking':
      return css`
        ${walkingAnimation} 750ms steps(4) infinite
      `;
    case 'walk-sit-transition':
      return css`
        ${walkSitTransitionAnimation} 10000ms steps(1) infinite
      `;
    case 'sitting':
      return css`
        ${sittingAnimation} 1500ms steps(4) infinite
      `;
    case 'sit-lie-transition':
      return css`
        ${sitLieTransitionAnimation} 10000ms steps(1) infinite
      `;
    case 'lying-awake':
      return css`
        ${lyingAwakeAnimation} 2000ms steps(4) infinite
      `;
    case 'lying-asleep':
      return css`
        ${lyingAsleepAnimation} 3200ms steps(4) infinite
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
