// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { COLORS, UNIT } from '../../constants';

type Props = {
  to: string,
  children: React$Node,
};

const HeaderNavigationItem = ({ to, children }: Props) => {
  return (
    <NavigationLink
      to={to}
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
  color: ${COLORS.gray[900]};
`;

export default HeaderNavigationItem;
