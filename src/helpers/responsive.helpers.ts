import { BREAKPOINT_SIZES, IS_MOBILE_USER_AGENT } from '../constants';

export const getBreakpointFor = windowWidth =>
  Object.keys(BREAKPOINT_SIZES).find(
    name => windowWidth <= BREAKPOINT_SIZES[name]
  ) || 'xl';

export const getDeviceType = breakpoint => {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  if (breakpoint === 'xs' || breakpoint === 'sm' || IS_MOBILE_USER_AGENT) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};
