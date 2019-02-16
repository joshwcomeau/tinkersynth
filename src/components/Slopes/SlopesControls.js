// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, BREAKPOINT_SIZES } from '../../constants';

import ControlPanel from '../ControlPanel';
import Spacer from '../Spacer';

import { SLOPES_BREAKPOINTS } from './Slopes.constants';
import PlacardArea from './controls/PlacardArea';
import Engraving from './Engraving';
import PerspectiveCluster from './controls/PerspectiveCluster';
import PeaksCluster from './controls/PeaksCluster';
import SimilarityCluster from './controls/SimilarityCluster';
import SettingsCluster from './controls/SettingsCluster';
import PolarCluster from './controls/PolarCluster';
import NoiseCluster from './controls/NoiseCluster';
import AudioCluster from './controls/AudioCluster';
import LineCluster from './controls/LineCluster';
import DestructiveCluster from './controls/DestructiveCluster';

type Props = {
  width: number,
  windowDimensions: { width: string, height: string },
};

const SlopesControls = ({ width, windowDimensions }: Props) => {
  const padding = UNIT * 2;

  const numOfColumns = width <= SLOPES_BREAKPOINTS.small ? 1 : 2;

  const totalPadding = numOfColumns === 2 ? padding * 3 : padding * 2;

  // We want our control panel to have two columns on desktop, and to have equal
  // spacing on both sides (so 3 units of spacing total: left, between, right).
  const columnWidth = (width - totalPadding) / numOfColumns;

  return (
    <ControlPanel width={width} padding={padding}>
      <Row style={{ zIndex: 2 }}>
        <PlacardArea width={170} height={70} />
        <SettingsCluster squeeze={columnWidth <= 550} />
      </Row>
      <Spacer size={UNIT * 2} />
      <DesktopOnlyRow>
        <Column>
          <PerspectiveCluster width={columnWidth} />
          <Spacer size={UNIT * 2} />
          <PeaksCluster width={columnWidth} />
          <Spacer size={UNIT * 2} />
          <AudioCluster width={columnWidth} />
        </Column>
        <Spacer size={UNIT * 2} />

        <Column>
          <SimilarityCluster width={columnWidth} />
          <Spacer size={UNIT * 2} />
          <PolarCluster width={columnWidth} />
          <Spacer size={UNIT * 2} />
          <NoiseCluster width={columnWidth} />
        </Column>
      </DesktopOnlyRow>
      <Spacer size={UNIT * 2} />

      <DesktopOnlyRow>
        <LineCluster
          columnWidth={columnWidth}
          hideOcclusionToggle={windowDimensions.width < BREAKPOINT_SIZES.sm}
        />
        <DestructiveCluster />
      </DesktopOnlyRow>
    </ControlPanel>
  );
};

const Row = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;

const DesktopOnlyRow = styled(Row)`
  @media (max-width: ${SLOPES_BREAKPOINTS.small}px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
`;

export default SlopesControls;
