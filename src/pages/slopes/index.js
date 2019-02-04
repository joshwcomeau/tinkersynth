// @flow
import React from 'react';
import loadable from '@loadable/component';

import Layout from '../../components/Layout';
import LoadScript from '../../components/LoadScript';
import Loading from '../../components/Slopes/Loading';
import SEO from '../../components/seo';

const Slopes = loadable(() => import('../../components/Slopes'));

const SlopesIndex = () => (
  <Layout>
    <SEO title="Slopes" keywords={['generative art', 'art', 'online store']} />
    {/* <Loading /> */}
    <Slopes fallback={<Loading />} />

    {/*
      TODO: Register a callback for when the script is loaded,
      use this as one indicator to end the spinner and show the thing.
    */}
    <LoadScript src="https://checkout.stripe.com/checkout.js" />
  </Layout>
);

export default SlopesIndex;
