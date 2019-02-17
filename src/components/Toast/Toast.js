// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

import { UNIT, COLORS } from '../../constants';

import Spacer from '../Spacer';
import Button from '../Button';

import type { Toast } from '../../types';

type Props = {
  ...Toast,
  dismissToast: (toastId: string) => any,
};

class ToastComponent extends React.Component<Props> {
  dismissNode: ?HTMLElement;

  componentDidMount() {
    if (this.dismissNode) {
      this.dismissNode.focus();
    }
  }

  render() {
    const { id, title, message, dismissToast } = this.props;

    return (
      <OuterWrapper>
        <MainBox>
          <Title>{title}</Title>
          <Message>{[message]}</Message>

          <Spacer size={UNIT * 2} />

          <Actions>
            <Dismiss
              ref={node => (this.dismissNode = node)}
              style={{ color: COLORS.gray[700] }}
              onClick={() => dismissToast(id)}
            >
              Dismiss
            </Dismiss>
          </Actions>
        </MainBox>
      </OuterWrapper>
    );
  }
}

const OuterWrapper = styled.div`
  position: relative;
  width: 332px;
  max-width: 40vw;
  border: 2px solid ${COLORS.white};
  border-radius: 1px;
  box-shadow: 3px 3px 30px rgba(0, 0, 0, 0.2);
`;

const MainBox = styled.div`
  position: relative;
  z-index: 2;
  padding: ${UNIT * 2}px;
  background: ${COLORS.white};
  /* border-radius: 4px; */
  border: 2px solid ${COLORS.gray[900]};
  border-top-width: 4px;
  border-radius: 0px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: ${UNIT * 2}px;
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.35;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${UNIT * 2}px;
  border-top: 1px solid ${COLORS.gray[300]};
`;

const Dismiss = styled.button`
  all: unset;
  display: block;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;

  &:focus {
    outline: auto;
    outline-color: ${COLORS.pink[300]};
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

export default ToastComponent;
