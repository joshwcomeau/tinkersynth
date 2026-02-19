import React from 'react';
import BaseIcon from 'react-icons-kit';

function Icon({ icon, tag = 'div', ...props }: any) {
  return <BaseIcon icon={icon} tag={tag} {...props} />;
}

export default Icon;
