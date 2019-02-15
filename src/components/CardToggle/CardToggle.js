// @flow
/**
 * NOTE: This component is pretty magical.
 * I'm doing it this way not because I think it's the best design, but to deepen
 * my understanding of magical APIs and why they might not be a great idea.
 *
 * Specifically, this card opaquely manages the styles around selected cards,
 * and it manages spacing between them even though they're just specified as
 * children.
 */
import React from 'react';
import styled from 'styled-components';
import Spacer from '../Spacer';
import { UNIT } from '../../constants';

type CardToggleProps = {
  selectedOptionId: ?string,
  handleToggle: (id: string) => void,
  children: Array<React$Node>,
};

const CardToggle = ({ selectedOptionId, handleToggle, children }) => {
  const modifiedChildren = children.reduce((acc, child, index) => {
    const clonedChild = React.cloneElement(child, {
      key: index,
      onClick: () => handleToggle(child.props.id),
    });

    acc.push(clonedChild);

    const isLastChild = index - 1 === children.length;

    if (!isLastChild) {
      acc.push(<Spacer key={`spacer-${index}`} size={UNIT * 2} />);
    }

    return acc;
  }, []);

  // prettier-ignore
  return <Wrapper>
    {modifiedChildren}
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
`;

type CardToggleOptionProps = {
  id: string,
  isActive: boolean,
  children: React$Node,
};

CardToggle.Option = ({ id, children }) => {
  // prettier-ignore
  return <Card>
    {children}
  </Card>;
};

const Card = styled.div`
  flex: 1;
  padding: ${UNIT * 1.5}px ${UNIT * 2}px ${UNIT * 2}px;
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(25, 25, 25, 0.25);
`;

export default CardToggle;
