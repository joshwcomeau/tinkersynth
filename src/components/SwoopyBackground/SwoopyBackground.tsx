import React from 'react';

const SwoopyBackground = ({ width, height }) => {
  return (
    <svg
      viewBox="0 0 1305 225"
      fill="none"
      preserveAspectRatio="none"
      style={{ width, height, display: 'block' }}
    >
      <mask
        id="swoop-bg-mask"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1305"
        height="225"
      >
        <rect width="1305" height="225" fill="#C4C4C4" />
      </mask>
      <g mask="url(#swoop-bg-mask)">
        <path
          d="M1215.46 225.462C1324.07 226.114 1312 143.624 1312 143.624L1312 -14L-7.49973 -14L-7.49974 93C99.229 68.8948 95.249 177.68 206.822 188.928C356.668 204.033 426.881 70.9419 571.27 101.244C664.119 120.729 662.837 200.999 759.624 208.656C850.678 215.86 880.797 144.685 972.497 143.624C1079.15 142.391 1108.79 224.822 1215.46 225.462Z"
          fill="url(#swoop-bg-gradient)"
          fillOpacity="0.05"
        />
      </g>
      <defs>
        <linearGradient
          id="swoop-bg-gradient"
          x1="640.5"
          y1="206.5"
          x2="652"
          y2="44.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SwoopyBackground;
