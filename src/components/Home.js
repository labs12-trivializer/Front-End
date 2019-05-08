import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  addProfile,
  fetchProfile,
  fetchCategories,
  fetchQuestionTypes
} from '../actions';

const Home = ({
  auth,
  profile,
  history: { location },
  addProfile,
  fetchProfile,
  fetchCategories,
  fetchQuestionTypes
}) => {
  const { isAuthenticated } = auth;
  const { id: profileId, username } = profile;

  useEffect(() => {
    console.log('running...');
    if (isAuthenticated() && !profileId) {
      const { state } = location;

      (state ? addProfile({ email: state[0] }) : fetchProfile()).then(() => {
        fetchCategories();
        fetchQuestionTypes();
      });
    }
  });

  return (
    <div>
      <p>Welcome {username}!</p>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addProfile, fetchProfile, fetchCategories, fetchQuestionTypes }
)(Home);
