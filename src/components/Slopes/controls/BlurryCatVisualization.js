import React from 'react';

import catSrc from '../../../images/cat-viz.svg';

import Pixellate from '../../Pixellate';
import { Spring } from 'react-spring';

const BlurryCatVisualization = ({ value, size, isAnimated }) => {
  return (
    <Spring
      to={{ value }}
      immediate={!isAnimated}
      config={{ tension: 70, friction: 20 }}
    >
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
