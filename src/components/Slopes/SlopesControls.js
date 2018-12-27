// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import ControlPanel from '../ControlPanel';
import SliderVideoControl from '../SliderVideoControl';
import AvailableWidth from '../AvailableWidth';

import PerspectiveCluster from './controls/PerspectiveCluster';
import PeaksCluster from './controls/PeaksCluster';
import Spacer from '../Spacer';

type Props = {
  perspective: number,
  setPerspective: (num: number) => void,
  spikyness: number,
  setSpikyness: (num: number) => void,
};

const SlopesControls = ({
  width,
  perspective,
  spikyness,
  polarAmount,
  omega,
  splitUniverse,
  setPerspective,
  setSpikyness,
  setPolarAmount,
  setOmega,
  setSplitUniverse,
}: Props) => {
  // We receive an outerWidth through props.
  // We want our control panel to have two columns, and to have equal spacing
  // on both sides (so 3 units of spacing total: left, between, right).
  const padding = UNIT * 2;
  const totalSpacing = padding * 3;
  const columnWidth = (width - totalSpacing) / 2;

  return (
    <ControlPanel width={width} padding={padding}>
      <Column>
        <PerspectiveCluster width={columnWidth} />
        <PeaksCluster width={columnWidth} />
      </Column>
      <Spacer size={UNIT * 2} />

      <Column>{/* TODO */}</Column>
    </ControlPanel>
  );
};

const Column = styled.div`
  flex: 1;
`;

export default SlopesControls;
