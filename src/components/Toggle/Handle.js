// @flow
import React from 'react';
import styled from 'styled-components';

const Handle = ({ size }) => (
  <svg height={size} viewBox="0 0 26 26" fill="none">
    <circle cx="14" cy="14" r="10" fill="#000000" fillOpacity={0.3} />
    <circle cx="13" cy="13" r="10" fill="url(#handle-bg-gradient)" />
    <circle
      cx="12.7272"
      cy="11.9802"
      r="7.5"
      fill="url(#toggle-handle-highlight)"
      fillOpacity="0.5"
    />
    <ellipse
      cx="13"
      cy="13"
      rx="10.5"
      ry="9.5"
      transform="rotate(-60 13 13)"
      fill="url(#toggle-handle-lowlight)"
      fillOpacity="0.5"
      style={{ mixBlendMode: 'hard-light' }}
    />
    <defs>
      <radialGradient
        id="handle-bg-gradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(13.2272 13.4802) rotate(90) scale(10)"
      >
        <stop stopColor="#FF27FF" />
        <stop offset="1" stopColor="#F218BC" />
      </radialGradient>
      <linearGradient
        id="toggle-handle-highlight"
        x1="7.37009"
        y1="2.74946"
        x2="14.5436"
        y2="14.4064"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.684545" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="toggle-handle-lowlight"
        x1="9.3527"
        y1="33.6029"
        x2="15.643"
        y2="16.8506"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default Handle;
