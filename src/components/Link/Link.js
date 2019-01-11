// @flow
import React from 'react';
import { Link as ReachRouterLink } from '@reach/router';
import styled from 'styled-components';

export const checkIfLinkIsExternal = to => to.match(/^https?:\/\//i);

const LinkThing = ({ to, ...delegated }) => {
  const isExternal = checkIfLinkIsExternal(to);

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
