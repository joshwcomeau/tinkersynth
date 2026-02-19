'use client';

import React, { Suspense } from 'react';
import FAQWrapper from '../../views/faq';

export default function FAQPage() {
  return (
    <Suspense fallback={null}>
      <FAQWrapper />
    </Suspense>
  );
}
