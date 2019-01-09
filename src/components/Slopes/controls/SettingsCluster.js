// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SlopesPlacard from '../../SlopesPlacard';
import SeedPicker from '../../SeedPicker';
import Spacer from '../../Spacer';

type Props = {
  width: number,
};

const SettingsCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  return (
    <InstrumentCluster direction="row">
      <SlopesPlacard />
      <Spacer size={UNIT * 2} />
      <SeedPicker />
    </InstrumentCluster>
  );
};

export default SettingsCluster;
