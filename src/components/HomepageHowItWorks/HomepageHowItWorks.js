// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { random } from '../../utils';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../Heading';
import Spacer from '../Spacer';
import Column from './Column';
import LineDemo from './LineDemo';
import CanvasDisplay from './CanvasDisplay';
import FlyingTruckDemo from './FlyingTruckDemo';

const HomepageHowItWorks = () => {
  const [lineLength, setLineLength] = React.useState(20);
  const [lineCurve, setLineCurve] = React.useState(10);

  let curveTimeoutId = React.useRef(null);
  let lengthTimeoutId = React.useRef(null);

  const createSetterThatAlsoDisables = setter => val => {
    setter(val);
    window.clearTimeout(curveTimeoutId.current);
    window.clearTimeout(lengthTimeoutId.current);
  };

  // TODO: Abstract
  React.useEffect(() => {
    const update = () => {
      setLineCurve(random(0, 100));
      curveTimeoutId.current = window.setTimeout(update, random(500, 2500));
    };

    update();

    return () => {
      window.clearTimeout(curveTimeoutId.current);
    };
  }, []);

  React.useEffect(() => {
    const update = () => {
      setLineLength(random(0, 100));
      lengthTimeoutId.current = window.setTimeout(update, random(500, 2500));
    };

    update();

    return () => {
      window.clearTimeout(lengthTimeoutId.current);
    };
  }, []);

  return (
    <OuterWrapper id="homepage-how-it-works">
      <MaxWidthWrapper>
        <Header>
          <Spacer size={96} />
          <Heading size={3}>How it works</Heading>
          <Spacer size={72} />
        </Header>
        <Row>
          <Column
            index={1}
            title="Create some art"
            description={
              <>
                There are no labels on Tinkersynth controls, so some
                experimentation is required.
              </>
            }
          >
            <LineDemo
              lineLength={lineLength}
              lineCurve={lineCurve}
              setLineLength={createSetterThatAlsoDisables(setLineLength)}
              setLineCurve={createSetterThatAlsoDisables(setLineCurve)}
            />
          </Column>

          <Column
            index={2}
            title="Order a print"
            description={
              <>
                Purchase a beautiful fine-art print, shipped right to your door
              </>
            }
          >
            <FlyingTruckDemo />
          </Column>

          <Column
            index={3}
            title="Showcase your work"
            description={
              <>
                You collaborated with a machine to produce a unique piece of
                generative artwork! That's pretty cool.
              </>
            }
          >
            <CanvasDisplay lineLength={lineLength} lineCurve={lineCurve} />
          </Column>
        </Row>
        <Spacer size={96} />
      </MaxWidthWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
`;

const Header = styled.div`
  text-align: center;
  color: ${COLORS.white};
`;

const Row = styled.div`
  display: flex;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export default HomepageHowItWorks;
