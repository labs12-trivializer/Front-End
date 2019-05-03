import { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCategories, fetchProfile } from '../actions';

// this is a component that we insert into the Root component which
// can be used to load categories into our redux state when
// users first authenticate
const mapStateToProps = state => ({
  haveProfile: state.profile.tier_name ? true : false
});

// Functional component with destrctured props, wrapped with redux's connect
export default connect(
  mapStateToProps,
  { fetchCategories, fetchProfile }
)(({ haveProfile, fetchProfile, fetchCategories }) => {
  // useEffect hook which will run onMount
  useEffect(() => {
    if (!haveProfile) {
      fetchProfile().then(fetchCategories);
    }

  }, [haveProfile, fetchCategories, fetchProfile]);

  return null;
});
