// @flow
// $FlowFixMe
import { useRef, useState, useEffect } from 'react';

import { debounce } from '../utils';

const useBoundingBox = () => {
  // Our `ref` is needed to be passed to the component's `ref` attribute.
  // $FlowFixMe
  const ref = useRef(null);

  // We're using `useRef` for our boundingBox just as an instance variable.
  // Some bit of mutable state that doesn't require re-renders.
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(
    () => {
      if (!ref.current) {
        return;
      }

      setBoundingBox(ref.current.getBoundingClientRect());
    },
    [ref.current]
  );

  // We want to re-capture the bounding box whenever the user scrolls or
  // resizes the window.
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const recalculate = debounce(() => {
      if (ref.current) {
        setBoundingBox(ref.current.getBoundingClientRect());
      }
    }, 250);

    window.addEventListener('scroll', recalculate);
    window.addEventListener('resize', recalculate);

    return () => {
      window.removeEventListener('scroll', recalculate);
      window.removeEventListener('resize', recalculate);
    };
  }, []);

  return [ref, boundingBox];
};

export default useBoundingBox;
