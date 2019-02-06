// @flow
import React from 'react';

const useScrollDisabler = (disableScrolling: boolean) => {
  if (typeof document === 'undefined') {
    return;
  }

  // Capture the "original" values for certain things, so that we can
  // effectively repeal this effect on unmount, or on toggling the effect off.
  const originalStyles = React.useRef({
    overflow: document.body.style.overflow,
    position: document.body.style.position,
    width: document.body.style.width,
    height: document.body.style.height,
    top: document.body.style.top,
  });

  const originalScrollY = React.useRef(window.scrollY);

  React.useEffect(
    () => {
      document.body.style.overflow = disableScrolling
        ? 'hidden'
        : originalStyles.current.overflow;
      document.body.style.position = disableScrolling
        ? 'fixed'
        : originalStyles.current.position;
      document.body.style.width = disableScrolling
        ? '100%'
        : originalStyles.current.width;
      document.body.style.height = disableScrolling
        ? `calc(100% + ${originalScrollY.current}px)`
        : originalStyles.current.height;
      document.body.style.top = disableScrolling
        ? `-${originalScrollY.current}px`
        : originalStyles.current.top;

      if (!disableScrolling) {
        window.scrollTo(0, originalScrollY.current);
      }
    },
    [disableScrolling]
  );
};

export default useScrollDisabler;
