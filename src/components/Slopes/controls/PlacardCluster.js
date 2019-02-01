import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import slopesPlacardSrc from '../../../images/slopes-placard.svg';

import { SlopesContext } from '../SlopesState';
import Spacer from '../../Spacer';
import Screw from '../../Screw';
import PopcornKernel from '../../PopcornKernel';
import Falling from '../../Falling';

import type { ToggleParameterAction } from '../SlopesState';

type Props = {
  width: number,
  height: number,
  enableMirrored: boolean,
  toggleParameter: ToggleParameterAction,
};

const getPlacardContainerStyles = hangingOffside => {
  switch (hangingOffside) {
    case 'left': {
      return {
        transform: 'rotate(10deg)',
        transformOrigin: '3% 60% 0px',
      };
    }

    case 'right': {
      return {
        transform: 'rotate(-12deg)',
        transformOrigin: '94% 60%',
      };
    }

    default: {
      return {};
    }
  }
};

const PlacardCluster = ({ width, height }: Props) => {
  const [isFalling, setIsFalling] = React.useState(false);
  const [hangingOffSide, setHangingOffSide] = React.useState(null);

  const [attachedScrews, setAttachedScrews] = React.useState({
    left: true,
    right: true,
  });

  const handlePop = id => {
    setAttachedScrews({
      ...attachedScrews,
      [id]: false,
    });
  };

  // prettier-ignore
  React.useEffect(() => {
    // Add a brief delay, for effect.
    // TODO: Add a timeoutId, clear on unmount.
    const setAfterDelay = fn => window.setTimeout(fn, 300);

    // prettier-ignore
    if (attachedScrews.left === false && attachedScrews.right === false) {
      setAfterDelay(() => setIsFalling(true));
    } else if (attachedScrews.left === true && attachedScrews.right === false) {
      setAfterDelay(() => setHangingOffSide('left'));
    } else if (attachedScrews.left === false && attachedScrews.right === true) {
      setAfterDelay(() => setHangingOffSide('right'));
    }
  }, [attachedScrews]);

  const placardContainerStyles = getPlacardContainerStyles(hangingOffSide);

  return (
    <Wrapper>
      <LeftScrewWrapper>
        <PopcornKernel
          id="left"
          angle={-100}
          velocity={5}
          handlePop={handlePop}
        >
          <Screw size={7} />
        </PopcornKernel>
      </LeftScrewWrapper>

      <RightScrewWrapper>
        <PopcornKernel
          id="right"
          angle={-60}
          velocity={10}
          handlePop={handlePop}
        >
          <Screw size={7} />
        </PopcornKernel>
      </RightScrewWrapper>

      <Falling isFalling={isFalling}>
        <PlacardWrapper style={placardContainerStyles}>
          <Placard src={slopesPlacardSrc} />
        </PlacardWrapper>
      </Falling>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const ScrewWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 43px;
`;

const LeftScrewWrapper = styled(ScrewWrapper)`
  left: 0px;
`;
const RightScrewWrapper = styled(ScrewWrapper)`
  right: 4px;
`;

const PlacardWrapper = styled.div`
  transition: transform 400ms;
`;

const Placard = styled.img`
  position: relative;
  z-index: 1;
  display: block;
  /*
    The placard spills outside the rectangle.
    Do some translating so that the edges line up as expected.
  */
  transform: translate(-2px, 8px);
`;

const OptimizedPlacardCluster = React.memo(PlacardCluster);

const PlacardClusterContainer = ({ width, height }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPlacardCluster
      width={width}
      height={height}
      enableMirrored={slopesParams.enableMirrored}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

export default PlacardClusterContainer;
