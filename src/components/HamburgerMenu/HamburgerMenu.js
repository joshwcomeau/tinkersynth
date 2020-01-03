import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { menu as menuIcon } from 'react-icons-kit/feather/menu';

import { HEADER_HEIGHT, COLORS } from '../../constants';
import useToggle from '../../hooks/toggle.hook';

import UnstyledButton from '../UnstyledButton';
import FadeIn from '../FadeIn';
import Link from '../Link';

const HamburgerMenu = ({ theme }) => {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <Wrapper
        style={{
          width: HEADER_HEIGHT,
          height: HEADER_HEIGHT,
          color: theme === 'dark' ? COLORS.white : 'inherit',
        }}
        onClick={toggleOpen}
      >
        <Icon size={32} icon={menuIcon} />
      </Wrapper>
      {isOpen && (
        <MenuWrapper onClick={toggleOpen}>
          <FadeIn>
            <Menu>
              <TopItems>
                <MenuItemLink to="/slopes">Create</MenuItemLink>
                <MenuItemLink to="/faq">FAQ</MenuItemLink>
              </TopItems>

              <BottomItems>
                <MenuItemLink to="/contact">Contact</MenuItemLink>
                <MenuItemLink to="/privacy">Privacy Policy</MenuItemLink>
              </BottomItems>
            </Menu>
          </FadeIn>
        </MenuWrapper>
      )}
    </>
  );
};

const Wrapper = styled(UnstyledButton)`
  display: flex;
  justify-content: center;
`;

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(25, 25, 25, 0.6);
`;

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0px;
  width: 66vw;
  background: ${COLORS.white};
  padding-top: 50px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuItemLink = styled(Link)`
  display: block;
  height: 50px;
  line-height: 50px;

  margin: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const TopItems = styled.div``;
const BottomItems = styled.div``;

export default HamburgerMenu;
