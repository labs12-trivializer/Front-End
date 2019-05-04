import React from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';

const NavBar = ({ auth, history, username }) => {
  const login = () => {
    auth.login();
  }

  const logout = () => {
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

  const isLoggedIn = auth.isAuthenticated();

  return (
    <div>
      <Nav>
        <NavItem onClick={toggleMenu}>Menu</NavItem>
        <AppTitle onClick={gotoHome}>Trivializer</AppTitle>
        <Row>
          {isLoggedIn && (
            <>
              <NavItem onClick={gotoProfile}>{username}</NavItem>
              <p>|</p>
            </>
          )}
          <NavItem onClick={isLoggedIn ? logout : login}>Log {isLoggedIn ? 'Out' : 'In'}</NavItem>
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

const AppTitle = Styled.h4`
  cursor: pointer;
`;

const mapStateToProps = state => ({
  username: state.profile.username
});

export default connect(mapStateToProps)(NavBar);
