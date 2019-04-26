import React from 'react';
import Styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Restricted from './Restricted';

const Home = ({ auth }) => {
  const login = () => {
    auth.login();
  };

  const logout = () => {
    localStorage.clear();
  }

  const { isAuthenticated } = auth;

  return (
    <div>
      {isAuthenticated() ? (
        <div>
          <Nav>
            <h4>Trivializer</h4>
            <NavLink to='/' onClick={logout}>
              <NavItem>Log Out</NavItem>
            </NavLink>
          </Nav>
        </div>
      ) : (
        <Restricted login={login}/>
      )}
    </div>
  );
};

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

const NavItem = Styled.div`
  display: flex;
  flex-direction: row;
  color: white;
`;

export default Home;

