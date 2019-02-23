import React from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';

import { random } from '../../utils';

import Svg from '../Svg';

const Star = ({ height }) => (
  <svg fill="none" height={height} viewBox="0 0 69 8">
    <rect fill="url(#star-filter)" width="69" height="8" rx="4" />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="star-filter"
        x1="3"
        x2="69"
        y1="4"
        y2="4"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const Starfield = ({
  width = 200,
  height = 200,
  starSize = 12,
  angle = -30,
  speed = 12,
}) => {
  const [stars, setStars] = React.useState([]);
  const nextStarAt = React.useRef(Date.now() + 2000);

  React.useEffect(
    () => {
      const angleInRads = (angle * Math.PI) / 180;

      const animationFrameId = window.requestAnimationFrame(() => {
        // Advance any stars currently in the field
        let nextStars = stars.map((star, index) => {
          const displacementX = Math.cos(angleInRads) * star.speed;
          const displacementY = Math.sin(angleInRads) * star.speed;

          return {
            ...star,
            x: star.x - displacementX,
            y: star.y - displacementY,
          };
        });

        nextStars = nextStars.filter(star => star.y < height + starSize * 5);

        if (Date.now() > nextStarAt.current) {
          const scale = random(75, 125) / 100;
          nextStars.push({
            id: uuid(),
            x: width,
            y: random(-height / 2, height / 2),
            size: starSize * scale,
            speed: speed * scale,
          });

          nextStarAt.current = Date.now() + random(1000, 2500);
        }

        setStars(nextStars);
      });

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    },
    [stars]
  );

  return (
    <Wrapper style={{ width, height }}>
      {stars.map(star => (
        <StarWrapper
          key={star.id}
          style={{
            transform: `
              translate(${star.x}px, ${star.y}px)
              rotate(${angle}deg)`,
          }}
        >
          <Star height={star.size} />
        </StarWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const StarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center center;
  will-change: transform;
`;

export default Starfield;
