import React from 'react';
import Styled from 'styled-components';


const NavBar = ({ auth }) => {
  const logout = () => {
    console.log('Logging out.. maybe?');
    auth.logout();
  };
  

  return (
    <div>
      <Nav>
        <h4>Trivializer</h4>
        <NavItem onClick={logout}>Log Out</NavItem>
      </Nav>
    </div>
  )
}

const Nav = Styled.nav`
  display: flex;
  flex-direction: row;
  background-color: rgb(31, 71, 115);
  top: 0;
  height: 8vh;
  width: 100%;
  padding: 2vh 5vw;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  color: #19B9E9;
`;

const NavItem = Styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;
`;

export default NavBar;