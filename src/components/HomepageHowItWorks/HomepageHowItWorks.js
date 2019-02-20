// @flow
import React from 'react';
import styled from 'styled-components';

import Column from './Column';
import LineDemo from './LineDemo';

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default HomepageHowItWorks;
