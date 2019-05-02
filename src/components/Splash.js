import React from 'react';

import { Background, Logo, Trivia } from '../styles/splash.css';

const Splash = ({history}) => {
  setTimeout(() => {
    history.replace('/landing');
  }, 3500);

  return (
    <Background>
      <Logo>TVZ</Logo>
      <Trivia>Trivia</Trivia>
    </Background>
  );
};

export default Splash;
