import React from 'react';

import marginsEnabledSrc from '../../../images/margins-enabled.svg';
import marginsDisabledSrc from '../../../images/margins-disabled.svg';

import CanvasToggle from '../../CanvasToggle';

const MarginsToggle = ({ size = 38, isActive, handleToggle }) => {
  return (
    <CanvasToggle size={size} isActive={isActive} handleToggle={handleToggle}>
      <img src={isActive ? marginsEnabledSrc : marginsDisabledSrc} />
    </CanvasToggle>
  );
};

export default MarginsToggle;
