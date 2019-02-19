import React from 'react';
import styled, { keyframes } from 'styled-components';

import fireSpritesheet from '../../images/fire-sprite-row.png';

const AnimatedFire = () => {
  return <Fire />;
};

const animation = keyframes`
  100% {
    background-position: -380px;
  }
`;

const Fire = styled.div`
  position: relative;
  width: 38px;
  height: 67px;
  background-image: url('${fireSpritesheet}');
  background-size: cover;
  animation: ${animation} 0.8s steps(10) infinite;
`;

export default AnimatedFire;
