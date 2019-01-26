// @flow
import React from 'react';
import { u2728 as surpriseIcon } from 'react-icons-kit/noto_emoji_regular/u2728';

import Spacer from '../components/Spacer';

import type { Toast } from '../types';

export const breakMachineWithKeyboard = () => ({
  type: 'BREAK_MACHINE_WITH_KEYBOARD',
  toast: {
    id: 'break-machine-keyboard',
    title: '😮 Surprise!',
    message: (
      <span>
        You discovered an easter egg, you crafty devil. Keyboard navigation
        allows you to <strong>exceed the range of some controls</strong>.<br />
        <Spacer size={8} />
        What will you do with your new powers?
      </span>
    ),
  },
});

export const dismissToast = toastId => ({
  type: 'DISMISS_TOAST',
  toastId,
});

export const selectFormat = format => ({
  type: 'SELECT_FORMAT',
  format,
});

export const selectSize = (width, height) => ({
  type: 'SELECT_FORMAT',
  size: { width, height },
});
