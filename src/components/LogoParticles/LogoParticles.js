// @flow
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

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
    <>
      <ParticleWrapper style={{ top: 8, left: -5 }}>
        <Particle
          color={COLORS.aqua[500]}
          angle={160}
          distance={10}
          rotation={-25}
          shape="Squiggle"
        />
      </ParticleWrapper>
      <ParticleWrapper style={{ top: 0, left: 32 }}>
        <Particle
          color={COLORS.yellow[500]}
          angle={-25}
          distance={5}
          rotation={50}
          shape="OpenCircle"
        />
      </ParticleWrapper>
      <ParticleWrapper style={{ top: -10, left: 10 }}>
        <Particle
          color={COLORS.red[500]}
          angle={300}
          distance={15}
          rotation={10}
          shape="X"
        />
      </ParticleWrapper>
    </>
  );
};

const ParticleWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

export default LogoParticles;
