// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { COLORS, UNIT } from '../../constants';

type Props = {
  to: string,
  color: string,
  children: React$Node,
};

const HeaderNavigationItem = ({ to, color, children }: Props) => {
  return (
    <NavigationLink
      to={to}
      color={color}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            fontWeight: isCurrent ? 700 : 400,
          },
        };
      }}
    >
      {children}
    </NavigationLink>
  );
};

const NavigationLink = styled(Link)`
  font-size: 16px;
  margin: 0 ${UNIT * 2.5}px;
  text-decoration: none;
  color: ${props => props.color};
`;

export default HeaderNavigationItem;
