// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SeedPicker from '../../SeedPicker';
import RandomizeButton from '../../RandomizeButton';
import Spacer from '../../Spacer';

type Props = {
  seed: number,
  setSeed: (val: number) => void,
  randomize: () => void,
};

const SettingsCluster = ({ seed, setSeed, randomize }: Props) => {
  return (
    <InstrumentCluster>
      <SeedPicker seed={seed} setSeed={setSeed} />
      <Spacer size={UNIT * 2} />
      <RandomizeButton handlePress={randomize} />
    </InstrumentCluster>
  );
};

const OptimizedSettingsCluster = memoWhileIgnoring(
  ['setSeed', 'randomize'],
  SettingsCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSettingsCluster
      width={width}
      seed={slopesParams.seed}
      setSeed={slopesParams.setSeed}
      randomize={slopesParams.randomize}
    />
  );
};

export default Container;
