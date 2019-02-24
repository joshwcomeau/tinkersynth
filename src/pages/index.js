// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS, UNIT } from '../constants';

import homepageVideo1 from '../videos/homepage-art-1.1.mp4';

import Layout from '../components/Layout';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Spin from '../components/Spin';
import HomepageHowItWorks from '../components/HomepageHowItWorks/HomepageHowItWorks';

const Homepage = ({}) => {
  return (
    <Layout theme="dark">
      <HomepageVideo
        playsInline
        autoPlay={true}
        muted
        loop
        src={homepageVideo1}
      />
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
