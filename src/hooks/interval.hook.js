// @flow
import React from 'react';

const useInterval = (callback: Function, delay) => {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(
    () => {
      const tick = () => savedCallback.current();

      if (typeof delay === 'number') {
        let id = window.setInterval(tick, delay);

        return () => window.clearInterval(id);
      }
    },
    [delay]
  );
};

export default useInterval;
