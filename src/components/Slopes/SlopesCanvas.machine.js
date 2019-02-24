// @flow
import React from 'react';
import { Spring } from 'react-spring';

import { extractTypeFromObject } from '../../utils';

import { SlopesContext } from './SlopesState';
import SlopesCanvas from './SlopesCanvas';

const SlopesCanvasMachine = (props: any) => {
  const slopesParams = React.useContext(SlopesContext);

  const springParams = extractTypeFromObject(slopesParams, 'number');

  // I generally want to spring all params, but I don't want to spring the seed;
  // fractional seeds don't make sense, and it would be too chaotic anyway.
  delete springParams.seed;

  // Use this slow config when recording sample videos.
  const SLOW_CONFIG = { tension: 30, friction: 50 };

  return (
    <Spring to={springParams} immediate={!slopesParams.animateTransitions}>
      {interpolatedParams => (
        <SlopesCanvas
          kind="main"
          {...slopesParams}
          {...interpolatedParams}
          {...props}
        />
      )}
    </Spring>
  );
};

export default SlopesCanvasMachine;
