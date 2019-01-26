// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS, BREAKPOINTS } from '../../constants';

import ToggleButton from '../ToggleButton';
import Spacer from '../Spacer';

type Option = {
  label: string,
  id: string,
};

type Props = {
  label: string,
  options: Array<Option>,
  comment?: React$Node,
  selectedId: string,
  handleChange: (id: string) => void,
};

const OrderOption = ({
  label,
  options,
  comment,
  selectedId,
  handleChange,
}: Props) => {
  const lastOptionId = options[options.length - 1].id;
  return (
    <Wrapper>
      <LabelCell>{label}</LabelCell>
      <OptionsCell>
        <Options>
          {options.map(({ label, id }, index) => (
            <React.Fragment key={id}>
              <ToggleButton
                id={id}
                isToggled={selectedId === id}
                onClick={() => handleChange(id)}
              >
                {label}
              </ToggleButton>

              {id !== lastOptionId && <Spacer size={UNIT * 4} />}
            </React.Fragment>
          ))}
        </Options>

        {comment && (
          <>
            <Spacer size={UNIT * 4} />
            <Comment>{comment}</Comment>
          </>
        )}
      </OptionsCell>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
  }
`;

const LabelCell = styled.div`
  width: 270px;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;

  @media ${BREAKPOINTS.sm} {
    width: 100%;
  }
`;

const OptionsCell = styled.div`
  flex: 1;
`;

const Options = styled.div`
  display: flex;
`;

const Comment = styled.div`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  color: ${COLORS.gray[700]};
  line-height: 1.4;
`;

export default OrderOption;
