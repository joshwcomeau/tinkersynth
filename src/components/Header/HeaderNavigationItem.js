// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

type Props = {
  to: string,
  children: React$Node,
};

const HeaderNavigationItem = ({ to, children }: Props) => {
  return <NavigationLink to={to}>{children}</NavigationLink>;
};

const NavigationLink = styled(Link)`
  font-size: 16px;
`;

export default HeaderNavigationItem;
