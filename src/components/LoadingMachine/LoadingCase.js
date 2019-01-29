import React from 'react';

const LoadingCase = () => (
  <svg
    width="145"
    height="177"
    viewBox="0 0 145 177"
    fill="none"
    // For some reason, this SVG leaves 2px worth of padding below.
    // Undo this.
    style={{ transform: 'translateY(2px)' }}
  >
    <mask
      id="loading-case-mask"
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
    <g mask="url(#loading-case-mask)">
      <path d="M16 1L0 17H128L144 1H16Z" fill="#ABABAB" />
      <path d="M144 1L128 17V177L144 161V1Z" fill="#959595" />
      <rect y="17" width="128" height="160" fill="#C4C4C4" />
    </g>
  </svg>
);

export default LoadingCase;
