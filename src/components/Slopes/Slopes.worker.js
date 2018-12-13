import { throttle } from '../../utils';
import { scaleCanvas } from '../../helpers/canvas.helpers';

import { renderPolylines } from '../../vendor/polylines';

import generator from './Slopes.generator';

let ctx;

onmessage = throttle(function({ data }) {
  const { canvas, devicePixelRatio, ...lineData } = data;

  const lines = generator(data);

  if (!ctx) {
    ctx = canvas.getContext('2d');
    console.log('Scaling');
    scaleCanvas(ctx, devicePixelRatio);
  }

  renderPolylines(lines, {
    width: lineData.width,
    height: lineData.height,
    context: ctx,
  });
}, 20);
