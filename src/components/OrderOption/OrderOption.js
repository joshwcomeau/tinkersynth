// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS, BREAKPOINTS } from '../../constants';

import ToggleButton from '../ToggleButton';
import Spacer from '../Spacer';
import StorefrontRow from '../StorefrontRow';

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
    <StorefrontRow title={label}>
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
    </StorefrontRow>
  );
};

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
