// @flow
import React, { useContext } from 'react';

import { COLORS } from '../../../constants';

import CanvasToggle from '../../CanvasToggle';
import OcclusionVisualization from './OcclusionVisualization';

type Props = {
  size?: number,
  isActive: boolean,
  isPoweredOn: boolean,
  handleToggle: () => void,
};

const OcclusionToggle = ({
  size = 38,
  isActive,
  isPoweredOn,
  handleToggle,
}: Props) => {
  const visualizationSize = size - 6;

  return (
    <CanvasToggle
      size={size}
      isActive={isActive}
      isPoweredOn={isPoweredOn}
      handleToggle={handleToggle}
    >
      <OcclusionVisualization
        width={size - 4}
        height={size * 0.5}
        value={isActive}
      />
    </CanvasToggle>
  );
};

export default OcclusionToggle;
