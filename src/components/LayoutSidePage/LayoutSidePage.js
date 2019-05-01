import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import Layout from '../Layout';
import SEO from '../SEO';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import PageHeader from '../PageHeader';

const LayoutSidePage = ({ pageId, title, children }) => {
  return (
    <Layout pageId={pageId}>
      <SEO title={title} keywords={['generative art', 'art', 'online store']} />

      <Wrapper maxWidth="1000px">
        <PageHeader>{title}</PageHeader>

        {children}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  padding-top: ${UNIT * 16}px;
`;

export default LayoutSidePage;
