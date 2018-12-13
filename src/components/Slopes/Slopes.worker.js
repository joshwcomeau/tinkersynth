import generator from './Slopes.generator';

onmessage = function(e) {
  console.log('Worker: Message received from main script');
  console.log(e);
  postMessage({ hello: 'world' });
};
