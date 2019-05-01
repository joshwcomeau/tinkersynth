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
  isPoweredOn: boolean,
  tweakParameter: TweakParameterAction,
};

const SettingsCluster = ({
  squeeze,
  seed,
  isPoweredOn,
  tweakParameter,
}: Props) => {
  return (
    <InstrumentCluster>
      <SeedPicker
        seed={seed}
        isPoweredOn={isPoweredOn}
        setSeed={val => tweakParameter('seed', val)}
      />
    </InstrumentCluster>
  );
};

const OptimizedSettingsCluster = React.memo(SettingsCluster);

const SettingsContainer = ({ squeeze }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSettingsCluster
      squeeze={squeeze}
      seed={slopesParams.seed}
      isPoweredOn={slopesParams.isPoweredOn}
      tweakParameter={slopesParams.tweakParameter}
    />
  );
};

export default SettingsContainer;
