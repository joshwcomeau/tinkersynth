// @flow
/**
 * Simple hook that spawns and terminates a Web Worker with the React component
 * lifecycle.
 */

import React from 'react';

type Worker = any;
type WorkerConstructorType = () => Worker;

const useWorker = (WorkerConstructor: WorkerConstructorType): Worker => {
  // In SSR mode, just return a dummy object
  if (typeof window === 'undefined') {
    return {};
  }

  // Create a worker. This will be a long-lived worker, we use for all drawing.
  const worker = React.useRef(null);
  if (worker.current === null) {
    worker.current = new WorkerConstructor();
  }

  React.useEffect(() => {
    return () => {
      if (worker.current) {
        worker.current.terminate();
      }
    };
  }, []);

  return worker.current;
};

export default useWorker;
