import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route {...rest} render={(props) => (
    Boolean(token)
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/restricted',
          state: { from: props.location }
        }} />
  )} />
);

const mapStateToProps = ({ profile: { token } }) => ({ token });

export default connect(mapStateToProps)(PrivateRoute);
