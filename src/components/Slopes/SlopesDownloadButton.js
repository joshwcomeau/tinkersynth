import React from 'react';
import { navigate } from '@reach/router';
import queryString from 'query-string';

import analytics from '../../services/analytics.service';
import { COLORS } from '../../constants';

import Button from '../Button';

import { SlopesContext } from './SlopesState';

const SlopesDownloadButton = ({ size, handleClick }) => (
  <Button color={COLORS.blue[500]} onClick={handleClick} size={size}>
    Download
  </Button>
);

const SlopesDownloadButtonContainer = ({ size }) => {
  const slopesParams = React.useContext(SlopesContext);
  const artParams = { ...slopesParams };
  delete artParams.isPoweredOn;
  delete artParams.shuffle;
  delete artParams.toggleMachinePower;
  delete artParams.toggleParameter;
  delete artParams.tweakParameter;

  const handleClick = () => {
    analytics.logEvent('click-download', { machineName: 'slopes' });

    const params = queryString.stringify(artParams);

    const url = `/download?${params}`;

    navigate(url);
  };

  return <SlopesDownloadButton size={size} handleClick={handleClick} />;
};

export default SlopesDownloadButtonContainer;
