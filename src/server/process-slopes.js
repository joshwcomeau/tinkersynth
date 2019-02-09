/**
 * This file is a utility we can call after someone makes a purchase.
 *
 * It will take the set of parameters used on the client-side to build their
 * piece of art, and will generate an SVG similar to SlopesExports.
 *
 * It will also save it to disk, and produce a super-big PNG which can be
 * emailed to the user.
 *
 * Both the SVG and PNG will be saved to disk, so that the transactional
 * email sent to the user can link to them (seems easier than finding an ESP
 * that supports huge file attachments?). I might also want to add a cron job
 * that deletes the JPEG after a time. But whatever.
 */
const fs = require('fs');

const svg2img = require('svg2img');

import { polylinesToSVG } from '../vendor/polylines';

import {
  clipLinesWithMargin,
  groupPolylines,
  retraceLines,
} from '../helpers/line.helpers';
import { PRINT_SIZES } from '../constants';
import generator from '../components/Slopes/Slopes.generator';
import transformParameters from '../components/Slopes/Slopes.params';

const MOCK_PARAMS = {
  amplitudeAmount: 50,
  ballSize: 50,
  dotAmount: 0,
  enableDarkMode: false,
  enableMargins: true,
  enableOcclusion: true,
  isShuffled: false,
  lineAmount: 45,
  octaveAmount: 0,
  omega: 0,
  peaksCurve: {
    controlPoint1: [0.5, 0.5],
    endPoint: [0.5, 1],
    startPoint: [0.5, 0],
  },
  personInflateAmount: 50,
  perspective: 45,
  polarAmount: 0,
  seed: 12345,
  spikyness: 0,
  splitUniverse: 0,
  staticAmount: 0,
  waterBoilAmount: 100,
  wavelength: 25,
};

const writeFile = (...args) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(...args, err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

const process = async (size, params) => {
  const { width: printWidth, height: printHeight } = PRINT_SIZES[size];

  // Our aspect ratio depends on the size selected.
  // By default, our size is 18 x 24.
  const aspectRatio = printWidth / printHeight;

  const height = 552;
  const width = height * aspectRatio;
  const drawingVariables = transformParameters({
    height,
    ...params,
  });

  let lines = generator({
    width,
    height,
    ...drawingVariables,
  });

  // Create a smaller SVG by joining lines
  lines = groupPolylines(lines);

  // Trim any lines that fall outside the SVG size
  lines = clipLinesWithMargin({ lines, width, height, margins: [0, 0] });

  const svgMarkup = polylinesToSVG(lines, { width, height });

  // TODO: maybe I ought to push these to Amazon s3 or something?
  await writeFile('test.svg', svgMarkup);

  // Create a raster PNG as well
  // We want our raster image to be printable at 300dpi.
  const rasterWidth = printWidth * 300;
  const rasterHeight = printHeight * 300;
  svg2img(
    svgMarkup,
    { width: rasterWidth, height: rasterHeight },
    async (error, buffer) => {
      await writeFile('test.png', buffer);
    }
  );
};

export default process;
