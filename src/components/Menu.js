import React from 'react';
import Styled from 'styled-components';

const Menu = ({ auth }) => {
  
  return (
    <MenuContainer>
      <NavItem>Menu</NavItem>
      <NavItem>Billing</NavItem>
      <NavItem>Settings</NavItem>
    </MenuContainer>
  )
}

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

const NavItem = Styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;

`;


export default Menu;