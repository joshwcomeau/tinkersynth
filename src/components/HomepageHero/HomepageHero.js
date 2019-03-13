import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';
import ImageCache from '../../vendor/image-cache';

import { COLORS, UNIT, BREAKPOINTS } from '../../constants';
import { range, smoothScrollTo } from '../../utils';
import { getDeviceType } from '../../helpers/responsive.helpers';
import useInterval from '../../hooks/interval.hook';

import artDemo1 from '../../images/art-demo-1.png';
import artDemo2 from '../../images/art-demo-2.png';
import artDemo3 from '../../images/art-demo-3.png';
import artDemo4 from '../../images/art-demo-4.png';
import artDemo5 from '../../images/art-demo-5.png';
import artDemo6 from '../../images/art-demo-6.png';
import artDemo7 from '../../images/art-demo-7.png';
import artDemo8 from '../../images/art-demo-8.png';
import artDemo9 from '../../images/art-demo-9.png';

import UnstyledButton from '../UnstyledButton';
import FadeOnChange from '../FadeOnChange';
import Link from '../Link';
import SlideshowDots from '../SlideshowDots';
import Spacer from '../Spacer';
import HomepageGetStartedButton from '../HomepageGetStartedButton';

const images = [
  artDemo3,
  artDemo2,
  artDemo7,
  artDemo1,
  artDemo4,
  artDemo5,
  artDemo9,
  artDemo6,
  artDemo8,
];

const isMobile = getDeviceType() === 'mobile';

const FRAME_DURATION = 5000;
const EXTENDED_FRAME_DURATION = 15000;

const useArrowKeys = (callback, dependencies) => {
  React.useEffect(() => {
    const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    const handleKeydown = ev => {
      // Ignore non-arrow keypresses.
      if (!arrows.includes(ev.key)) {
        return;
      }

      callback(ev.key);
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, dependencies);
};

const HomepageHero = () => {
  const [imageIndex, setImageIndex] = React.useState(0);
  const [slideshowFrameDuration, setSlideshowFrameDuration] = React.useState(
    FRAME_DURATION
  );

  useInterval(() => {
    const nextImageIndex = (imageIndex + 1) % images.length;

    setImageIndex(nextImageIndex);

    if (slideshowFrameDuration === EXTENDED_FRAME_DURATION) {
      setSlideshowFrameDuration(FRAME_DURATION);
    }
  }, slideshowFrameDuration);

  const manuallyTriggerSlideshow = index => {
    setImageIndex(index);
    // Pause the automated slideshow when clicked
    setSlideshowFrameDuration(EXTENDED_FRAME_DURATION);
  };

  // On mount, wait a little bit and then preload all ball images used in
  // this visualization.
  // We want to preload them so that there's no gap between ball-drops when
  // moving the slider.
  // We want to wait a bit so that we aren't fetching and processing the images
  // during the hectic first couple seconds after initial mount.
  React.useEffect(() => {
    const imagesToPreload = images.slice(1);

    const timeoutId = window.setTimeout(() => {
      ImageCache.stuff(imagesToPreload);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useArrowKeys(
    key => {
      let nextImageIndex;

      if (key === 'ArrowLeft') {
        nextImageIndex = imageIndex - 1;
        if (nextImageIndex < 0) {
          nextImageIndex = images.length - 1;
        }
      } else if (key === 'ArrowRight') {
        nextImageIndex = (imageIndex + 1) % images.length;
      } else {
        return;
      }

      manuallyTriggerSlideshow(nextImageIndex);
    },
    [imageIndex]
  );

  const imageSrc = images[imageIndex];

  return (
    <Hero>
      <Spacer size={UNIT * 8} />

      <Subtitle>Create and purchase</Subtitle>
      <Title>Unique generative art</Title>

      <FadeOnChange changeKey={imageSrc} duration={isMobile ? 0 : 300}>
        <ArtDemo src={imageSrc} />
      </FadeOnChange>
      <SlideshowDots
        selectedIndex={imageIndex}
        count={images.length}
        handleSelect={manuallyTriggerSlideshow}
      />

      <HeroFooter>
        <Subtitle>
          These pieces were created by tinkering with a machine.
          <br />
          Create your own unique work of art, and purchase a fine-art print.
        </Subtitle>
        <Spacer size={UNIT * 9} />

        <HomepageGetStartedButton copy="Start creating" />

        <Spacer size={UNIT * 4} />

        <LearnMoreButton
          onClick={() => smoothScrollTo('#homepage-how-it-works')}
        >
          Or, keep reading
          <Spacer inline size={UNIT} />
          <Icon size={24} icon={chevronDown} />
        </LearnMoreButton>
      </HeroFooter>
    </Hero>
  );
};

const Hero = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0px 32px;
  margin: auto;
  text-align: center;
  color: ${COLORS.white};
`;

const Subtitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  line-height: 1.4;
`;
const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -1px;

  @media ${BREAKPOINTS.sm} {
    font-size: 32px;
  }
`;

const ArtDemo = styled.img`
  width: 100%;
  max-width: 450px;
  backface-visibility: hidden;

  @media (min-width: 450px) {
    max-width: none;
    width: 450px;
    height: 600px;
  }
`;

const HeroFooter = styled.div`
  padding: 96px 0;
`;

const HeroButton = styled(UnstyledButton)`
  width: 270px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
`;

const LearnMoreButton = styled(HeroButton)`
  color: ${COLORS.white};
`;

export default HomepageHero;
