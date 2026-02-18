import React from 'react';

// Safari and Opera lack support for this feature.
// For these browsers, we'll just mount it immediately.
const supportsIntersectionObserver =
  typeof window.IntersectionObserver !== 'undefined';

const MountUponEnteringViewport = ({ children }) => {
  if (!supportsIntersectionObserver) {
    return children;
  }

  const placeholderRef = React.useRef(null);

  const [hasEnteredViewport, setHasEnteredViewport] = React.useState(false);

  React.useEffect(() => {
    // If, somehow, we mount without getting access to the span we're supposed
    // to render, throw an exception
    if (!placeholderRef.current) {
      throw new Error('Could not access placeholder ref ??');
    }

    const observer = new IntersectionObserver(entries => {
      // While the IntersectionObserver API supports multiple entries, we'll
      // only ever have 1, since we're only observing a single node.
      const [entry] = entries;

      if (entry.isIntersecting) {
        setHasEnteredViewport(true);
      }
    });

    observer.observe(placeholderRef.current);

    return () => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    };
  }, []);

  return hasEnteredViewport ? children : <span ref={placeholderRef} />;
};

export default MountUponEnteringViewport;
