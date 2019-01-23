// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SeedPicker from '../../SeedPicker';
import RandomizeButton from '../../RandomizeButton';
import Spacer from '../../Spacer';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  seed: number,
  tweakParameter: TweakParameterAction,
  randomize: () => void,
};

const SettingsCluster = ({ seed, tweakParameter, randomize }: Props) => {
  return (
    <InstrumentCluster>
      <SeedPicker seed={seed} setSeed={val => tweakParameter('seed', val)} />

      <Spacer size={UNIT * 2} />

      <RandomizeButton handlePress={randomize} />
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
      randomize={slopesParams.randomize}
    />
  );
};

export default SettingsContainer;
