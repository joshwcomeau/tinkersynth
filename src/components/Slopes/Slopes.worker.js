import generator from './Slopes.generator';

onmessage = function({ data }) {
  postMessage({ lines: generator(data) });
};
