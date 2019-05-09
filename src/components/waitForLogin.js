import React from 'react';
import { connect } from 'react-redux';
import { getLoggedIn } from '../reducers';

const mapStateToProps = state => ({
  loggedIn: getLoggedIn(state)
});

export default Component =>
  connect(mapStateToProps)(({ loggedIn, ...rest }) => {
    if (!loggedIn) {
      return null;
    }
    return <Component {...rest} />;
  });
