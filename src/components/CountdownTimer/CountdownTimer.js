// @flow
/**
 * TODO: This is currently unused, and totally incomplete.
 *
 * Right now, the only Toast is the easter-egg notification when the keyboard
 * breaks the machine. Because this is for keyboard users only, the `dismiss`
 * button is pre-selected, and thus it is very easy to dismiss!
 *
 * If I add other toast notifications for mouse-users, an auto-dismiss might
 * be useful, to avoid forcing the user to jet across the screen to close it.
 */
import React from 'react';
import styled from 'styled-components';

type Props = {
  duration: number,
  size: number,
  onElapsed: () => void,
};

const CountdownTimer = ({ size }: Props) => {
  // `size` is the diameter of our circular time indicator
  return <Wrapper />;
};

export default CountdownTimer;
