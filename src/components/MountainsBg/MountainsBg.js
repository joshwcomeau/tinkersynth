import React from 'react';

import useWindowDimensions from '../../hooks/window-dimensions.hook';

const MountainsBg = () => {
  const windowDimensions = useWindowDimensions();

  return (
    <svg
      viewBox="0 0 1305 953"
      fill="none"
      style={{
        width: '100%',
        height: windowDimensions.width > 700 ? 700 : '100%',
      }}
      preserveAspectRatio={
        windowDimensions.width > 700 ? 'none' : 'xMaxYMin meet'
      }
    >
      <mask
        id="mountains-mask"
        maskUnits="userSpaceOnUse"
        x="-1"
        y="0"
        width="1306"
        height="953"
      >
        <rect width="1305" height="953" fill="#FFF" />
      </mask>

      <g mask="url(#mountains-mask)">
        <rect width="1305" height="835.138" fill="#F5FBFF" />
        <path
          d="M108.5 55.5636C34.2881 32.404 -11.5002 310.651 -11.5002 310.651L-18.0002 2312.62H1362.5V335.907C1362.5 335.907 1249.02 137.776 1164.5 149.853C1092.78 160.102 1076.45 356.299 1005.5 335.907C929.582 314.089 959.153 110.297 885.5 72.4011C796.205 26.4577 761.643 314.354 674 260.139C618.975 226.101 631.922 64.2899 573.5 72.4011C507.839 81.5171 562.414 267.607 510.5 335.907C417.53 458.22 319.361 -30.1691 238.5 114.495C212.822 160.434 230.815 232.972 197 260.139C144.02 302.702 166.218 73.5762 108.5 55.5636Z"
          fill="#CED8DE"
          filter="url(#mountains0_f)"
        />
        <path
          d="M52.9998 399.048C19.2453 387.499 -17.5002 309.809 -17.5002 309.809V2334.51H1371.5V432.723C1371.5 432.723 1317.61 19.5191 1210.5 50.5123C1146.34 69.076 1152.58 237.374 1087.5 239.934C1035.8 241.967 1024.12 141.051 973 127.965C897.478 108.633 857.767 334.745 794.5 262.664C748.625 210.399 788 185.212 728 116.178C668 47.1449 733.099 267.589 672 293.814C622.175 315.199 624.333 224.78 588 185.212C551.666 145.644 522.7 271.087 475.5 262.664C406.755 250.398 430.027 41.6961 361 35.3586C292.04 29.0273 299.758 266.341 232.5 239.934C203.226 228.44 198.377 177.41 169 166.691C100.194 141.585 121.993 422.653 52.9998 399.048Z"
          fill="#ABBAC4"
          filter="url(#mountains1_f)"
        />
        <path
          d="M159 313.727C79.2476 331.468 -34.0002 192.497 -34.0002 192.497L-11.5002 2202.05H1373V478.734C1373 478.734 1284.77 364.827 1221 313.727C1151.52 258.053 1109.91 218.28 1033 214.386C925.476 208.942 871.998 455.177 775 376.867C699.414 315.845 724 11.4946 667 64.5326C610 117.571 515.327 310.701 428.5 327.197C367.937 338.703 355.434 194.562 294.5 192.497C234.589 190.467 218.406 300.512 159 313.727Z"
          fill="#879CAB"
          filter="url(#mountains2_f)"
        />
        <path
          d="M35.9998 239.934C-35.0032 304.737 -3.50024 581.734 -3.50024 581.734L-23.5002 2305.89H1388.5V498.389C1388.5 498.389 1354.4 209.868 1278.5 225.622C1217.68 238.246 1244.27 436.872 1183 435.248C1136.2 434.008 1136.3 307.836 1089.5 308.967C1018.56 310.681 1103.85 539.862 1044.5 605.307C959.288 699.271 949.297 258.206 852 308.967C795.102 338.652 805.408 466.164 749 498.389C669.77 543.65 629.41 295.364 553 352.745C491.596 398.856 531.368 565.177 468.5 605.307C372.054 666.868 429.962 176.676 331 225.622C273.79 253.917 289.612 389.504 233.5 423.462C150.597 473.634 113.449 169.247 35.9998 239.934Z"
          fill="#6A7D8A"
          filter="url(#mountains3_f)"
        />
        <path
          d="M144 252.562C50.9083 227.939 -8.50024 567.422 -8.50024 567.422V2305.05H1314.5V649.084C1314.5 649.084 1194.73 410.976 1090.5 404.099C1017.57 399.287 985.953 519.952 913.5 505.124C822.666 486.534 822.536 217.031 733.5 252.562C644.681 288.006 730.697 606.374 639.5 612.883C552.927 619.063 596.327 355.658 515.5 303.074C413.167 236.499 363.201 574.387 261.5 505.124C192.518 458.144 217.51 272.006 144 252.562Z"
          fill="#434E56"
          filter="url(#mountains4_f)"
        />
        <path
          d="M293 413.36C163.404 389.028 -8.50024 654.978 -8.50024 654.978V2363.14H1376V262.665C1376 262.665 1211.24 695.276 1074.5 619.619C976.405 565.345 1054 241.619 916.5 262.665C779 283.711 670.884 643.17 492.5 585.102C406.589 557.136 379.963 429.687 293 413.36Z"
          fill="#1C1E21"
        />
      </g>
      <defs>
        <filter
          id="mountains0_f"
          x="-48"
          y="24.194"
          width="1440.5"
          height="2318.43"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="15" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="mountains1_f"
          x="-37.5"
          y="15.234"
          width="1429"
          height="2339.28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="mountains2_f"
          x="-46"
          y="46.358"
          width="1431"
          height="2167.69"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="mountains3_f"
          x="-31.5"
          y="214.179"
          width="1428"
          height="2099.71"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="mountains4_f"
          x="-12.5"
          y="245.338"
          width="1331"
          height="2063.71"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
};

export default MountainsBg;
