import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

const List = props => {
  return <Wrapper {...props} />;
};

List.Item = props => <ListItemWrapper {...props} />;

const Wrapper = styled.ul`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;
  color: ${COLORS.gray[900]};
  margin-bottom: ${UNIT * 3}px;
`;

const ListItemWrapper = styled.li`
  position: relative;
  margin-bottom: ${UNIT * 4}px;
  margin-left: ${UNIT * 2}px;
  list-style: circle;
`;

export default List;
