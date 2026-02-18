'use client';

import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

export const shouldUseTraditionalAnchorTag = (to: string) =>
  to.match(/^https?:\/\//i) || to.match(/^#/);

type Props = {
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
};

const StyledNextLink = styled(NextLink)`
  color: inherit;
  text-decoration: none;
`;

const LinkThing = ({ to, ...delegated }: Props) => {
  const isExternal = shouldUseTraditionalAnchorTag(to);

  if (isExternal) {
    return <Anchor href={to} {...delegated} />;
  }

  return <StyledNextLink href={to} {...delegated} />;
};

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default LinkThing;
