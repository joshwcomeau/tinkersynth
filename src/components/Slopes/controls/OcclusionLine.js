// @flow
import React from 'react';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';

const PATHS = [
  null,
  'M0 14.5145C8.3771 14.5145 10.8729 4.51455 19.25 4.51455C27.6271 4.51455 30.1229 14.5145 38.5 14.5145C46.8771 14.5145 48.25 6.01469 58 2.51462C67.75 -0.985453 73.5 14.5145 77 14.5145C80.5 14.5145 84.6229 6.01462 93 6.01462C101.377 6.01462 107.123 14.5145 115.5 14.5145C123.877 14.5145 130.5 1 135 1C139.5 1 145.623 14.5145 154 14.5145C162.377 14.5145 164.873 4.51455 173.25 4.51455C181.627 4.51455 184.123 14.5145 192.5 14.5145',
  'M155 11C146.569 11 148.837 3.31099 140.406 3.31099C131.974 3.31099 124.681 11 116.25 11C107.818 11 107.695 6.75977 100.146 3.31099C92.5974 -0.137794 89.9575 11 81.526 11C73.0945 11 73.9773 5.22211 63.9123 1.77333C53.8474 -1.67546 41.7695 7.52879 38.2468 7.52879C34.724 7.52879 31.7045 3.31106 19.6266 1.77333C7.5487 0.235592 8.43149 11 0 11 M155 11C163.431 11 162.549 0.235544 174.627 1.77328C186.705 3.31101 189.724 7.52874 193.247 7.52874',
];

type Props = {
  color: string,
  height: number,
  version: 1 | 2,
  isOccluded?: boolean,
  offset: number,
  duration?: number,
};

const VIEWBOX_WIDTH = 193;
const VIEWBOX_HEIGHT = 16;

const OcclusionLine = ({
  color,
  height,
  version,
  isOccluded,
  offset,
  duration = 250,
}: Props) => {
  const path = PATHS[version];

  const springProps = useSpring({
    offset,
    occludeOpacity: isOccluded ? 1 : 0,
    config: { tension: 180, friction: 18 },
  });

  return (
    <animated.svg
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      style={{
        transform: springProps.offset.interpolate(o => `translateX(${o}px)`),
      }}
    >
      <animated.path
        d={path}
        fill={COLORS.gray[1000]}
        style={{
          opacity: springProps.occludeOpacity,
        }}
      />

      <path d={path} stroke={color} strokeWidth={1.5} />
    </animated.svg>
  );
};

OcclusionLine.viewboxWidth = VIEWBOX_WIDTH;
OcclusionLine.viewboxHeight = VIEWBOX_HEIGHT;

export default OcclusionLine;
