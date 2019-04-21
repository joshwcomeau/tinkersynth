// @flow
import {
  COLORS,
  UNIT,
  LIGHT_BACKGROUND,
  DARK_BACKGROUND,
} from '../../constants';
import { clamp, normalize } from '../../utils';

import { SLOPES_ASPECT_RATIO } from './Slopes.constants';

/**
 * The canvas dimensions are actually quite complicated!
 *
 * On desktop, we want to keep a consistent height, while tweaking the width
 * depending on the aspect ratio.
 *
 * On mobile, we do the opposite, since we want to always fill the available
 * width.
 */
export const getCanvasDimensions = (
  windowDimensions,
  aspectRatio = SLOPES_ASPECT_RATIO
) => {
  const defaultHeight = 552;
  const defaultWidth = defaultHeight * aspectRatio;

  // When actually building the image on the server, we'll use our default
  // desktop size. This might mean the mobile design is sliiiightly different,
  // but it should be ok.
  // TODO: test this hypothesis.
  if (!windowDimensions) {
    return { height: defaultHeight, width: defaultHeight * aspectRatio };
  }

  // We'll assume it's desktop if our width is larger than the natural canvas
  // size
  if (windowDimensions.width > defaultWidth) {
    return { width: defaultWidth, height: defaultHeight };
  }

  // If our width is smaller than that, we essentially want to fill the
  // available width, and work out a derived height
  // We add a bit of spacing, so that the canvas doesn't run to the edges of
  // the screen.
  const padding = UNIT * 2;
  const width = windowDimensions.width - padding * 2;
  const height = width * (1 / aspectRatio);

  return { width, height };
};

export const getRenderOptions = (
  width: number,
  height: number,
  kind: 'main' | 'download-transparent' | 'download-opaque',
  { enableDarkMode, dotRatio }: any
) => {
  const MIN_WIDTH = 1;
  const MAX_WIDTH = 2.5;

  const lineWidth =
    dotRatio === 0
      ? MIN_WIDTH
      : clamp(
          normalize(dotRatio, 0.5, 1, MIN_WIDTH, MAX_WIDTH),
          MIN_WIDTH,
          MAX_WIDTH
        );

  let backgroundColor;

  switch (kind) {
    case 'main':
    case 'download-transparent': {
      backgroundColor = 'transparent';
      break;
    }

    case 'download-opaque': {
      backgroundColor = enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;
      break;
    }
  }

  // Our linecap doesn't make much difference in the small preview, but it is
  // noticeable when printed or sent as a vector.
  //
  // The choice will depend on the parameters. If the `dotRatio` is more than
  // 0, it makes sense to use a round linecap. Otherwise, use the default butt
  const lineCap = dotRatio > 0 ? 'round' : 'butt';

  return {
    width,
    height,
    lineColor: enableDarkMode ? COLORS.white : COLORS.black,
    backgroundColor,
    lineWidth,
    lineCap,
  };
};
