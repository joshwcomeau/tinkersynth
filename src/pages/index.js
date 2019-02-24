// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS, UNIT } from '../constants';
import { range } from '../utils';
import useTimeout from '../hooks/timeout.hook';

import homepageVideo0 from '../videos/homepage-demo-0.mp4';
import homepageVideo1 from '../videos/homepage-demo-1.mp4';
import homepageVideo2 from '../videos/homepage-demo-2.mp4';
import homepageVideo3 from '../videos/homepage-demo-3.mp4';
import homepageVideo4 from '../videos/homepage-demo-4.mp4';
import homepageVideo5 from '../videos/homepage-demo-5.mp4';
import homepageVideo7 from '../videos/homepage-demo-7.mp4';

import Layout from '../components/Layout';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Spin from '../components/Spin';
import FadeOnChange from '../components/FadeOnChange';
import HomepageHowItWorks from '../components/HomepageHowItWorks/HomepageHowItWorks';

const loadVideoSrc = src => {
  const videoElem = document.createElement('video');
  videoElem.src = src;
  videoElem.load();

  return new Promise((resolve, reject) => {
    videoElem.addEventListener('canplaythrough', () => {
      console.log('Can play through', src);
      resolve();
    });
  });
};

const getRemainingTime = startTime => {
  const MINIMUM_DISPLAY_LENGTH = 5000;

  let remainingTime;

  const amountOfTimeShownFrame = Date.now() - startTime;

  if (amountOfTimeShownFrame >= MINIMUM_DISPLAY_LENGTH) {
    remainingTime = 1;
  } else {
    remainingTime = MINIMUM_DISPLAY_LENGTH - amountOfTimeShownFrame;
  }

  return remainingTime;
};

const useVideo = () => {
  const videos = [
    homepageVideo0,
    homepageVideo1,
    homepageVideo2,
    homepageVideo3,
    homepageVideo4,
    homepageVideo5,
    homepageVideo7,
  ];

  const initialVideosLoaded = range(videos.length).map(() => false);
  const [videosLoaded, setVideosLoaded] = React.useState(initialVideosLoaded);

  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [timeoutLength, setTimeoutLength] = React.useState(null);

  const currentFrameStartedAt = React.useRef(Date.now());

  React.useEffect(() => {
    const firstVideoSrc = videos[currentVideoIndex];
    const secondVideoSrc = videos[currentVideoIndex + 1];

    loadVideoSrc(firstVideoSrc)
      .then(() => loadVideoSrc(secondVideoSrc))
      .then(() => {
        console.log('First 2 loaded');
        const newVideosLoaded = [...videosLoaded];
        newVideosLoaded[0] = true;
        newVideosLoaded[1] = true;
        setVideosLoaded(newVideosLoaded);

        setTimeoutLength(getRemainingTime(currentFrameStartedAt.current));
      });
  }, []);

  useTimeout(() => {
    console.log('TIMEOUT DONE');
    // Time's up! Swap to the next video
    setTimeoutLength(null);

    const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextVideoIndex);
  }, timeoutLength);

  React.useEffect(
    () => {
      // Skip on the very first time.
      const anyLoadedVideo = videosLoaded.some(videoLoaded => videoLoaded);
      if (!anyLoadedVideo) {
        return;
      }

      // When we switch to a video, we need to do a few things:
      // - set the current frame time
      // - Start loading the next video, if not already loaded
      // - Set the timeout, if it is loaded
      currentFrameStartedAt.current = Date.now();

      const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
      const isNextVideoLoaded = videosLoaded[nextVideoIndex];

      if (isNextVideoLoaded) {
        setTimeoutLength(getRemainingTime(currentFrameStartedAt.current));
      } else {
        const nextVideo = videos[nextVideoIndex];

        loadVideoSrc(nextVideo).then(() => {
          console.log('Loaded', nextVideoIndex);
          const newVideosLoaded = [...videosLoaded];
          newVideosLoaded[nextVideoIndex] = true;
          setVideosLoaded(newVideosLoaded);

          setTimeoutLength(getRemainingTime(currentFrameStartedAt.current));
        });
      }
    },
    [currentVideoIndex]
  );

  console.log(timeoutLength);

  return videos[currentVideoIndex];
};

const Homepage = ({}) => {
  const videoSrc = useVideo();

  return (
    <Layout theme="dark" pageId="homepage">
      <FadeOnChange changeKey={videoSrc}>
        <HomepageVideo playsInline autoPlay={true} muted src={videoSrc} />
      </FadeOnChange>
      <Spacer size={400} />
      <HomepageHowItWorks />
      <Spacer size={400} />
    </Layout>
  );
};

const Wrapper = styled.div``;

const HomepageVideo = styled.video`
  width: 415px;
  height: 550px;
  backface-visibility: hidden;
  border: none;
  background-color: transparent;
`;

export default Homepage;
