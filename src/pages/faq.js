// @flow
import React from 'react';
import loadable from '@loadable/component';

import LayoutSidePage from '../components/LayoutSidePage';
import QuestionAndAnswer from '../components/QuestionAndAnswer';
import Paragraph from '../components/Paragraph';

const SlopesIndex = () => (
  <LayoutSidePage title="Frequently Asked Questions">
    <QuestionAndAnswer question="What is this?">
      <Paragraph>
        Tinkersynth is an experimental set* of software machines you can use to
        create art.
      </Paragraph>
    </QuestionAndAnswer>
  </LayoutSidePage>
);

export default SlopesIndex;
