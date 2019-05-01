// @flow
import React from 'react';

import { UNIT, ETSY_URL, PATREON_URL } from '../constants';

import LayoutSidePage from '../components/LayoutSidePage';
import Paragraph from '../components/Paragraph';
import Spacer from '../components/Spacer';
import Heading from '../components/Heading';
import List from '../components/List';
import TextLink from '../components/TextLink';

const Backers = () => {
  return (
    <LayoutSidePage pageId="backers" title="Backers">
      <List>
        <List.Item>Jane Doe</List.Item>
        <List.Item>John Hancock</List.Item>
        <List.Item>Acme Co.</List.Item>
        <List.Item>Joe Normalname</List.Item>
        <List.Item>Foo Bar</List.Item>
      </List>

      <Spacer size={UNIT * 4} />

      <Paragraph>
        ...Ok, that's not a real list of backers. The truth is I just launched
        my Patreon, and I don't have any yet!
      </Paragraph>

      <Paragraph>
        Become a patron and help fund this project:{' '}
        <TextLink to={PATREON_URL}>{PATREON_URL}</TextLink>
      </Paragraph>
    </LayoutSidePage>
  );
};

export default Backers;
