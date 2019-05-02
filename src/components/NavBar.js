import React from 'react';
import Styled from 'styled-components';


const NavBar = ({ auth, history }) => {
  const logout = () => {
    console.log('Logging out.. maybe?');
    auth.logout();
  };

  const gotoHome = () => {
    history.push('/home')
  }

  const gotoProfile = () => {
    history.push('/profile');
  }

  const toggleMenu = () => {
    // This function will toggle menu to slide on/off screen
  }

  const username = localStorage.getItem('username');

  return (
    <div>
      <Nav>
        <NavItem onClick={toggleMenu}>Menu</NavItem>
        <h4 onClick={gotoHome}>Trivializer</h4>
        <Row>
          <NavItem onClick={gotoProfile}>{username}</NavItem>
          <p>|</p>
          <NavItem onClick={logout}>Log Out</NavItem>
        </Row>
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

const Row = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0 8px;
  }
`;

const NavItem = Styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;

`;

export default NavBar;
