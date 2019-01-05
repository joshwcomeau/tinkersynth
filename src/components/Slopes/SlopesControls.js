// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import ControlPanel from '../ControlPanel';

import PerspectiveCluster from './controls/PerspectiveCluster';
import PeaksCluster from './controls/PeaksCluster';
import Spacer from '../Spacer';
import SimilarityCluster from './controls/SimilarityCluster';
import PolarCluster from './controls/PolarCluster';
import NoiseCluster from './controls/NoiseCluster';

type Props = {
  width: number,
};

const SlopesControls = ({ width }: Props) => {
  // We receive an outerWidth through props.
  // We want our control panel to have two columns, and to have equal spacing
  // on both sides (so 3 units of spacing total: left, between, right).
  const padding = UNIT * 2;
  const totalSpacing = padding * 3;
  const columnWidth = (width - totalSpacing) / 2;

  return (
    <ControlPanel width={width} padding={padding}>
      <Row>
        <Column>
          <PerspectiveCluster width={columnWidth} />
          <PeaksCluster width={columnWidth} />
        </Column>
        <Spacer size={UNIT * 2} />

        <Column>
          <SimilarityCluster width={columnWidth} />
          <PolarCluster width={columnWidth} />
        </Column>
      </Row>

      <Row>
        <Column>
          <NoiseCluster width={columnWidth} />
        </Column>

        <Column />
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
