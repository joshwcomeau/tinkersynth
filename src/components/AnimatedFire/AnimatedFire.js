import React from 'react';
import styled, { keyframes } from 'styled-components';

import fireSpritesheet from '../../images/fire-sprite-row.png';

const AnimatedFire = ({ width = 38, height = 67 }) => {
  return <Fire style={{ width, height }} />;
};

const animation = keyframes`
  100% {
    background-position: -380px;
  }
`;

const Fire = styled.div`
  position: relative;
  background-image: url('${fireSpritesheet}');
  background-size: cover;
  animation: ${animation} 0.8s steps(10) infinite;
  backface-visibility: hidden;
`;

export default AnimatedFire;
