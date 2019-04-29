import React from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

const Menu = ({ auth }) => {
  
  return (
    <MenuContainer>
      <NavItem>
        <Link to={`/home`}>Home</Link>
      </NavItem>
      <NavItem>
        <Link to={'/home/games'} >Games</Link>
      </NavItem>
      <NavItem>
        <Link to={'/billing'} >Billing</Link>
      </NavItem>
      <NavItem>
        <Link to={'/settings'} >Settings</Link>
      </NavItem>
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

const NavItem = Styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;

`;


export default Menu;