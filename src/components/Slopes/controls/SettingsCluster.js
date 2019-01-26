// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SeedPicker from '../../SeedPicker';
import ShuffleButton from '../../ShuffleButton';
import Spacer from '../../Spacer';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  seed: number,
  tweakParameter: TweakParameterAction,
  shuffle: () => void,
};

const SettingsCluster = ({ seed, tweakParameter, shuffle }: Props) => {
  return (
    <InstrumentCluster>
      <SeedPicker seed={seed} setSeed={val => tweakParameter('seed', val)} />

      <Spacer size={UNIT * 2} />

      <ShuffleButton handlePress={shuffle} />
    </InstrumentCluster>
  );
};

const OptimizedSettingsCluster = React.memo(SettingsCluster);

const SettingsContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSettingsCluster
      width={width}
      seed={slopesParams.seed}
      tweakParameter={slopesParams.tweakParameter}
      shuffle={slopesParams.shuffle}
    />
  );
};

export default SettingsContainer;
