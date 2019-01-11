// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SlopesPlacard from '../../SlopesPlacard';
import SeedPicker from '../../SeedPicker';
import RandomizeButton from '../../RandomizeButton';
import Spacer from '../../Spacer';
import TextLink from '../../TextLink';

type Props = {
  width: number,
};

const SettingsCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  return (
    <Row>
      <SlopesPlacard />

      <Note>
        <FirstLine>
          A generative art machine.
          <br />
          By{' '}
          <TextLink to="https://twitter.com/JoshWComeau" target="_blank">
            Josh Comeau
          </TextLink>
          .
        </FirstLine>
        <SecondLine>
          <TextLink to="" style={{ color: 'inherit' }}>
            📕 Documentation
          </TextLink>
        </SecondLine>
      </Note>

      <InstrumentCluster>
        <SeedPicker />
        <Spacer size={UNIT * 2} />
        <RandomizeButton />
      </InstrumentCluster>
    </Row>
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
  color: ${COLORS.gray[800]};
  line-height: 1.3;
`;

const FirstLine = styled.div`
  margin-bottom: ${UNIT * 1.5}px;
  font-size: 13px;
`;

const SecondLine = styled.div`
  font-size: 12px;
`;

export default SettingsCluster;
