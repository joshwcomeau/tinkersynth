// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Svg from '../Svg';
import UnstyledButton from '../UnstyledButton';

type Props = {
  id: string,
  size?: number,
  color?: 'black' | 'red',
  icon?: React$Node,
  handlePress: (ev: any) => void,
};

const ResetButton = ({
  id,
  size = 40,
  color = 'red',
  icon,
  handlePress,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Button
      onClick={handlePress}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => isActive && setIsActive(false)}
      onKeyDown={ev => {
        if (!isActive && ev.key === 'Enter') {
          setIsActive(true);
        }
      }}
      onKeyUp={ev => {
        if (ev.key === 'Enter') {
          setIsActive(false);
        }
      }}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        style={{ transform: 'translateY(-2px)' }}
      >
        <circle id="blackness" cx="20" cy="22" r="18" fill="#2B2B2B" />
        <g id="button-ring">
          <path
            d="M40 22C40 33.0457 31.0457 42 20 42C8.9543 42 0 33.0457 0 22C0 10.9543 8.9543 2 20 2C31.0457 2 40 10.9543 40 22ZM4.81942 22C4.81942 30.384 11.616 37.1806 20 37.1806C28.384 37.1806 35.1806 30.384 35.1806 22C35.1806 13.616 28.384 6.81942 20 6.81942C11.616 6.81942 4.81942 13.616 4.81942 22Z"
            fill="url(#rb-linear-1)"
          />
          <path
            d="M40 22C40 33.0457 31.0457 42 20 42C8.9543 42 0 33.0457 0 22C0 10.9543 8.9543 2 20 2C31.0457 2 40 10.9543 40 22ZM4.81942 22C4.81942 30.384 11.616 37.1806 20 37.1806C28.384 37.1806 35.1806 30.384 35.1806 22C35.1806 13.616 28.384 6.81942 20 6.81942C11.616 6.81942 4.81942 13.616 4.81942 22Z"
            fill="url(#rb-radial-1)"
          />
        </g>
        <path
          d="M36.5 22C36.5 26.3761 34.7616 30.5729 31.6673 33.6673C28.5729 36.7616 24.3761 38.5 20 38.5C15.6239 38.5 11.4271 36.7616 8.33274 33.6673C5.23839 30.5729 3.5 26.3761 3.5 22"
          stroke="url(#rb-linear-2)"
          strokeOpacity="0.5"
          strokeLinecap="round"
          id="bottom-highlight"
          filter="url(#rb-filter)"
        />
        <path
          d="M8.21985 7.39015C11.4832 4.56555 15.6528 3.00752 19.9687 3.00003C24.2847 2.99253 28.4597 4.53607 31.7328 7.34932"
          stroke="url(#rb-linear-3)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ mixBlendMode: 'luminosity' }}
          id="top-highlight"
          filter="url(#rb-filter-2)"
        />

        {/* <g id="Ellipse_2" filter="url(#rb-glow-filter)">
          <circle cx="20" cy="22" r="18" fill="#FF2D1A" fill-opacity="0.4" />
        </g> */}

        <circle id="Button" cx="20" cy="22" r="15" fill="#2b2b2b" />
        <circle id="Button" cx="20" cy="22" r="14" fill="#FF2D1A" />
        <circle
          cx="20"
          cy="22"
          r="12"
          fill="url(#rb-linear-4)"
          style={{ mixBlendMode: 'hard-light' }}
          id="3d-effect"
        />
        <defs>
          <filter
            id="rb-filter"
            x="2"
            y="20.5"
            width="36"
            height="19.5"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.5"
              result="effect1_foregroundBlur"
            />
          </filter>
          <filter
            id="rb-filter-2"
            x="5.22"
            y="0"
            width="29.513"
            height="10.39"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur" />
          </filter>
          <filter
            id="rb-glow-filter"
            x="0"
            y="0"
            width="66"
            height="66"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="2.5"
              result="effect1_foregroundBlur"
            />
          </filter>
          <linearGradient
            id="rb-linear-1"
            x1="20"
            y1="2"
            x2="20"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF2D1A" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient
            id="rb-radial-1"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 20 -20 0 20 22)"
          >
            <stop offset="0.773" stopColor="#585858" />
            <stop offset="1" stopColor="#D9D9D9" />
          </radialGradient>
          <linearGradient
            id="rb-linear-2"
            x1="40.719"
            y1="22"
            x2="-1.25"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" stopOpacity="0" />
            <stop offset="0.49" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="rb-linear-3"
            x1="1"
            y1="2"
            x2="39.5"
            y2="2"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" stopOpacity="0.25" />
            <stop offset="0.508" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.44" />
          </linearGradient>
          <linearGradient
            id="rb-linear-4"
            x1="20"
            y1="10"
            x2="20"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0.33" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.21" />
          </linearGradient>
        </defs>
      </Svg>
    </Button>
  );
};

const Button = styled(UnstyledButton)`
  position: relative;
  border-radius: 100px;
  /* border: 4px solid white; */
`;

export default ResetButton;
