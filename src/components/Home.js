import React from 'react';

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
        <div>
          <h4>You are not logged in!</h4>
          <p>Please <button onClick={login}>Log In</button> to continue.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
