// @flow
// $FlowFixMe
import { useRef, useState, useEffect } from 'react';

const useHoverElement = () => {
  // Our `ref` is needed to be passed to the component's `ref` attribute.
  const ref = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    if (ref.current) {
      ref.current.addEventListener('mouseenter', handleMouseEnter);
      ref.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return [ref, isHovering];
};

export default useHoverElement;
