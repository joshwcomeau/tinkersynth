// @flow
import React from 'react';
import styled from 'styled-components';

import Spacer from '../Spacer';
import { UNIT } from '../../constants';
import RadioButton from '../RadioButton/RadioButton';
import UnstyledButton from '../UnstyledButton';

type RadioListSelectProps = {
  name: string,
  selectedOptionId: ?string,
  handleSelect: (id: string) => void,
  children: Array<React$Node>,
};

const RadioListSelect = ({
  name,
  selectedOptionId,
  handleSelect,
  children,
}: RadioListSelectProps) => {
  const modifiedChildren = children.reduce((acc, child, index) => {
    const clonedChild = React.cloneElement(child, {
      key: index,
      name,
      isSelected: selectedOptionId === child.props.id,
      onClick: () => handleSelect(child.props.id),
    });

    acc.push(clonedChild);

    const isLastChild = children.length === index + 1;

    if (!isLastChild) {
      acc.push(<Spacer key={`spacer-${index}`} size={UNIT * 5} />);
    }

    return acc;
  }, []);

  return <Wrapper>{modifiedChildren}</Wrapper>;
};

type RadioListOptionProps = {
  id: string,
  name: string,
  onClick: () => void,
  isSelected: boolean,
  children: React$Node,
};

RadioListSelect.Option = ({
  id,
  name,
  onClick,
  isSelected,
  children,
}: RadioListOptionProps) => {
  return (
    <OptionWrapper onClick={onClick}>
      <RadioColumn>
        <RadioButton id={id} name={name} isChecked={isSelected} />
      </RadioColumn>

      <MainColumn>{children}</MainColumn>
    </OptionWrapper>
  );
};

const Wrapper = styled.div``;

const RADIO_COLUMN_WIDTH = 0;

const OptionWrapper = styled(UnstyledButton)`
  display: flex;
  margin-left: -${RADIO_COLUMN_WIDTH}px;
`;

const RadioColumn = styled.div`
  width: 30px;
  padding-top: 1px;
`;

const MainColumn = styled.div`
  flex: 1;
`;

export default RadioListSelect;
