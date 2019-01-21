import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import { clamp } from '../../utils';

import UnstyledButton from '../UnstyledButton';

const getLowlightColor = (color, alpha) => {
  const hslMatcher = /hsl\(([\d]+),\s*([\d]+)%,\s*([\d]+)%\)/i;

  const match = color.match(hslMatcher);

  if (!match) {
    throw new Error('Invalid color supplied: ' + color);
  }

  const [, hue, saturation, lightness] = match;

  const newLightness = clamp(lightness - 25, 0, 100);

  return `hsla(${hue}, ${saturation}%, ${newLightness}%, ${alpha})`;
};

const Button = React.forwardRef(({ color, children, ...delegated }, ref) => {
  const darkerColor = getLowlightColor(color, 0.5);
  const darkerColorInvisible = getLowlightColor(color, 0);

  return (
    <Wrapper
      ref={ref}
      {...delegated}
      style={{
        backgroundColor: color,
        textShadow: `1px 1px 0px ${darkerColor}`,
        ...(delegated || {}),
      }}
    >
      <Effects>
        <Highlight />

        <Lowlight fromColor={darkerColorInvisible} toColor={darkerColor} />
        <EffectDampener style={{ backgroundColor: color }} />
      </Effects>

      <Children>{children}</Children>
    </Wrapper>
  );
});

const Wrapper = styled(UnstyledButton)`
  position: relative;
  font-size: 14px;
  height: 38px;
  color: white;
  padding-left: ${UNIT * 4}px;
  padding-right: ${UNIT * 4}px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
`;

const Children = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;

  ${Wrapper}:active & {
    transform: scale(0.95, 0.95);
  }
`;

const Effects = styled.div`
  position: absolute;
  z-index: 0;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  /* Don't allow the EffectDampener blur to leak out into the button */
  overflow: hidden;

  ${Wrapper}:active & {
    transform: rotate(180deg);
    opacity: 0.6;
  }
`;

const Highlight = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 75%;
  height: 85%;
  border-radius: 4px;
  background-image: linear-gradient(
    -20deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.3) 95%,
    rgba(255, 255, 255, 0.3) 100%
  );
`;

const Lowlight = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  width: 75%;
  height: 85%;
  border-radius: 4px;
  background-image: linear-gradient(
    160deg,
    ${props => props.fromColor},
    ${props => props.fromColor} 50%,
    ${props => props.toColor} 95%,
    ${props => props.toColor} 100%
  );
`;

const EffectDampener = styled.div`
  position: absolute;
  z-index: 2;
  width: 80%;
  height: 60%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  filter: blur(6px);
  opacity: 0.75;
`;

export default Button;
