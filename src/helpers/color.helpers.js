// @flow
type HSBColor = {
  hue: number,
  saturation: number,
  brightness: number,
  alpha?: number,
};
type HSLColor = {
  hue: number,
  saturation: number,
  lightness: number,
  alpha?: number,
};

export const convertHSBToHSL = (color: HSBColor): HSLColor => {
  // The formula I found expects saturation and brightness to be 0-1, instead
  // of 0-100. Rather than actually use my brain to think about what this
  // formula is doing, I'm just gonna normalize the inputs and then revert it
  // before returning.
  const inputBrightness = color.brightness / 100;
  const inputSaturation = color.saturation / 100;

  const outputLightness = ((2 - inputSaturation) * inputBrightness) / 2;
  const outputSaturation =
    outputLightness && outputLightness < 1
      ? (inputSaturation * inputBrightness) /
        (outputLightness < 0.5 ? outputLightness * 2 : 2 - outputLightness * 2)
      : inputSaturation;

  return {
    hue: color.hue,
    saturation: Math.round(outputSaturation * 100),
    lightness: Math.round(outputLightness * 100),
  };
};

export const stringifyHSL = (color: HSLColor) => {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
};
