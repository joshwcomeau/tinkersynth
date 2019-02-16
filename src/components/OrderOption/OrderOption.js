// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS, BREAKPOINTS } from '../../constants';

import ToggleButton from '../ToggleButton';
import Spacer from '../Spacer';
import StorefrontRow from '../StorefrontRow';
import UnstyledButton from '../UnstyledButton';
import RadioButton from '../RadioButton/RadioButton';

type Option = {
  label: string,
  id: string,
};

type Props = {
  label: string,
  options: Array<Option>,
  selectedId: string,
  handleChange: (id: string) => void,
};

const OrderOption = ({ label, options, selectedId, handleChange }: Props) => {
  const lastOptionId = options[options.length - 1].id;

  return (
    <StorefrontRow title={label}>
      <Options>
        {options.map(({ label, id }, index) => (
          <React.Fragment key={id}>
            <OptionWrapper>
              <RadioButton />
              <Spacer size={UNIT} />
              {label}
            </OptionWrapper>

            {id !== lastOptionId && <Spacer size={UNIT * 4} />}
          </React.Fragment>
        ))}
      </Options>
    </StorefrontRow>
  );
};

const Options = styled.div`
  display: flex;
`;

const OptionWrapper = styled(UnstyledButton)`
  display: flex;
  align-items: center;
`;

const Comment = styled.div`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  color: ${COLORS.gray[700]};
  line-height: 1.4;
`;

export default OrderOption;
