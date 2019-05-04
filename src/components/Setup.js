import { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCategories, fetchProfile, loginSuccess } from '../actions';

// this is a component that we insert into the Root component which
// can be used to load categories into our redux state when
// users first authenticate
const mapStateToProps = state => ({
  haveProfile: state.profile.tier_name ? true : false,
  loggedIn: state.auth.loggedIn
});

// Functional component with destructured props, wrapped with redux's connect
export default connect(
  mapStateToProps,
  { fetchCategories, fetchProfile, loginSuccess }
)(({ haveProfile, fetchProfile, fetchCategories, loginSuccess, loggedIn }) => {
  // useEffect hook which will run onMount
  useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem('token')) {
        loginSuccess();
      }
    } else {
      if (!haveProfile) {
        fetchProfile().then(fetchCategories);
      }
    }
  }, [haveProfile, fetchCategories, fetchProfile, loggedIn, loginSuccess]);

  return null;
});
