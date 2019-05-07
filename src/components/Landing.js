import React from 'react';
import Menu from './Menu';

import { Container, Background, Header } from '../styles/landing.css';

const Landing = ({ auth }) => {
  const login = () => auth.login();
  const logout = () => auth.logout();
  const isLoggedIn = auth.isAuthenticated();

  return (
    <Container>
      <Background />
      {isLoggedIn && <Menu />}
      <Header>
        <h1>Trivia Games</h1>
        <h2>Tailored to your Bar</h2>
        <p>Trivializer helps bar trivia hosts create their question sets and answer sheets by pulling from a large database of trivia questions.</p>
        {!isLoggedIn && <button onClick={login}>Log In</button>}
        <button>Learn More</button>
      </Header>
    </Container>
  );
};

export default Landing;
