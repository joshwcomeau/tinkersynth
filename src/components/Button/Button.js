// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import { clamp } from '../../utils';

import UnstyledButton from '../UnstyledButton';

type ButtonSize = 'medium' | 'large';

type Props = {
  color?: string,
  disabled?: boolean,
  kind?: 'flat' | '3d',
  size?: ButtonSize,
  children: React$Node,
};

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

// $FlowFixMe - ugh idk
const Button = React.forwardRef(
  (
    {
      color = COLORS.blue[500],
      disabled,
      kind = '3d',
      size = 'medium',
      children,
      ...delegated
    }: Props,
    ref
  ) => {
    const actualColor = disabled ? COLORS.gray[700] : color;

    const darkerColor = getLowlightColor(actualColor, 0.5);
    const darkerColorInvisible = getLowlightColor(actualColor, 0);

    const Component = size === 'medium' ? MediumButton : LargeButton;

    return (
      <Component
        ref={ref}
        {...delegated}
        disabled={disabled}
        style={{
          backgroundColor: actualColor,
          ...(delegated.style || {}),
        }}
      >
        {kind === '3d' && (
          <Effects>
            <Highlight />

            <Lowlight fromColor={darkerColorInvisible} toColor={darkerColor} />
            <EffectDampener style={{ backgroundColor: actualColor }} />
          </Effects>
        )}

        <Children>{children}</Children>
      </Component>
    );
  }
);

const Wrapper = styled(UnstyledButton)`
  position: relative;
  padding-left: ${UNIT * 4}px;
  padding-right: ${UNIT * 4}px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
  }
`;

const MediumButton = styled(Wrapper)`
  height: 38px;
  font-size: 15px;
`;

const LargeButton = styled(Wrapper)`
  height: 48px;
  font-size: 18px;
`;

const Children = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;
  color: #fff !important;

  ${Wrapper}:active:not(:disabled) & {
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

  ${Wrapper}:active:not(:disabled) & {
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
