// @flow
import React from 'react';
import styled from 'styled-components';

import Column from './Column';
import LineDemo from './LineDemo';
import MaxWidthWrapper from '../MaxWidthWrapper';

const HomepageHowItWorks = () => {
  const [lineLength, setLineLength] = React.useState(50);
  const [lineCurve, setLineCurve] = React.useState(50);

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
        <LineDemo
          lineLength={lineLength}
          lineCurve={lineCurve}
          setLineLength={setLineLength}
          setLineCurve={setLineCurve}
        />
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
        <LineDemo
          lineLength={lineLength}
          lineCurve={lineCurve}
          setLineLength={setLineLength}
          setLineCurve={setLineCurve}
        />
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  display: flex;
`;

export default HomepageHowItWorks;
