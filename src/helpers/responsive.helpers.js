import { BREAKPOINT_SIZES } from '../constants';

export const getBreakpointFor = windowWidth =>
  Object.keys(BREAKPOINT_SIZES).find(
    name => windowWidth <= BREAKPOINT_SIZES[name]
  ) || 'xl';

export const getIsMobile = breakpoint => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  return breakpoint === 'xs' || breakpoint === 'sm';
};

export const isDesktop = breakpoint => !getIsMobile(breakpoint);

export const isLargeScreen = breakpoint => {
  if (typeof window === 'undefined') {
    return true;
  }

  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  return breakpoint === 'lg' || breakpoint === 'xl';
};
