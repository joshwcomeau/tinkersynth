// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import ControlPanel from '../ControlPanel';
import SliderControl from '../SliderControl';
import AvailableWidth from '../AvailableWidth';

import PerspectiveCluster from './controls/PerspectiveCluster';

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
      </Column>
      <Column>
        <AvailableWidth>
          {columnWidth => (
            <>
              <div style={{ padding: '2rem' }}>
                <SliderControl
                  value={spikyness}
                  updateValue={setSpikyness}
                  min={0}
                  max={100}
                  width={152}
                  height={96}
                  renderVisualization={value => <div>{Math.round(value)}</div>}
                />
              </div>

              <div style={{ padding: '2rem' }}>
                <SliderControl
                  value={polarAmount}
                  updateValue={setPolarAmount}
                  min={0}
                  max={100}
                  width={152}
                  height={96}
                  renderVisualization={value => <div>{Math.round(value)}</div>}
                />
              </div>

              <div style={{ padding: '2rem' }}>
                <SliderControl
                  value={omega}
                  updateValue={setOmega}
                  min={0}
                  max={100}
                  width={152}
                  height={96}
                  renderVisualization={value => <div>{Math.round(value)}</div>}
                />
              </div>

              <div style={{ padding: '2rem' }}>
                <SliderControl
                  value={splitUniverse}
                  updateValue={setSplitUniverse}
                  min={0}
                  max={100}
                  width={152}
                  height={96}
                  renderVisualization={value => <div>{Math.round(value)}</div>}
                />
              </div>
            </>
          )}
        </AvailableWidth>
      </Column>
    </ControlPanel>
  );
};

const Column = styled.div`
  flex: 1;
`;

export default SlopesControls;
