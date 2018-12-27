// @flow
// $FlowFixMe
import { useRef, useState, useEffect } from 'react';

const useBoundingBox = () => {
  // Our `ref` is needed to be passed to the component's `ref` attribute.
  // $FlowFixMe
  const ref = useRef(null);

  // We're using `useRef` for our boundingBox just as an instance variable.
  // Some bit of mutable state that doesn't require re-renders.
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(
    () => {
      if (ref.current) {
        setBoundingBox(ref.current.getBoundingClientRect());
      }
    },
    [ref.current]
  );

  return [ref, boundingBox];
};

export default useBoundingBox;
