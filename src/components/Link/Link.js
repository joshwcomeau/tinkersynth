// @flow
import React from 'react';
import { Link as ReachRouterLink } from '@reach/router';
import styled from 'styled-components';

export const shouldUseTraditionalAnchorTag = (to: string) =>
  to.match(/^https?:\/\//i) || to.match(/^#/);

type Props = {
  to: string,
  onClick?: Function,
};

const LinkThing = ({ to, ...delegated }: Props) => {
  const isExternal = shouldUseTraditionalAnchorTag(to);

  if (isExternal) {
    return <Anchor href={to} {...delegated} />;
  }

  return <Anchor as={ReachRouterLink} to={to} {...delegated} />;
};

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default LinkThing;
