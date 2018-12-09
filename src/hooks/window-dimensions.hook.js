// @flow
// $FlowFixMe
import { useState, useEffect } from 'react';

type Dimensions = { width: number, height: number };

const useWindowDimensions = (): Dimensions => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateWindowDimensions = ev => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
