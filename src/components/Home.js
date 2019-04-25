import React from 'react';
import Restricted from './Restricted';

const Home = ({ auth }) => {
  const login = () => {
    auth.login();
  };

  const { isAuthenticated } = auth;

  return (
    <div>
      {isAuthenticated() ? (
        <h4>You are logged in!</h4>
      ) : (
        <Restricted login={login}/>
      )}
    </div>
  );
};

export default Home;
