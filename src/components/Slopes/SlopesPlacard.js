import React from 'react';
import styled from 'styled-components';

import slopesPlacardSrc from '../../images/slopes-placard.svg';
import analytics from '../../services/analytics.service';

import { SlopesContext } from './SlopesState';
import Spacer from '../Spacer';
import Screw from '../Screw';
import PopcornKernel from '../PopcornKernel';
import Falling from '../Falling';

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

type Props = {
  handleRemoval: () => void,
};
const SlopesPlacard = ({ handleRemoval, enableMirrored }: Props) => {
  const wasMirroredOnMount = React.useRef(enableMirrored);

  if (wasMirroredOnMount.current) {
    return null;
  }

  const [isFalling, setIsFalling] = React.useState(false);
  const [hangingOffSide, setHangingOffSide] = React.useState(null);

  const [attachedScrews, setAttachedScrews] = React.useState({
    left: true,
    right: true,
  });

  const handlePop = id => {
    const isFirstScrew = Object.values(attachedScrews).every(
      screwKey => !!screwKey
    );

    // The first screw triggers a different event from the second.
    // This is so I can gauge how many people make the logical jump from 1 to 2.
    const eventName = isFirstScrew
      ? 'pop-first-easter-egg-screw'
      : 'discover-easter-egg-control';
    analytics.logEvent(eventName);

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
      handleRemoval();
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

export default SlopesPlacard;
