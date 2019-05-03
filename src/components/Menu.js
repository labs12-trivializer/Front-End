import React from 'react';
import Styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Menu = ({ auth }) => {
  return (
    <MenuContainer>
      <NavItem>Menu</NavItem>
      <MenuNavLink to="/games">Games</MenuNavLink>
      <MenuNavLink to="/billing">Billing</MenuNavLink>
      <MenuNavLink to="/profile">Settings</MenuNavLink>
    </MenuContainer>
  );
};

const MenuContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(31, 71, 115, 1);
  padding: 3vh 5vw;
  margin: 5vh 0;
  width: 40vw;
`;

const NavItem = Styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  text-decoration: none;
`;

const MenuNavLink = Styled(NavLink)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;
  text-decoration: none;
`;

export default Menu;
