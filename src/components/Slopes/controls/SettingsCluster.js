// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SlopesPlacard from '../../SlopesPlacard';
import SeedPicker from '../../SeedPicker';
import RandomizeButton from '../../RandomizeButton';
import Spacer from '../../Spacer';
import Link from '../../Link';

type Props = {
  width: number,
};

const SettingsCluster = ({ width, seed, setSeed, randomize }: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  return (
    <Row>
      <SlopesPlacard />

      <Note>
        <FirstLine title="A generative art machine. By Josh Comeau.">
          A generative art machine.
          <br />
          By{' '}
          <strong>
            <Link to="https://twitter.com/JoshWComeau" target="_blank">
              Josh Comeau
            </Link>
          </strong>
          .
        </FirstLine>
        {/* <SecondLine>
          <Link to="" style={{ color: 'inherit' }}>
            📕 Documentation
          </Link>
        </SecondLine> */}
      </Note>

      <InstrumentCluster>
        <SeedPicker seed={seed} setSeed={setSeed} />
        <Spacer size={UNIT * 2} />
        <RandomizeButton onClick={randomize} />
      </InstrumentCluster>
    </Row>
  );
};

const OptimizedSettingsCluster = memoWhileIgnoring(
  ['setSeed', 'randomize'],
  SettingsCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSettingsCluster
      width={width}
      seed={slopesParams.seed}
      setSeed={slopesParams.setSeed}
      randomize={slopesParams.randomize}
    />
  );
};

const Row = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Note = styled.div`
  flex: 1;
  text-align: center;
  color: ${COLORS.gray[400]};
  line-height: 1.3;
  text-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.5),
    0px 0.5px 0px rgba(255, 255, 255, 0.9);
`;

const FirstLine = styled.div`
  margin-bottom: ${UNIT * 1.5}px;
  font-size: 13px;
`;

const SecondLine = styled.div`
  font-size: 12px;
`;

export default Container;
