import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ render: Render, token, ...rest }) => (
  <Route
    {...rest}
    render={token ? Render : <Redirect to="/restricted" />}
  />
);

const mapStateToProps = ({ profile: { token } }) => ({ token });

export default connect(mapStateToProps)(PrivateRoute);
