import React from 'react';
import styled, { keyframes } from 'styled-components';

import useToggle from '../../hooks/toggle.hook';
import { range, random, normalize } from '../../utils';

import Svg from '../Svg';
import Spacer from '../Spacer';
import LoadingTouchSlider from './LoadingTouchSlider';

const useBlinkingLights = (initialValue, maxNum) => {
  const [num, setNum] = React.useState(initialValue);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setNum(random(1, maxNum));

      timeoutId = window.setTimeout(update, random(400, 700));
    };

    timeoutId = window.setTimeout(update, random(400, 700));

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return num;
};

const LoadingEarth = () => {
  const [hasBegun, toggleBegun] = useToggle(false);

  const sliderValue = useBlinkingLights(0, 8);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      toggleBegun();
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Wrapper>
      <Svg
        width="30"
        height="28"
        viewBox="0 0 30 28"
        fill="none"
        style={{ opacity: hasBegun ? 1 : 0, transition: 'opacity 650ms' }}
      >
        <circle cx="15" cy="17" r="11" stroke="#1AD9FF" strokeWidth="2" />
        <mask
          id="mask0"
          maskUnits="userSpaceOnUse"
          x="6"
          y="8"
          width="18"
          height="18"
        >
          <circle cx="15" cy="17" r="8.8" fill="#C4C4C4" />
        </mask>

        <g
          mask="url(#mask0)"
          stroke="#32FF98"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <EarthGroup>
            <path d="M8.03333 17.0001L4 12.0501V9.30015L6.30476 8.20015H9.7619L10.9143 10.9501L13.219 10.4001L14.3714 13.1501L12.0667 13.7001L10.3381 16.4501L13.7952 17.5501L16.1 19.7501L13.7952 22.5001L10.9143 24.7001L12.0667 20.8501L10.3381 18.1001L8.03333 17.0001Z" />
            <path d="M19.7038 18.1001L20.5 15.9001L22.7 14.8001L24.9 15.3501H27.1L28.75 18.6501L29.85 21.9501L27.65 24.7001L24.9 24.1501L23.25 19.7501L21.6 20.3001L19.7038 18.1001Z" />
            <path d="M20.5 13.1501L21.6 10.9501L20.5 7.65015L23.25 8.20015L30.4 10.4001L26 13.7001L23.8 12.6001L20.5 13.1501Z" />
          </EarthGroup>
        </g>
      </Svg>

      <Spacer size={8} />

      <LoadingTouchSlider width={26} height={10} count={16} />

      <Spacer size={6} />
    </Wrapper>
  );
};

const rotate = keyframes`
  from {
    transform: translateX(-80%);
  }
  to {
    transform: translateX(65%);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background: #2b2b2b;
  border-radius: 4px;
`;

const EarthGroup = styled.g`
  animation: ${rotate} 9s linear infinite;
`;

export default LoadingEarth;
