import { compose } from './utils';

import { convertHSBToHSL, stringifyHSL } from './helpers/color.helpers';

// Our colors in Figma are given in HSB, which is a really intuitive way to
// understand color. Unfortunately, CSS only support HSL, which is less
// intuitive. Do the conversion here.
const prepColor = compose(
  stringifyHSL,
  convertHSBToHSL
);

export const COLORS = {
  gray: {
    100: prepColor({
      hue: 0,
      saturation: 0,
      brightness: 95,
    }),

    300: prepColor({
      hue: 0,
      saturation: 0,
      brightness: 87,
    }),

    500: prepColor({
      hue: 0,
      saturation: 0,
      brightness: 62,
    }),

    700: prepColor({
      hue: 0,
      saturation: 0,
      brightness: 40,
    }),

    900: prepColor({
      hue: 0,
      saturation: 0,
      brightness: 24,
    }),
  },
  white: prepColor({
    hue: 0,
    saturation: 0,
    brightness: 100,
  }),
  black: prepColor({
    hue: 0,
    saturation: 0,
    brightness: 0,
  }),
};

export const PRIMARY_BACKGROUND = COLORS.gray[100];

export const FONT_WEIGHTS = {
  book: 500,
  medium: 600,
  bold: 700,
  black: 900,
};

export const BREAKPOINT_SIZES = {
  sm: 540,
  md: 900,
  lg: 1200,
};

export const BREAKPOINTS = {
  sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  mdMin: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
  lgMin: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
};

export const Z_INDICES = {
  sidebar: 100,
  modal: 1000,
  loadingScreen: 2000,
  titlebar: 10000,
};
