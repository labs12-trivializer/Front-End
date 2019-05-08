import React from 'react';
import Menu from './Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faPrint, faSyncAlt, faBolt } from '@fortawesome/free-solid-svg-icons';

import { Container, Background, Header } from '../styles/landing.css';

const Landing = ({ auth }) => {
  const login = () => auth.login();
  const isLoggedIn = auth.isAuthenticated();

  return (
    <Container>
      <Background />
      {isLoggedIn && <Menu />}
      <Header isLoggedIn={isLoggedIn}>
        <h1>Trivia Games</h1>
        <h2>Tailored to your Bar</h2>
        {/* <p>
          Trivializer replaces outdated trivia apps with a new modern design and
          an extensive collection of features.
        </p> */}
        <div className="features">
          <div>
            <FontAwesomeIcon icon={faPrint} />
            <span>Simplified printing options with premium themes</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faSyncAlt} />
            <span>Sync data between all accounts on any device</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faBolt} />
            <span>Powerful customization options</span>
          </div>
        </div>
        <div className="buttons">
          {!isLoggedIn && (
            <button onClick={login} className="login">
              Get Started
            </button>
          )}
          <button className="overview">
            <FontAwesomeIcon icon={faPlayCircle} />
            Quick Overview
          </button>
        </div>
      </Header>
    </Container>
  );
};

export default Landing;
