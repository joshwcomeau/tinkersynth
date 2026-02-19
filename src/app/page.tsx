'use client';

import React from 'react';
import Layout from '../components/Layout';
import SlopesIndex from '../components/Slopes/SlopesIndex';

export default function HomePage() {
  return (
    <Layout pageId="slopes" theme="dark">
      <SlopesIndex />
    </Layout>
  );
}
