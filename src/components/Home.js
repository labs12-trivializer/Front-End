import React from 'react';
import Restricted from './Restricted';

const Home = ({ auth }) => {
  const login = () => {
    auth.login();
  };

  const { isAuthenticated } = auth;

  return (
    <div>
      {
        isAuthenticated() 
          ? (<div>Logged In!</div>) 
          : (<Restricted login={login}/>)
      }
    </div>
  );
};

export default Home;

