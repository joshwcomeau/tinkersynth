'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

type Props = {
  to: string;
  color: string;
  children: React.ReactNode;
};

const HeaderNavigationItem = ({ to, color, children }: Props) => {
  const pathname = usePathname();
  const isCurrent = pathname === to || (to !== '/' && pathname.startsWith(to));

  return (
    <NavigationLink href={to} color={color} $isCurrent={isCurrent}>
      {children}
    </NavigationLink>
  );
};

const NavigationLink = styled(Link)<{ color: string; $isCurrent: boolean }>`
  font-size: 16px;
  margin: 0 ${UNIT * 2.5}px;
  text-decoration: none;
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.$isCurrent ? 700 : 400)};
`;

export default HeaderNavigationItem;
