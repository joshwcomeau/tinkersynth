// @flow

export const breakMachineWithKeyboard = () => ({
  type: 'BREAK_MACHINE_WITH_KEYBOARD',
  toast: {
    id: 'break-machine-keyboard',
    type: 'success',
    title: 'You broke it!',
    message:
      'Not to worry, though. This machine is designed to work even outside the normal range of values.',
  },
});
