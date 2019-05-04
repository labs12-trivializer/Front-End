import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  haveProfile: state.profile.tier_name ? true : false
});

export default Component =>
  connect(mapStateToProps)(({ haveProfile, ...rest }) => {
    if (!haveProfile) {
      return null;
    }
    return <Component {...rest} />;
  });
