// @flow
import React, { useState, useRef, useEffect } from 'react';

import { random } from '../../utils';

type Props = {
  minDelay: number,
  maxDelay: number,
  children: React$Node,
};

const MountAfterDelay = ({ minDelay, maxDelay, children }: Props) => {
  const timeoutRef = useRef(null);
  const [hasBegun, setBegin] = useState(false);

  const delay = random(minDelay, maxDelay);

  useEffect(() => {
    // A lot of stuff happens when the app mounts. Delay the logo particle
    // effects a bit
    timeoutRef.current = window.setTimeout(() => {
      setBegin(true);
    }, delay);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return hasBegun ? children : null;
};

export default MountAfterDelay;
