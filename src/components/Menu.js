import React from 'react';
import Styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Menu = ({ auth }) => {
  return (
    <MenuContainer>
      <NavLink to="/home">Menu</NavLink>
      <NavLink to="/games">Games</NavLink>
      <NavItem href="/billing">Billing</NavItem>
      <NavItem>Settings</NavItem>
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
  cursor: pointer;
  color: white;

`;

export default Menu;
