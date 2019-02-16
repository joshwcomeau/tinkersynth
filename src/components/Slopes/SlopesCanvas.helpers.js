// @flow
import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';

export const getRenderOptions = (
  width: number,
  height: number,
  context: CanvasRenderingContext2D,
  scaleRatio?: number = 1,
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

  // In the smaller framed preview, we scale the canvas down, so we need to
  // boost the line thickness
  lineWidth *= 1 / scaleRatio;

  return {
    width,
    height,
    context,
    lineColor: enableDarkMode ? COLORS.white : COLORS.gray[900],
    background: 'transparent',
    lineWidth,
  };
};
