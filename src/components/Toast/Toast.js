// @flow
import React from 'react';
import styled from 'styled-components';

import type { Toast } from '../../types';

type Props = Toast;

const ToastComponent = ({ title, message, kind }: Props) => {
  return (
    <div>
      {title}
      {message}
      {kind}
    </div>
  );
};

export default ToastComponent;
