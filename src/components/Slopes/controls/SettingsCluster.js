// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SeedPicker from '../../SeedPicker';
import Spacer from '../../Spacer';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  squeeze: boolean,
  seed: number,
  tweakParameter: TweakParameterAction,
};

const SettingsCluster = ({ squeeze, seed, tweakParameter }: Props) => {
  return (
    <div style={{ paddingTop: 15 }}>
      <InstrumentCluster>
        <SeedPicker seed={seed} setSeed={val => tweakParameter('seed', val)} />
      </InstrumentCluster>
    </div>
  );
};

const OptimizedSettingsCluster = React.memo(SettingsCluster);

const SettingsContainer = ({ squeeze }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSettingsCluster
      squeeze={squeeze}
      seed={slopesParams.seed}
      tweakParameter={slopesParams.tweakParameter}
    />
  );
};

export default SettingsContainer;
