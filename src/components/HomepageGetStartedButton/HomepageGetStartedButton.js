import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Link from '../Link';
import UnstyledButton from '../UnstyledButton';

const HomepageGetStartedButton = ({ copy }) => {
  return (
    <StartButton as={Link} to="/slopes">
      {copy}
    </StartButton>
  );
};

// TODO: Deduplicate with HomepageHero
const HeroButton = styled(UnstyledButton)`
  width: 270px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
`;

const StartButton = styled(HeroButton)`
  background: ${COLORS.gray[200]};
  color: ${COLORS.gray[900]};

  &:hover {
    background: ${COLORS.white};
    color: ${COLORS.black};
  }
`;

export default HomepageGetStartedButton;
