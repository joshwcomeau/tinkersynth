// @flow
import React from 'react';
import { u2728 as surpriseIcon } from 'react-icons-kit/noto_emoji_regular/u2728';

import Spacer from '../components/Spacer';
import TextLink from '../components/TextLink';

import type { Toast } from '../types';

export const breakMachineWithKeyboard = (triggerRef: ?HTMLElement) => ({
  type: 'BREAK_MACHINE_WITH_KEYBOARD',
  triggerRef,
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

export const clickDisabledCompartment = (triggerRef: ?HTMLElement) => ({
  type: 'CLICK_DISABLED_COMPARTMENT',
  triggerRef,
  toast: {
    id: 'click-disabled-compartment',
    title: 'This control is disabled.',
    message: (
      <>
        Sometimes, the value of one control means that another control doesn't
        do anything. In these cases, the control recedes into the machine.
        <br />
        <Spacer size={8} />
        Try tweaking other parameters to unlock this one!
      </>
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
