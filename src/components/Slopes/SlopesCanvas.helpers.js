// @flow
import { COLORS, UNIT } from '../../constants';
import { clamp, normalize } from '../../utils';

/**
 * The canvas dimensions are actually quite complicated!
 *
 * On desktop, we want to keep a consistent height, while tweaking the width
 * depending on the aspect ratio.
 *
 * On mobile, we do the opposite, since we want to always fill the available
 * width.
 */
export const getCanvasDimensions = (windowDimensions, aspectRatio) => {
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
  kind: 'main' | 'framed-preview',
  context: CanvasRenderingContext2D,
  devicePixelRatio: number,
  scaleRatio: number = 1,
  { enableDarkMode, dotRatio }: any
) => {
  // prettier-ignore
  const MAX_WIDTH = 2.5;
  const DEFAULT_WIDTH = 1;

  let lineWidth =
    dotRatio === 0
      ? DEFAULT_WIDTH
      : clamp(
          normalize(dotRatio, 0.5, 1, DEFAULT_WIDTH, MAX_WIDTH),
          1,
          MAX_WIDTH
        );

  if (kind === 'framed-preview') {
    // In the smaller framed preview, we scale the canvas down, so we need to
    // boost the line thickness
    lineWidth *= 1 / scaleRatio;

    // ...of course, we should also take in our devicePixelRatio, to make sure it
    // looks clean and nice on retina displays.
    if (lineWidth > 1 && devicePixelRatio > 1) {
      lineWidth /= devicePixelRatio;
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
    context,
    lineColor: enableDarkMode ? COLORS.white : COLORS.black,
    backgroundColor: 'transparent',
    lineWidth,
    lineCap,
  };
};
