import React, { Component } from 'react';
import Styled from 'styled-components';

class App extends Component {
  goTo = route => {
    this.props.history.replace(`/${route}`);
  };

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <AppContainer>
        <AppHeader>
          <h1>Trivializer</h1>
          <AppNav>
            <button onClick={() => this.goTo('home')}>Home</button>
            {!isAuthenticated() ? (
              <button onClick={this.login}>Log In</button>
            ) : (
              <button onClick={this.logout}>Log Out</button>
            )}
          </AppNav>
        </AppHeader>
      </AppContainer>
    );
  }
}

const AppContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const AppHeader = Styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
  padding: 10px;
  width: 70%;
  background-color: rgb(31, 71, 115);
  color: white;
`;

const AppNav = Styled.nav`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: flex-end; */

  button {
    cursor: pointer;
    margin: 5px 0;
    background: #19B9E9;
    border: none;
    width: 250px;
    height: 37px;
    left: 80px;
    top: 383px;
    font-family: Lato;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    text-align: center;

    color: #EBECF1;

    :hover {
      color: rgb(31, 71, 115);
    }
  }
`;

export default App;
