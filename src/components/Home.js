import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Restricted from './Restricted';
import Menu from './Menu';

import { addProfile, fetchProfile, fetchCategories } from '../actions';

const Home = ({
  auth,
  profile,
  history: { location },
  addProfile,
  fetchProfile,
  fetchCategories
}) => {
  const { isAuthenticated } = auth;
  const { id: profileId, username } = profile;

  useEffect(() => {
    console.log('running...');
    if (isAuthenticated() && !profileId) {
      const { state } = location;

      (state ? addProfile({ email: state[0] }) : fetchProfile()).then(() => {
        fetchCategories();
      });
    }
  });

  const login = () => {
    auth.login();
  };

  return !isAuthenticated() ? (
    <Restricted login={login} />
  ) : (
    <div>
      <p>Welcome {username}!</p>
      <div>
        <Menu />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addProfile, fetchProfile, fetchCategories }
)(Home);
