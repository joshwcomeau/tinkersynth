// @flow
import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated, interpolated } from 'react-spring/hooks';

import { createSvgPathForCurve } from '../../helpers/line.helpers';
import { random } from '../../utils';

type Props = {
  width?: number,
};

const useBouncyMountains = () => {
  const left = 10;
  const top = 27;
  const width = 48;
  const height = 34;

  const mountainRef = useRef(null);

  const defaultCurve = {
    startPoint: [17, 54],
    controlPoint1: [33, 15],
    endPoint: [52, 54],
  };

  const [curve, setCurve] = useState(defaultCurve);

  useEffect(() => {
    let timeoutId;

    const update = () => {
      setCurve({
        startPoint: [random(15, 20), 54],
        controlPoint1: [random(15, 50), random(0, 50)],
        endPoint: [random(50, 54), 54],
      });

      timeoutId = window.setTimeout(update, random(250, 1500));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (mountainRef.current) {
    mountainRef.current.setAttribute('d', createSvgPathForCurve(curve));
  }

  const spring = useSpring({
    curveStartX: curve.startPoint[0],
    controlPointX: curve.controlPoint1[0],
    controlPointY: curve.controlPoint1[1],
    curveEndX: curve.endPoint[0],
  });

  return [mountainRef, spring];
};

const LoadingMachine = ({ width = 145 }: Props) => {
  const [mountainRef] = useBouncyMountains();

  return (
    <svg width={width} viewBox="0 0 145 177" fill="none">
      <g id="Case">
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="145"
          height="177"
        >
          <path
            d="M12 4.99999L4 13L0 17V21V171V177H6H122H128L132 173L140 165C140 165 142.13 162.531 143 160.5C143.923 158.346 144 155 144 155V6.99999C144 6.99999 144.28 3.27999 143 2C141.72 0.72001 138 0.999992 138 0.999992H22C22 0.999992 18.1537 1.07698 16 1.99999C13.9695 2.87021 12 4.99999 12 4.99999Z"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask0)">
          <path d="M16 1L0 17H128L144 1H16Z" fill="#ABABAB" />
          <path d="M144 1L128 17V177L144 161V1Z" fill="#959595" />
          <rect id="Rectangle" y="17" width="128" height="160" fill="#C4C4C4" />
        </g>
      </g>

      <g id="Slopes">
        <rect
          id="Rectangle 2"
          x="10"
          y="27"
          width="48"
          height="34"
          rx="4"
          fill="#2B2B2B"
        />
        <path
          ref={mountainRef}
          id="mountain-1"
          d={`
            M 17 54
            Q 33 15
              52 54
          `}
          stroke="#32FF98"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transition: '1500ms cubic-bezier(0.08, 1, 0.2, 1)',
          }}
        />
      </g>
      <g id="Bezier">
        <rect
          id="Rectangle 2.1"
          x="10"
          y="69"
          width="64"
          height="38"
          rx="4"
          fill="#2B2B2B"
        />
        <path
          id="Vector 3"
          d="M19 96C19 96 44.9936 105.362 56 96C62.6517 90.3423 66 76 66 76"
          stroke="#FF27FF"
          strokeWidth="4"
        />
      </g>
      <g id="Polar viz">
        <rect
          id="Rectangle 2.2"
          x="82"
          y="69"
          width="36"
          height="38"
          rx="4"
          fill="#2B2B2B"
        />
        <line
          id="Line"
          x1="88"
          y1="76"
          x2="112"
          y2="76"
          stroke="#1AD9FF"
          strokeWidth="2"
        />
        <line
          id="Line_2"
          x1="88"
          y1="82"
          x2="112"
          y2="82"
          stroke="#32FF98"
          strokeWidth="2"
        />
        <line
          id="Line_3"
          x1="88"
          y1="88"
          x2="112"
          y2="88"
          stroke="#FFEB33"
          strokeWidth="2"
        />
        <line
          id="Line_4"
          x1="88"
          y1="94"
          x2="112"
          y2="94"
          stroke="#FF791A"
          strokeWidth="2"
        />
        <line
          id="Line_5"
          x1="88"
          y1="100"
          x2="112"
          y2="100"
          stroke="#FF2D1A"
          strokeWidth="2"
        />
      </g>
      <g id="Touch slider">
        <rect
          id="Rectangle 2.1_2"
          x="66"
          y="27"
          width="52"
          height="16"
          rx="4"
          fill="#2B2B2B"
        />
        <g id="Group 2">
          <ellipse id="Ellipse" cx="71" cy="32" rx="2" ry="2" fill="#1AD9FF" />
          <ellipse
            id="Ellipse_2"
            cx="71"
            cy="38"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
        </g>
        <g id="Group 2_2">
          <ellipse
            id="Ellipse_3"
            cx="77"
            cy="32"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
          <ellipse
            id="Ellipse_4"
            cx="77"
            cy="38"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
        </g>
        <g id="Group 2.1">
          <ellipse
            id="Ellipse_5"
            cx="83"
            cy="32"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
          <ellipse
            id="Ellipse_6"
            cx="83"
            cy="38"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
        </g>
        <g id="Group 2_3">
          <ellipse
            id="Ellipse_7"
            cx="89"
            cy="32"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
          <ellipse
            id="Ellipse_8"
            cx="89"
            cy="38"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
        </g>
        <g id="Group 2_4">
          <ellipse
            id="Ellipse_9"
            cx="95"
            cy="32"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
          <ellipse
            id="Ellipse_10"
            cx="95"
            cy="38"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
        </g>
        <g id="Group 2.2">
          <ellipse
            id="Ellipse_11"
            cx="101"
            cy="32"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
          <ellipse
            id="Ellipse_12"
            cx="101"
            cy="38"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
        </g>
        <g id="Group">
          <ellipse
            id="Ellipse_13"
            cx="107"
            cy="32"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
          <ellipse
            id="Ellipse_14"
            cx="107"
            cy="38"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
        </g>
        <g id="Group_2">
          <ellipse
            id="Ellipse_15"
            cx="113"
            cy="32"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
          <ellipse
            id="Ellipse_16"
            cx="113"
            cy="38"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
        </g>
      </g>
      <g id="Touch slider_2">
        <rect
          id="Rectangle 2.1_3"
          x="66"
          y="45"
          width="52"
          height="16"
          rx="4"
          fill="#2B2B2B"
        />
        <g id="Group 2_5">
          <ellipse
            id="Ellipse_17"
            cx="71"
            cy="50"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
          <ellipse
            id="Ellipse_18"
            cx="71"
            cy="56"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
        </g>
        <g id="Group 2_6">
          <ellipse
            id="Ellipse_19"
            cx="77"
            cy="50"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
          <ellipse
            id="Ellipse_20"
            cx="77"
            cy="56"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
        </g>
        <g id="Group 2.1_2">
          <ellipse
            id="Ellipse_21"
            cx="83"
            cy="50"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
          <ellipse
            id="Ellipse_22"
            cx="83"
            cy="56"
            rx="2"
            ry="2"
            fill="#1AD9FF"
          />
        </g>
        <g id="Group 2_7">
          <ellipse
            id="Ellipse_23"
            cx="89"
            cy="50"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
          <ellipse
            id="Ellipse_24"
            cx="89"
            cy="56"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
        </g>
        <g id="Group 2_8">
          <ellipse
            id="Ellipse_25"
            cx="95"
            cy="50"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
          <ellipse
            id="Ellipse_26"
            cx="95"
            cy="56"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
        </g>
        <g id="Group 2.2_2">
          <ellipse
            id="Ellipse_27"
            cx="101"
            cy="50"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
          <ellipse
            id="Ellipse_28"
            cx="101"
            cy="56"
            rx="2"
            ry="2"
            fill="#32FF98"
          />
        </g>
        <g id="Group_3">
          <ellipse
            id="Ellipse_29"
            cx="107"
            cy="50"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
          <ellipse
            id="Ellipse_30"
            cx="107"
            cy="56"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
        </g>
        <g id="Group_4">
          <ellipse
            id="Ellipse_31"
            cx="113"
            cy="50"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
          <ellipse
            id="Ellipse_32"
            cx="113"
            cy="56"
            rx="2"
            ry="2"
            fill="#FFEB33"
          />
        </g>
      </g>
      <g id="Slider">
        <rect
          id="Rectangle 2.3"
          x="10"
          y="115"
          width="16"
          height="52"
          rx="4"
          fill="#2B2B2B"
        />
        <line
          id="Line 2"
          x1="14"
          y1="120"
          x2="22"
          y2="120"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.1"
          x1="14"
          y1="126"
          x2="22"
          y2="126"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.2"
          x1="14"
          y1="132"
          x2="22"
          y2="132"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.3"
          x1="14"
          y1="138"
          x2="22"
          y2="138"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.4"
          x1="14"
          y1="144"
          x2="22"
          y2="144"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.5"
          x1="14"
          y1="150"
          x2="22"
          y2="150"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.6"
          x1="14"
          y1="156"
          x2="22"
          y2="156"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.7"
          x1="14"
          y1="162"
          x2="22"
          y2="162"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <rect
          id="Rectangle 3"
          x="8"
          y="153"
          width="20"
          height="8"
          rx="4"
          fill="#FF27FF"
        />
      </g>
      <g id="Slider_2">
        <rect
          id="Rectangle 2.3_2"
          x="32"
          y="115"
          width="16"
          height="52"
          rx="4"
          fill="#2B2B2B"
        />
        <line
          id="Line 2_2"
          x1="36"
          y1="120"
          x2="44"
          y2="120"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.1_2"
          x1="36"
          y1="126"
          x2="44"
          y2="126"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.2_2"
          x1="36"
          y1="132"
          x2="44"
          y2="132"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.3_2"
          x1="36"
          y1="138"
          x2="44"
          y2="138"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.4_2"
          x1="36"
          y1="144"
          x2="44"
          y2="144"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.5_2"
          x1="36"
          y1="150"
          x2="44"
          y2="150"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.6_2"
          x1="36"
          y1="156"
          x2="44"
          y2="156"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <line
          id="Line 2.7_2"
          x1="36"
          y1="162"
          x2="44"
          y2="162"
          stroke="white"
          strokeOpacity="0.51"
          strokeWidth="2"
        />
        <rect
          id="Rectangle 3_2"
          x="30"
          y="129"
          width="20"
          height="8"
          rx="4"
          fill="#FF27FF"
        />
      </g>
      <g id="Earth control">
        <rect
          id="Rectangle 2.1_4"
          x="54"
          y="115"
          width="30"
          height="52"
          rx="4"
          fill="#2B2B2B"
        />
        <g id="Planet">
          <circle
            id="Ellipse 3"
            cx="69"
            cy="132"
            r="11"
            stroke="#1AD9FF"
            strokeWidth="2"
          />
          <mask
            id="mask1"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="60"
            y="123"
            width="18"
            height="18"
          >
            <circle id="Ellipse 3.1" cx="69" cy="132" r="8.8" fill="#C4C4C4" />
          </mask>
          <g mask="url(#mask1)">
            <g>
              <path
                d="M62.0333 132L58 127.05V124.3L60.3048 123.2H63.7619L64.9143 125.95L67.219 125.4L68.3714 128.15L66.0667 128.7L64.3381 131.45L67.7952 132.55L70.1 134.75L67.7952 137.5L64.9143 139.7L66.0667 135.85L64.3381 133.1L62.0333 132Z"
                stroke="#32FF98"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M73.7038 133.1L74.5 130.9L76.7 129.8L78.9 130.35H81.1L82.75 133.65L83.85 136.95L81.65 139.7L78.9 139.15L77.25 134.75L75.6 135.3L73.7038 133.1Z"
                stroke="#32FF98"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M74.5 128.15L75.6 125.95L74.5 122.65L77.25 123.2L84.4 125.4L80 128.7L77.8 127.6L74.5 128.15Z"
                stroke="#32FF98"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
        <g id="Touch slider_3">
          <path
            id="Rectangle 2.1_5"
            d="M54 149H84V163C84 165.209 82.2091 167 80 167H58C55.7909 167 54 165.209 54 163V149Z"
            fill="#575656"
          />
          <g id="Group 2_9">
            <circle id="Ellipse_33" cx="60" cy="155" r="2" fill="#1AD9FF" />
            <circle id="Ellipse_34" cx="60" cy="161" r="2" fill="#1AD9FF" />
          </g>
          <g id="Group 2_10">
            <circle id="Ellipse_35" cx="66" cy="155" r="2" fill="#1AD9FF" />
            <circle id="Ellipse_36" cx="66" cy="161" r="2" fill="#1AD9FF" />
          </g>
          <g id="Group 2_11">
            <circle id="Ellipse_37" cx="72" cy="155" r="2" fill="#32FF98" />
            <circle id="Ellipse_38" cx="72" cy="161" r="2" fill="#32FF98" />
          </g>
          <g id="Group_5">
            <circle id="Ellipse_39" cx="78" cy="155" r="2" fill="#FFEB33" />
            <circle id="Ellipse_40" cx="78" cy="161" r="2" fill="#FFEB33" />
          </g>
        </g>
      </g>
      <g id="Status">
        <rect
          id="Rectangle 2_2"
          x="90"
          y="137"
          width="28"
          height="28"
          rx="4"
          fill="#2B2B2B"
        />
        <circle id="Ellipse_41" cx="104" cy="146" r="4" fill="#32FF98" />
        <path
          id="OK"
          d="M103.768 156.52C103.768 157.59 103.471 158.469 102.877 159.156C102.283 159.84 101.523 160.182 100.598 160.182C99.6797 160.182 98.9219 159.838 98.3242 159.15C97.7305 158.463 97.4336 157.586 97.4336 156.52C97.4336 155.441 97.7285 154.562 98.3184 153.883C98.9082 153.199 99.668 152.857 100.598 152.857C101.523 152.857 102.283 153.201 102.877 153.889C103.471 154.576 103.768 155.453 103.768 156.52ZM100.598 159.35C101.254 159.35 101.77 159.1 102.145 158.6C102.523 158.096 102.713 157.402 102.713 156.52C102.713 155.637 102.523 154.945 102.145 154.445C101.77 153.941 101.254 153.689 100.598 153.689C99.9375 153.689 99.4199 153.939 99.0449 154.439C98.6738 154.936 98.4883 155.629 98.4883 156.52C98.4883 157.402 98.6758 158.096 99.0508 158.6C99.4297 159.1 99.9453 159.35 100.598 159.35ZM106.609 159.174H107.002C107.232 159.174 107.395 159.205 107.488 159.268C107.582 159.33 107.629 159.434 107.629 159.578C107.629 159.734 107.588 159.844 107.506 159.906C107.424 159.969 107.268 160 107.037 160H105.033C104.9 160 104.799 159.965 104.729 159.895C104.662 159.82 104.629 159.715 104.629 159.578C104.629 159.434 104.666 159.33 104.74 159.268C104.818 159.205 104.949 159.174 105.133 159.174H105.32H105.695V153.895H105.32C105.023 153.895 104.834 153.865 104.752 153.807C104.67 153.744 104.629 153.633 104.629 153.473C104.629 153.336 104.662 153.232 104.729 153.162C104.799 153.088 104.9 153.051 105.033 153.051H107.037C107.268 153.051 107.424 153.082 107.506 153.145C107.588 153.207 107.629 153.316 107.629 153.473C107.629 153.629 107.576 153.738 107.471 153.801C107.365 153.863 107.166 153.895 106.873 153.895H106.609V156.279L109.053 153.895H108.982H108.854C108.662 153.895 108.523 153.861 108.438 153.795C108.352 153.729 108.309 153.621 108.309 153.473C108.309 153.32 108.342 153.213 108.408 153.15C108.475 153.084 108.582 153.051 108.73 153.051H110.459C110.592 153.051 110.693 153.088 110.764 153.162C110.834 153.232 110.869 153.336 110.869 153.473C110.869 153.625 110.822 153.734 110.729 153.801C110.639 153.863 110.477 153.895 110.242 153.895H110.16L107.893 156.086C108.232 156.156 108.561 156.375 108.877 156.742C109.193 157.109 109.686 157.92 110.354 159.174H110.459C110.701 159.174 110.863 159.203 110.945 159.262C111.027 159.32 111.068 159.426 111.068 159.578C111.068 159.715 111.033 159.82 110.963 159.895C110.896 159.965 110.797 160 110.664 160H110.102C109.977 160 109.885 159.986 109.826 159.959C109.771 159.932 109.715 159.869 109.656 159.771C109.621 159.717 109.404 159.32 109.006 158.582L108.777 158.154C108.531 157.697 108.285 157.355 108.039 157.129C107.793 156.898 107.531 156.764 107.254 156.725L106.609 157.334V159.174Z"
          fill="white"
        />
      </g>
      <g id="Buttons">
        <rect
          id="Rectangle 2.1_6"
          x="90"
          y="115"
          width="28"
          height="16"
          rx="4"
          fill="#2B2B2B"
        />
        <circle id="Ellipse 2" cx="98" cy="123" r="4" fill="#D90000" />
        <circle id="Ellipse 2.1" cx="110" cy="123" r="4" fill="#D90000" />
      </g>
    </svg>
  );
};

export default LoadingMachine;
