import React from 'react';

import catSrc from '../../../images/cat-viz.svg';

import Pixellate from '../../Pixellate';

const BlurryCatVisualization = ({ value, size }) => {
  const canvasImageWidth = size - 8;
  const canvasImageHeight = canvasImageWidth * 1.446;
  const imagePositionValues = [4, 4, canvasImageWidth, canvasImageHeight];

  return (
    <Pixellate
      value={value}
      size={size}
      src={catSrc}
      imagePositionValues={imagePositionValues}
    />
  );
};

export default BlurryCatVisualization;
