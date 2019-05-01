import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { arrowRightC } from 'react-icons-kit/ionicons/arrowRightC';

import { COLORS, UNIT } from '../../constants';

const List = props => {
  return <Wrapper {...props} />;
};

List.Item = ({ children }) => (
  <ListItemWrapper>
    <IconWrapper>
      <IconBase size={16} icon={arrowRightC} />
    </IconWrapper>

    <div>{children}</div>
  </ListItemWrapper>
);

const Wrapper = styled.ul`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;
  color: ${COLORS.gray[900]};
  margin-bottom: ${UNIT * 4}px;
`;

const ListItemWrapper = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${UNIT * 1.5}px;
`;

const IconWrapper = styled.div`
  padding-right: 16px;
  color: ${COLORS.pink[500]};
`;

export default List;
