import React from 'react';
import styled from 'styled-components';

import useToggle from '../../hooks/toggle.hook';
import { random, range, sample, normalize } from '../../utils';

import PolarAmountVisualization from '../Slopes/controls/PolarAmountVisualization';

const useAnimatedPolarity = () => {
  const [isPolar, setIsPolar] = React.useState(true);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setIsPolar(isPolar => !isPolar);

      timeoutId = window.setTimeout(update, random(1000, 3200));
    };

    update();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return isPolar;
};

const LoadingPolar = ({ width = 36, height = 38, padding = 4 }) => {
  const [hasBegun, toggleBegun] = useToggle(false);

  const isPolar = useAnimatedPolarity();

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      toggleBegun();
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Wrapper style={{ padding }}>
      <Visualization
        style={{
          opacity: hasBegun ? 1 : 0,
          transition: 'opacity 350ms',
          // HACK HACK HACK
          // centering because with such low `numOfPointsPerLine`, it doesnt
          // appear centered by default
          transform: isPolar ? 'translateX(0)' : 'translateX(1px)',
        }}
      >
        <PolarAmountVisualization
          width={width - padding * 2}
          height={height - padding * 2}
          horizontalPadding={0}
          verticalPadding={0}
          numOfLines={3}
          value={isPolar ? 100 : 0}
          springConfig={{
            tension: 40,
            friction: 18,
          }}
        />
      </Visualization>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 4px;
  background: #2b2b2b;
`;

const Visualization = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default LoadingPolar;
