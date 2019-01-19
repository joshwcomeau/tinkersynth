import React from 'react';

import marginsEnabledSrc from '../../images/margins-enabled.svg';
import marginsDisabledSrc from '../../images/margins-disabled.svg';

import CanvasToggle from '../CanvasToggle';

const MarginsToggle = ({ size = 38, enableMargins, toggleMargins }) => {
  return (
    <CanvasToggle
      size={size}
      isActive={enableMargins}
      handleToggle={toggleMargins}
    >
      <img src={enableMargins ? marginsEnabledSrc : marginsDisabledSrc} />
    </CanvasToggle>
  );
};

export default MarginsToggle;
