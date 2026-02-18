/**
 * Simple hook that spawns and terminates a Web Worker with the React component
 * lifecycle. Accepts a factory function that returns a Worker instance
 * (e.g. () => new Worker(new URL('./my.worker.ts', import.meta.url))).
 */

import React from 'react';

type Worker = any;
type WorkerFactory = () => Worker;

const useWorker = (createWorker: WorkerFactory): Worker => {
  // In SSR mode, just return a dummy object
  if (typeof window === 'undefined') {
    return {};
  }

  // Create a worker. This will be a long-lived worker, we use for all drawing.
  const worker = React.useRef<Worker | null>(null);
  if (worker.current === null) {
    worker.current = createWorker();
  }

  React.useEffect(() => {
    return () => {
      if (worker.current) {
        worker.current.terminate();
        worker.current = null;
      }
    };
  }, []);

  return worker.current;
};

export default useWorker;
