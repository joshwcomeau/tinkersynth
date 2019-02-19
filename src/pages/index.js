// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS, UNIT } from '../constants';

import Layout from '../components/Layout';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Spin from '../components/Spin';
import HomepageBackground from '../components/HomepageBackground/HomepageBackground';

const Homepage = ({}) => {
  return (
    <Layout transparentHeader>
      <HomepageBackground />
    </Layout>
  );
};

const Wrapper = styled.div``;

export default Homepage;
