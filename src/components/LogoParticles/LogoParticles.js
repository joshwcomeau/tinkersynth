// @flow
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Particle from '../Particle';

type Props = {
  delay?: number,
};

const LogoParticles = ({ delay = 150 }: Props) => {
  const timeoutRef = useRef(null);
  const pathRef = useRef(null);
  const [hasBegun, setBegin] = useState(false);

  useEffect(() => {
    // A lot of stuff happens when the app mounts. Delay the logo particle
    // effects a bit
    timeoutRef.current = window.setTimeout(() => {
      setBegin(true);
    }, delay);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!hasBegun) {
    return null;
  }

  return (
    <ParticleWrapper>
      <Particle angle={-180} distance={20} shape="Squiggle" />
    </ParticleWrapper>
  );
};

const ParticleWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

export default LogoParticles;
