import { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchCategories,
  fetchProfile,
  loginSuccess,
  fetchQuestionTypes,
  addProfile
} from '../actions';

// this is a component that we insert into the Root component which
// can be used to load categories into our redux state when
// users first authenticate
const mapStateToProps = state => ({
  haveProfile: state.profile.tier_name ? true : false,
  loggedIn: state.auth.loggedIn,
  sub: state.profile.sub,
  email: state.profile.email,
  nickname: state.profile.nickname
});

// Functional component with destructured props, wrapped with redux's connect
export default connect(
  mapStateToProps,
  {
    fetchCategories,
    fetchProfile,
    loginSuccess,
    fetchQuestionTypes,
    addProfile
  }
)(
  ({
    haveProfile,
    fetchProfile,
    fetchCategories,
    loginSuccess,
    loggedIn,
    sub,
    email,
    nickname,
    addProfile,
    fetchQuestionTypes
  }) => {
    // useEffect hook which will run onMount
    useEffect(() => {
      // if we're not logged in, check if there's a token
      if (!loggedIn) {
        // if there's a token, consider us loggedIn
        // if not, we have to dispatch a loginSuccess elsewhere
        // our auth reducer also counts addProfile as a valid login
        if (localStorage.getItem('token')) {
          loginSuccess();
        }
      } else {
        if (!haveProfile && email) {
          addProfile({
            auth0_id: sub,
            email,
            nickname
          }).then(() =>
            Promise.all([fetchCategories(), fetchQuestionTypes()])
          );
        }
      }
    }, [
      haveProfile,
      fetchCategories,
      fetchQuestionTypes,
      fetchProfile,
      loggedIn,
      loginSuccess,
      addProfile,
      sub,
      email,
      nickname
    ]);

    return null;
  }
);
