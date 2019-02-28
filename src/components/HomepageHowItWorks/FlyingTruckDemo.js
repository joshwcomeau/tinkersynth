import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS, UNIT } from '../../constants';
import { random } from '../../utils';

import Mailtruck from '../Mailtruck';
import AnimatedFire from '../AnimatedFire';
import Float from '../Float';
import Starfield from '../Starfield';

const FlyingTruckDemo = ({}) => {
  const [rotation, setRotation] = React.useState(-30);
  const [translate, setTranslate] = React.useState(0);

  const spring = useSpring({
    transform: `rotate(${rotation}deg) translateX(${translate}px)`,
    config: {
      tension: 10,
      friction: 25,
    },
  });

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setRotation(random(-20, -40));
      timeoutId = window.setTimeout(update, random(1000, 2000));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setTranslate(random(-30, 35));
      timeoutId = window.setTimeout(update, random(1000, 2000));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Wrapper>
      <FrontStarfield>
        <Starfield starSize={10} speed={12} />
      </FrontStarfield>
      <BackStarfield>
        <Starfield starSize={5} speed={4} />
      </BackStarfield>
      <InnerWrapper>
        <Float>
          <TruckWrapper style={{ transform: spring.transform }}>
            <Mailtruck />
            <FireWrapper>
              <AnimatedFire />
            </FireWrapper>
          </TruckWrapper>
        </Float>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const BackStarfield = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;
const FrontStarfield = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

const InnerWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TruckWrapper = styled(animated.div)`
  position: relative;
`;

const FireWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: -3px;
  transform: translate(-42px, 5px) rotate(270deg) scale(0.75, 0.75);
  transform-origin: center center;
`;

export default FlyingTruckDemo;
