import React from 'react';

import catSrc from '../../../images/cat-viz.svg';

import Pixellate from '../../Pixellate';

const BlurryCatVisualization = ({ value, size }) => {
  return (
    <Pixellate value={value} size={size} aspectRatio={1.446} src={catSrc} />
  );
};

export default BlurryCatVisualization;
