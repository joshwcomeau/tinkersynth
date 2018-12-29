// @flow
import React, { useEffect, useState, useRef } from 'react';

type Props = {
  as?: any,
  value: any,
  sustain: number,
  release: number,
  children: React$Node,
};

const FadeAfterChange = ({
  as = 'div',
  value,
  sustain,
  release,
  children,
}: Props) => {
  const releaseTimeoutId = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(
    () => {
      window.clearTimeout(releaseTimeoutId.current);

      if (!isVisible) {
        setIsVisible(true);
      } else {
        releaseTimeoutId.current = window.setTimeout(() => {
          setIsVisible(false);
        }, sustain);
      }
    },
    [value]
  );

  return React.createElement(
    as,
    {
      style: {
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${isVisible ? 100 : release}ms`,
      },
    },
    children
  );
};

// $FlowIgnore
export default React.memo(FadeAfterChange);
