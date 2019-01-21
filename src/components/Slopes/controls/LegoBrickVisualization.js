import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { range, normalize } from '../../../utils';
import { createSvgPathForPoints } from '../../../helpers/line.helpers';

import Svg from '../../Svg';

const getTranslateValue = (ratio, brickId) => {
  let offset;

  switch (brickId) {
    case 'red-brick': {
      offset = normalize(ratio, 0, 1, 0, -30);
      break;
    }
    case 'aqua-brick': {
      offset = normalize(ratio, 0, 1, 0, -20);
      break;
    }
    case 'yellow-brick': {
      offset = normalize(ratio, 0, 1, 0, -10);
      break;
    }
  }

  return `translateY(${offset}px)`;
};

const LegoBrickVisualization = ({ value, size, isAnimated }) => {
  const spring = useSpring({
    ratio: value / 100,
    config: {
      tension: 80,
      friction: 14,
    },
    immediate: !isAnimated,
  });

  return (
    <Wrapper style={{ width: size, height: size, margin: 'auto' }}>
      <Svg width={size} height={size} viewBox="0 0 54 54">
        <mask
          id="lego-mask"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="2"
          width="50"
          height="50"
        >
          <rect width="54" height="54" fill="#000000" />
        </mask>

        <g mask="url(#lego-mask)">
          <animated.g
            data-layer-name="yellow-brick"
            style={{
              transform: spring.ratio.interpolate(ratio =>
                getTranslateValue(ratio, 'yellow-brick')
              ),
            }}
          >
            <path
              data-layer-name="Vector 2"
              d="M8 43.2795V57.353L23.7922 69V54.9265L8 43.2795Z"
              fill="#C8B400"
            />
            <path
              data-layer-name="Vector 3"
              d="M23.7922 54.9265V69L46 61.1189V47.1619L23.7922 54.9265Z"
              fill="#E9D100"
            />
            <path
              data-layer-name="Vector 4"
              d="M29.7143 36L8 43.2794L23.7922 54.9264L46 47.1617L29.7143 36Z"
              fill="#FFEB33"
            />
            <g data-layer-name="Peg">
              <g data-layer-name="Base">
                <path
                  d="M32.6782 39.8824C32.6782 41.4906 30.4687 42.7942 27.7432 42.7942C25.0176 42.7942 22.8081 41.4906 22.8081 39.8824C22.8081 38.2743 25.0176 36.9707 27.7432 36.9707C30.4687 36.9707 32.6782 38.2743 32.6782 39.8824Z"
                  fill="#C1AD00"
                />
                <path
                  d="M22.8081 37.5531V39.8824H32.6782V37.5531H22.8081Z"
                  fill="#C1AD00"
                />
              </g>
              <ellipse
                id="Top"
                cx="27.7432"
                cy="37.941"
                rx="4.93506"
                ry="2.91175"
                fill="#FFF176"
              />
            </g>
            <g data-layer-name="Peg_2">
              <g data-layer-name="Base_2">
                <path
                  d="M41.563 45.7067C41.563 47.3148 39.3535 48.6184 36.6279 48.6184C33.9024 48.6184 31.6929 47.3148 31.6929 45.7067C31.6929 44.0986 33.9024 42.7949 36.6279 42.7949C39.3535 42.7949 41.563 44.0986 41.563 45.7067Z"
                  fill="#C1AD00"
                />
                <path
                  d="M31.6929 43.3773V45.7067H41.563V43.3773H31.6929Z"
                  fill="#C1AD00"
                />
              </g>
              <ellipse
                id="Top_2"
                cx="36.6279"
                cy="43.7658"
                rx="4.93506"
                ry="2.91175"
                fill="#FFF176"
              />
            </g>
            <g data-layer-name="Peg_3">
              <g data-layer-name="Base_3">
                <path
                  d="M22.3126 43.5226C22.3126 45.1307 20.1031 46.4343 17.3776 46.4343C14.652 46.4343 12.4425 45.1307 12.4425 43.5226C12.4425 41.9145 14.652 40.6108 17.3776 40.6108C20.1031 40.6108 22.3126 41.9145 22.3126 43.5226Z"
                  fill="#C1AD00"
                />
                <path
                  d="M12.4425 41.1932V43.5226H22.3126V41.1932H12.4425Z"
                  fill="#C1AD00"
                />
              </g>
              <ellipse
                id="Top_3"
                cx="17.3776"
                cy="41.5812"
                rx="4.93506"
                ry="2.91175"
                fill="#FFF176"
              />
            </g>
            <g data-layer-name="Peg_4">
              <g data-layer-name="Base_4">
                <path
                  d="M30.457 49.3478C30.457 50.9559 28.2475 52.2595 25.522 52.2595C22.7964 52.2595 20.5869 50.9559 20.5869 49.3478C20.5869 47.7397 22.7964 46.436 25.522 46.436C28.2475 46.436 30.457 47.7397 30.457 49.3478Z"
                  fill="#C1AD00"
                />
                <path
                  d="M20.5869 47.0184V49.3478H30.457V47.0184H20.5869Z"
                  fill="#C1AD00"
                />
              </g>
              <ellipse
                id="Top_4"
                cx="25.522"
                cy="47.4064"
                rx="4.93506"
                ry="2.91175"
                fill="#FFF176"
              />
            </g>
          </animated.g>

          <animated.g
            data-layer-name="aqua-brick"
            style={{
              transform: spring.ratio.interpolate(ratio =>
                getTranslateValue(ratio, 'aqua-brick')
              ),
            }}
          >
            <path
              data-layer-name="Vector 2_2"
              d="M8 29.2795V43.353L23.7922 55V40.9265L8 29.2795Z"
              fill="#009DBC"
            />
            <path
              data-layer-name="Vector 3_2"
              d="M23.7922 40.9265V55L46 47.1189V33.1619L23.7922 40.9265Z"
              fill="#00BADF"
            />
            <path
              data-layer-name="Vector 4_2"
              d="M29.7143 22L8 29.2794L23.7922 40.9264L46 33.1617L29.7143 22Z"
              fill="#1AD9FF"
            />
            <g data-layer-name="Peg_5">
              <g data-layer-name="Base_5">
                <path
                  d="M32.6782 25.8822C32.6782 27.4903 30.4687 28.794 27.7432 28.794C25.0176 28.794 22.8081 27.4903 22.8081 25.8822C22.8081 24.2741 25.0176 22.9705 27.7432 22.9705C30.4687 22.9705 32.6782 24.2741 32.6782 25.8822Z"
                  fill="#0093B0"
                />
                <path
                  d="M22.8081 23.5528V25.8822H32.6782V23.5528H22.8081Z"
                  fill="#0093B0"
                />
              </g>
              <ellipse
                id="Top_5"
                cx="27.7432"
                cy="23.9413"
                rx="4.93506"
                ry="2.91175"
                fill="#5AE4FF"
              />
            </g>
            <g data-layer-name="Peg_6">
              <g data-layer-name="Base_6">
                <path
                  d="M41.563 31.7069C41.563 33.315 39.3535 34.6187 36.6279 34.6187C33.9024 34.6187 31.6929 33.315 31.6929 31.7069C31.6929 30.0988 33.9024 28.7952 36.6279 28.7952C39.3535 28.7952 41.563 30.0988 41.563 31.7069Z"
                  fill="#0093B0"
                />
                <path
                  d="M31.6929 29.3775V31.7069H41.563V29.3775H31.6929Z"
                  fill="#0093B0"
                />
              </g>
              <ellipse
                id="Top_6"
                cx="36.6279"
                cy="29.7658"
                rx="4.93506"
                ry="2.91175"
                fill="#5AE4FF"
              />
            </g>
            <g data-layer-name="Peg_7">
              <g data-layer-name="Base_7">
                <path
                  d="M22.3126 29.5226C22.3126 31.1307 20.1031 32.4343 17.3776 32.4343C14.652 32.4343 12.4425 31.1307 12.4425 29.5226C12.4425 27.9145 14.652 26.6108 17.3776 26.6108C20.1031 26.6108 22.3126 27.9145 22.3126 29.5226Z"
                  fill="#0093B0"
                />
                <path
                  d="M12.4425 27.1932V29.5226H22.3126V27.1932H12.4425Z"
                  fill="#0093B0"
                />
              </g>
              <ellipse
                id="Top_7"
                cx="17.3776"
                cy="27.5814"
                rx="4.93506"
                ry="2.91175"
                fill="#5AE4FF"
              />
            </g>
            <g data-layer-name="Peg_8">
              <g data-layer-name="Base_8">
                <path
                  d="M30.457 35.3475C30.457 36.9556 28.2475 38.2593 25.522 38.2593C22.7964 38.2593 20.5869 36.9556 20.5869 35.3475C20.5869 33.7394 22.7964 32.4358 25.522 32.4358C28.2475 32.4358 30.457 33.7394 30.457 35.3475Z"
                  fill="#0093B0"
                />
                <path
                  d="M20.5869 33.0181V35.3475H30.457V33.0181H20.5869Z"
                  fill="#0093B0"
                />
              </g>
              <ellipse
                id="Top_8"
                cx="25.522"
                cy="33.4064"
                rx="4.93506"
                ry="2.91175"
                fill="#5AE4FF"
              />
            </g>
          </animated.g>

          <animated.g
            data-layer-name="red-brick"
            style={{
              transform: spring.ratio.interpolate(ratio =>
                getTranslateValue(ratio, 'red-brick')
              ),
            }}
          >
            <path
              data-layer-name="Vector 2_3"
              d="M8 15.2795V29.353L23.7922 41V26.9265L8 15.2795Z"
              fill="#B90F00"
            />
            <path
              data-layer-name="Vector 3_3"
              d="M23.7922 26.9265V41L46 33.1189V19.1619L23.7922 26.9265Z"
              fill="#D81200"
            />
            <path
              data-layer-name="Vector 4_3"
              d="M29.7143 8.00024L8.00012 15.2796L23.7923 26.9266L46 19.1619L29.7143 8.00024Z"
              fill="#FF2D1A"
            />
            <g data-layer-name="Peg_9">
              <g data-layer-name="Base_9">
                <path
                  d="M32.6782 11.8824C32.6782 13.4906 30.4687 14.7942 27.7432 14.7942C25.0176 14.7942 22.8081 13.4906 22.8081 11.8824C22.8081 10.2743 25.0176 8.9707 27.7432 8.9707C30.4687 8.9707 32.6782 10.2743 32.6782 11.8824Z"
                  fill="#C40000"
                />
                <path
                  d="M22.8081 9.55305V11.8824H32.6782V9.55305H22.8081Z"
                  fill="#C40000"
                />
              </g>
              <ellipse
                id="Top_9"
                cx="27.7432"
                cy="9.94104"
                rx="4.93505"
                ry="2.91175"
                fill="#FF5538"
              />
            </g>
            <g data-layer-name="Peg_10">
              <g data-layer-name="Base_10">
                <path
                  d="M22.3126 15.5226C22.3126 17.1307 20.1031 18.4343 17.3776 18.4343C14.652 18.4343 12.4425 17.1307 12.4425 15.5226C12.4425 13.9145 14.652 12.6108 17.3776 12.6108C20.1031 12.6108 22.3126 13.9145 22.3126 15.5226Z"
                  fill="#C40000"
                />
                <path
                  d="M12.4425 13.1932V15.5226H22.3126V13.1932H12.4425Z"
                  fill="#C40000"
                />
              </g>
              <ellipse
                id="Top_10"
                cx="17.3776"
                cy="13.5812"
                rx="4.93505"
                ry="2.91175"
                fill="#FF5538"
              />
            </g>
            <g data-layer-name="Peg_11">
              <g data-layer-name="Base_11">
                <path
                  d="M41.563 17.7067C41.563 19.3148 39.3535 20.6184 36.6279 20.6184C33.9024 20.6184 31.6929 19.3148 31.6929 17.7067C31.6929 16.0986 33.9024 14.7949 36.6279 14.7949C39.3535 14.7949 41.563 16.0986 41.563 17.7067Z"
                  fill="#C40000"
                />
                <path
                  d="M31.6929 15.3773V17.7067H41.563V15.3773H31.6929Z"
                  fill="#C40000"
                />
              </g>
              <ellipse
                id="Top_11"
                cx="36.6279"
                cy="15.7657"
                rx="4.93505"
                ry="2.91175"
                fill="#FF5538"
              />
            </g>
            <g data-layer-name="Peg_12">
              <g data-layer-name="Base_12">
                <path
                  d="M30.7012 21.588C30.7012 23.1961 28.4917 24.4998 25.7661 24.4998C23.0406 24.4998 20.8311 23.1961 20.8311 21.588C20.8311 19.9799 23.0406 18.6763 25.7661 18.6763C28.4917 18.6763 30.7012 19.9799 30.7012 21.588Z"
                  fill="#C40000"
                />
                <path
                  d="M20.8311 19.2586V21.588H30.7012V19.2586H20.8311Z"
                  fill="#C40000"
                />
              </g>
              <ellipse
                id="Top_12"
                cx="25.7661"
                cy="19.6471"
                rx="4.93505"
                ry="2.91175"
                fill="#FF5538"
              />
            </g>
          </animated.g>
        </g>
      </Svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LegoBrickVisualization;
