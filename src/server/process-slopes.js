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
import path from 'path';

import uuid from 'uuid/v1';
import { polylinesToSVG } from '../vendor/polylines';

import { PRINT_SIZES } from '../constants';
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

const processSlopes = async (size, format, params) => {
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

  // Trim any lines that fall outside of our SVG (or our margins)
  const fullMarginSize = getMarginSize(height);
  const actualMarginSize = params.enableMargins
    ? fullMarginSize
    : fullMarginSize * 0.1;
  lines = clipLinesWithMargin({
    lines,
    width,
    height,
    margins: [actualMarginSize, actualMarginSize],
  });

  const fileId = uuid();

  const lineColor = params.enableDarkMode ? '#FFFFFF' : '#000000';
  const backgroundColor = params.enableDarkMode ? '#000000' : '#FFFFFF';

  // Create two copies: one with a transparent background, and one with an
  // appropriately contrasted background
  const svgMarkupTransparent = polylinesToSVG(lines, {
    width,
    height,
    lineColor,
  });
  const svgMarkupOpaque = polylinesToSVG(lines, {
    width,
    height,
    lineColor,
    background: backgroundColor,
  });

  const fileOutputPath = path.join(__dirname, '../../output');

  const svgPath = path.join(fileOutputPath, `${fileId}.svg`);
  const pngPathTransparent = path.join(
    fileOutputPath,
    `${fileId}.transparent.png`
  );
  const pngPathOpaque = path.join(fileOutputPath, `${fileId}.opaque.png`);

  // Create a raster PNG as well
  // We want our raster image to be printable at 300dpi.
  const rasterWidth = printWidth * 300;
  const rasterHeight = printHeight * 300;

  const bufferTransparent = await rasterize(
    svgMarkupTransparent,
    rasterWidth,
    rasterHeight
  );
  const bufferOpaque = await rasterize(
    svgMarkupOpaque,
    rasterWidth,
    rasterHeight
  );

  try {
    // prettier-ignore
    await parallel(
      writeFile(svgPath, svgMarkupTransparent),
      writeFile(pngPathTransparent, bufferTransparent),
      writeFile(pngPathOpaque, bufferOpaque)
    );
  } catch (err) {
    console.error('Could not save to local disk', err);
  }

  return { fileId, svgPath, pngPathTransparent, pngPathOpaque };
};

export default processSlopes;
