'use client';

import React from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import SlopesIndex from '../../components/Slopes/SlopesIndex';

export default function SlopesPage() {
  return (
    <Layout pageId="slopes" theme="dark">
      <SEO
        title="Slopes"
        ogTitle="Generative Art Machine"
        keywords={['generative art', 'art', 'online store']}
      />
      <SlopesIndex />
    </Layout>
  );
}
