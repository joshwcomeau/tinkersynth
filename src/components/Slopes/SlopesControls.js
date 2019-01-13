// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import ControlPanel from '../ControlPanel';

import PerspectiveCluster from './controls/PerspectiveCluster';
import PeaksCluster from './controls/PeaksCluster';
import Spacer from '../Spacer';
import SimilarityCluster from './controls/SimilarityCluster';
import SettingsCluster from './controls/SettingsCluster';
import PolarCluster from './controls/PolarCluster';
import NoiseCluster from './controls/NoiseCluster';
import AudioCluster from './controls/AudioCluster';

type Props = {
  width: number,
};

const SlopesControls = ({ width }: Props) => {
  // We receive an outerWidth through props.

  const padding = UNIT * 2;

  // We want our control panel to have two columns, and to have equal spacing
  // on both sides (so 3 units of spacing total: left, between, right).
  const twinColumnWidth = (width - padding * 3) / 2;

  // The final set near the bottom bucks this pattern, because asymmetry is
  // pretty.
  const miniColumnWidth = 60;
  const splitColumnWidth = (width - miniColumnWidth - padding * 4) / 2;

  return (
    <ControlPanel width={width} padding={padding}>
      <Row>
        <SettingsCluster width={width} />
      </Row>
      <Spacer size={UNIT * 2} />
      <Row>
        <Column>
          <PerspectiveCluster width={twinColumnWidth} />
          <Spacer size={UNIT * 2} />
          <PeaksCluster width={twinColumnWidth} />
        </Column>
        <Spacer size={UNIT * 2} />

        <Column>
          <SimilarityCluster width={twinColumnWidth} />
          <Spacer size={UNIT * 2} />
          <PolarCluster width={twinColumnWidth} />
        </Column>
      </Row>

      <Spacer size={UNIT * 2} />

      <Row>
        <Column>
          <AudioCluster width={splitColumnWidth} />
        </Column>
        <Spacer size={UNIT * 2} />
        <Column>
          <NoiseCluster width={splitColumnWidth} />
        </Column>
        <Spacer size={UNIT * 2} />
        <Column>
          <div
            style={{
              background: 'red',
              width: miniColumnWidth,
              height: miniColumnWidth,
            }}
          />
        </Column>
      </Row>
    </ControlPanel>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
`;

export default SlopesControls;
