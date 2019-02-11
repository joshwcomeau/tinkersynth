/**
 * This module creates vector and raster images and saves them to local disk.
 *
 * TODO: It should probably receive a `generator` parameter as well, so that
 * this can be reused for other machines in the future.
 */
import path from 'path';

import uuid from 'uuid/v1';
import { polylinesToSVG } from '../vendor/polylines';

import { PRINT_SIZES, CANVAS_DISPLAY_HEIGHT } from '../constants';
import {
  clipLinesWithMargin,
  groupPolylines,
  retraceLines,
} from '../helpers/line.helpers';
import generator from '../components/Slopes/Slopes.generator';
import transformParameters from '../components/Slopes/Slopes.params';
import { getMarginSize } from '../components/Slopes/Slopes.helpers';

import { parallel, writeFile } from './utils';
import rasterize from './rasterization';

const getDrawingSettings = (size, artParams) => {
  const { width: printWidth, height: printHeight } = PRINT_SIZES[size];

  // Our aspect ratio depends on the size selected.
  // By default, our size is 18 x 24.
  const aspectRatio = printWidth / printHeight;

  // NOTE: using the same height as found in Slopes.js, so that the art is
  // identical... but maybe we should make this variable, and use a higher
  // number for the print?
  const height = CANVAS_DISPLAY_HEIGHT;
  const width = height * aspectRatio;

  const lineColor = artParams.enableDarkMode ? '#FFFFFF' : '#000000';
  const backgroundColor = artParams.enableDarkMode ? '#000000' : '#FFFFFF';

  return { width, height, printWidth, printHeight, lineColor, backgroundColor };
};

const generateLines = (width, height, artParams) => {
  const drawingVariables = transformParameters({
    height,
    ...artParams,
  });

  let lines = generator({
    width,
    height,
    ...drawingVariables,
  });

  // Create a smaller SVG by joining lines
  lines = groupPolylines(lines);

  // Trim any lines that fall outside of our SVG (or our margins)
  const fullMarginSize = getMarginSize(height);
  const actualMarginSize = artParams.enableMargins
    ? fullMarginSize
    : fullMarginSize * 0.1;

  return clipLinesWithMargin({
    lines,
    width,
    height,
    margins: [actualMarginSize, actualMarginSize],
  });
};

// Utility to create an SVG, given the requested size (small|medium|large) and
// the art params.
export const createVectorImage = async (size, artParams) => {
  const { width, height, lineColor, backgroundColor } = getDrawingSettings(
    size,
    artParams
  );

  const lines = generateLines(width, height, artParams);

  const fileId = uuid();
  const fileExtension = 'svg';
  const filePath = path.join(
    __dirname,
    `../../output/${fileId}.${fileExtension}`
  );

  const markup = polylinesToSVG(lines, {
    width,
    height,
    lineColor,
    backgroundColor,
  });

  // Write the file to disk, and return all the necessary info about it.
  try {
    await writeFile(filePath, markup);
  } catch (err) {
    throw new Error('Could not write file to disk: ' + err);
  }

  return { id: fileId, path: filePath };
};

// A raster version of `createVectorImage`. Not DRY but IDC.
// Takes an optional 3rd arg, "options", to specify background color.
export const createRasterImage = async (
  size,
  artParams,
  { opaqueBackground, pixelsPerInch }
) => {
  const {
    width,
    height,
    printWidth,
    printHeight,
    lineColor,
    backgroundColor,
  } = getDrawingSettings(size, artParams);

  const lines = generateLines(width, height, artParams);

  const fileId = uuid();
  const fileExtension = 'png';
  const filePath = path.join(
    __dirname,
    `../../output/${fileId}.${fileExtension}`
  );

  const markup = polylinesToSVG(lines, {
    width,
    height,
    lineColor,
    backgroundColor: opaqueBackground && backgroundColor,
  });

  const rasterWidth = printWidth * pixelsPerInch;
  const rasterHeight = printHeight * pixelsPerInch;

  const buffer = await rasterize(markup, rasterWidth, rasterHeight);

  // Write the file to disk, and return all the necessary info about it.
  try {
    await writeFile(filePath, buffer);
  } catch (err) {
    throw new Error('Could not write file to disk: ' + err);
  }

  return { id: fileId, path: filePath };
};
