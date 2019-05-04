import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? <Component {...props} /> : <Redirect to="/restricted" />
    }
  />
);

const mapStateToProps = ({ profile: { token } }) => ({ token });

export default connect(mapStateToProps)(PrivateRoute);
