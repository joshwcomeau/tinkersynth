// @flow
// $FlowFixMe
import { useRef, useEffect } from 'react';

const useBoundingBox = () => {
  // Our `ref` is needed to be passed to the component's `ref` attribute.
  const ref = useRef(null);
  // We're using `useRef` for our boundingBox just as an instance variable.
  // Some bit of mutable state that doesn't require re-renders.
  const boundingBox = useRef(null);

  useEffect(() => {
    if (ref.current) {
      boundingBox.current = ref.current.getBoundingClientRect();
    }
  });

  return [ref, boundingBox.current];
};

export default useBoundingBox;
