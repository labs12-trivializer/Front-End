import React from 'react';
import { connect } from 'react-redux';
import { getHasProfile } from '../reducers';

const mapStateToProps = state => ({
  haveProfile: getHasProfile(state)
});

export default Component =>
  connect(mapStateToProps)(({ haveProfile, ...rest }) => {
    if (!haveProfile) {
      return null;
    }
    return <Component {...rest} />;
  });
