// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { x } from 'react-icons-kit/feather/x';

import * as actions from '../../actions';
import { COLORS, Z_INDICES } from '../../constants';

import MaxWidthWrapper from '../MaxWidthWrapper';
import UnstyledButton from '../UnstyledButton';
import ScrollDisabler from '../ScrollDisabler';

type Props = {
  children: React$Node,
  side: 'bottom', // Only 'bottom' currently supported.
  isVisible: boolean,
};

const Shelf = ({ children, handleToggle, isVisible, restoreFocus }: Props) => {
  React.useEffect(
    () => {
      const handleKeypress = event => {
        if (event.key === 'Escape') {
          handleToggle();
        }
      };

      if (isVisible) {
        window.addEventListener('keydown', handleKeypress);
      } else {
        window.removeEventListener('keydown', handleKeypress);
      }

      return () => {
        window.removeEventListener('keydown', handleKeypress);
      };
    },
    [isVisible]
  );

  return (
    <>
      <Backdrop
        onClick={handleToggle}
        style={{
          opacity: isVisible ? 0.75 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      />
      <Wrapper
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <MaxWidthWrapper>
          <IconWrapper
            onClick={() => {
              handleToggle();

              if (isVisible) {
                restoreFocus();
              }
            }}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <Icon icon={x} size={21} />
          </IconWrapper>
          <Contents
            style={{
              opacity: isVisible ? 1 : 0,
              transition: isVisible ? 'opacity 300ms 300ms' : 'opacity 500ms',
            }}
          >
            {children}
          </Contents>
        </MaxWidthWrapper>
      </Wrapper>

      {isVisible && <ScrollDisabler />}
    </>
  );
};

const Backdrop = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.modal - 1};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #222;
  transition: opacity 500ms cubic-bezier(0, 0.99, 0.55, 1.03);
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.modal};
  /* NOTE: Hardcoding sizes, since only one side (bottom) is supported */
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.white};
  transition: transform 350ms cubic-bezier(0, 0.99, 0.55, 1.03);
  will-change: transform;
`;

const IconWrapper = styled(UnstyledButton)`
  position: absolute;
  top: 0;
  right: 16px;
  transform: translateY(-50%);
  padding: 16px;
  background: #fff;
  border-radius: 50%;
`;

const Contents = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export default connect(
  null,
  { restoreFocus: actions.restoreFocus }
)(Shelf);
