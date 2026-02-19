import React from 'react';

import marginsEnabledSrc from '../../../images/margins-enabled.svg';
import marginsDisabledSrc from '../../../images/margins-disabled.svg';

import CanvasToggle from '../../CanvasToggle';

const MarginsToggle = ({ size = 38, isActive, isPoweredOn, handleToggle }) => {
  return (
    <CanvasToggle
      size={size}
      isActive={isActive}
      isPoweredOn={isPoweredOn}
      handleToggle={handleToggle}
    >
      <img
        src={isActive ? marginsEnabledSrc : marginsDisabledSrc}
        style={{ opacity: isPoweredOn ? 1 : 0 }}
      />
    </CanvasToggle>
  );
};

export default MarginsToggle;
