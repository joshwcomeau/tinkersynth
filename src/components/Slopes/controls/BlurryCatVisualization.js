import React from 'react';

import catSrc from '../../../images/cat-viz.svg';

import Pixellate from '../../Pixellate';
import { Spring } from 'react-spring';

const BlurryCatVisualization = ({ value, size }) => {
  return (
    <Spring to={{ value }}>
      {interpolated => (
        <Pixellate
          value={interpolated.value}
          size={size}
          aspectRatio={1.446}
          src={catSrc}
        />
      )}
    </Spring>
  );
};

export default BlurryCatVisualization;
