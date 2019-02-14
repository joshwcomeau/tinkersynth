// @flow
import React from 'react';

const useTimeout = (callback: Function, delay?: ?number) => {
  const callbackRef = React.useRef(callback);

  React.useEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback]
  );

  React.useEffect(
    () => {
      if (delay === null || delay === undefined) {
        return;
      }

      const timeoutId = window.setTimeout(callbackRef.current, delay);

      return () => {
        window.clearTimeout(timeoutId);
      };
    },
    [delay]
  );
};

export default useTimeout;
