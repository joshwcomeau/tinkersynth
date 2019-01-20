// @flow
import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';

export const getRenderOptions = (
  width: number,
  height: number,
  context: CanvasRenderingContext2D,
  { enableDarkMode, dotRatio }: any
) => {
  console.log({ enableDarkMode, dotRatio });
  // prettier-ignore
  const MAX_WIDTH = 2.5;
  const DEFAULT_WIDTH = 1;

  const lineWidth =
    dotRatio === 0
      ? DEFAULT_WIDTH
      : clamp(
          normalize(dotRatio, 0.5, 1, DEFAULT_WIDTH, MAX_WIDTH),
          1,
          MAX_WIDTH
        );

  console.log(dotRatio, lineWidth);

  return {
    width,
    height,
    context,
    lineColor: enableDarkMode ? COLORS.white : COLORS.gray[900],
    background: 'transparent',
    lineWidth,
  };
};
