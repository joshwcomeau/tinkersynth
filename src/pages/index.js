// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS, UNIT } from '../constants';

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

const videos = [
  homepageVideo0,
  homepageVideo1,
  homepageVideo2,
  homepageVideo3,
  homepageVideo4,
  homepageVideo5,
  homepageVideo7,
];

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(
    () => {
      const tick = () => savedCallback.current();

      if (typeof delay === 'number') {
        let id = window.setInterval(tick, delay);

        return () => window.clearInterval(id);
      }
    },
    [delay]
  );
};

const Homepage = ({}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);

  useInterval(() => {
    const nextIndex = (currentVideoIndex + 1) % 8;

    setCurrentVideoIndex(nextIndex);
  }, 5000);

  const currentVideoSrc = videos[currentVideoIndex];

  console.log(currentVideoIndex);

  return (
    <Layout theme="dark" pageId="homepage">
      <FadeOnChange changeKey={currentVideoSrc}>
        <HomepageVideo
          playsInline
          autoPlay={true}
          muted
          src={currentVideoSrc}
        />
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
