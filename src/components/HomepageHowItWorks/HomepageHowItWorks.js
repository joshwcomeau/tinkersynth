// @flow
import React from 'react';
import styled from 'styled-components';

import { random } from '../../utils';

import Column from './Column';
import LineDemo from './LineDemo';
import MaxWidthWrapper from '../MaxWidthWrapper';
import FlyingTruckDemo from './FlyingTruckDemo';

const HomepageHowItWorks = () => {
  const [lineLength, setLineLength] = React.useState(20);
  const [lineCurve, setLineCurve] = React.useState(10);

  // TODO: Abstract
  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setLineCurve(random(0, 100));
      timeoutId = window.setTimeout(update, random(500, 5000));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setLineLength(random(0, 100));
      timeoutId = window.setTimeout(update, random(500, 5000));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Wrapper>
      <Column
        index={1}
        title="Create some art"
        description={
          <>
            There are no labels on Tinkersynth controls, but a bit of
            experimentation is all it takes! What unexpected, delightful thing
            will you create?
          </>
        }
      >
        <LineDemo
          lineLength={lineLength}
          lineCurve={lineCurve}
          setLineLength={setLineLength}
          setLineCurve={setLineCurve}
        />
      </Column>

      <Column
        index={2}
        title="Order a print"
        description={
          <>
            We sell beautiful fine-art prints, produced with ultra-premium
            papers and rich archival inks.
            <br />
            <br />
            You can also purchase raw assets, and manage the printing yourself!
          </>
        }
      >
        <FlyingTruckDemo />
      </Column>

      <Column
        index={3}
        title="Display it proudly"
        description={
          <>
            You collaborated with a machine to produce a unique piece of
            generative artwork.
            <br />
            <br />
            It’ll look great in your home.
          </>
        }
      >
        {/* TODO */}
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  display: flex;
`;

export default HomepageHowItWorks;
