import React from 'react';

const LoadingEarth = () => {
  return (
    <svg width="30" height="52" viewBox="0 0 30 52" fill="none">
      <rect width="30" height="52" rx="4" fill="#2B2B2B" />
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
        <path d="M8.03333 17.0001L4 12.0501V9.30015L6.30476 8.20015H9.7619L10.9143 10.9501L13.219 10.4001L14.3714 13.1501L12.0667 13.7001L10.3381 16.4501L13.7952 17.5501L16.1 19.7501L13.7952 22.5001L10.9143 24.7001L12.0667 20.8501L10.3381 18.1001L8.03333 17.0001Z" />
        <path d="M19.7038 18.1001L20.5 15.9001L22.7 14.8001L24.9 15.3501H27.1L28.75 18.6501L29.85 21.9501L27.65 24.7001L24.9 24.1501L23.25 19.7501L21.6 20.3001L19.7038 18.1001Z" />
        <path d="M20.5 13.1501L21.6 10.9501L20.5 7.65015L23.25 8.20015L30.4 10.4001L26 13.7001L23.8 12.6001L20.5 13.1501Z" />
      </g>
      <path
        d="M0 34H30V48C30 50.2091 28.2091 52 26 52H4C1.79086 52 0 50.2091 0 48V34Z"
        fill="#575656"
      />
      <circle cx="6" cy="40" r="2" fill="#1AD9FF" />
      <circle cx="6" cy="46" r="2" fill="#1AD9FF" />
      <circle cx="12" cy="40" r="2" fill="#1AD9FF" />
      <circle cx="12" cy="46" r="2" fill="#1AD9FF" />
      <circle cx="18" cy="40" r="2" fill="#32FF98" />
      <circle cx="18" cy="46" r="2" fill="#32FF98" />
      <circle cx="24" cy="40" r="2" fill="#FFEB33" />
      <circle cx="24" cy="46" r="2" fill="#FFEB33" />
    </svg>
  );
};

export default LoadingEarth;
