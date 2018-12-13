import { throttle } from '../../utils';

import generator from './Slopes.generator';

const generateLines = data => generator(data);

onmessage = throttle(function({ data }) {
  const lines = generateLines(data);

  postMessage({ lines });
}, 60);
