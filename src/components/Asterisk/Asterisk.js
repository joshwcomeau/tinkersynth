// @flow
import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import UnstyledButton from '../UnstyledButton';

type Props = {
  tooltip: string,
};

const Asterisk = ({ tooltip }: Props) => {
  return (
    <Wrapper>
      <AsteriskGlyph>*</AsteriskGlyph>
      <Tooltip
        interactiveBorder={10}
        animation="fade"
        duration={200}
        tabIndex={0}
        animateFill={false}
        followCursor={true}
        arrow={true}
        html={tooltip}
        style={{
          lineHeight: 1.4,
        }}
      >
        <TouchArea />
      </Tooltip>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;

const AsteriskGlyph = styled.span`
  position: relative;
  font-size: inherit;
  font-weight: 900;
  color: ${COLORS.pink[500]};
`;

const TouchArea = styled.span`
  position: absolute;
  display: block;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: 5px;
`;

export default Asterisk;
