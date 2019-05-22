import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/restricted',
          state: { from: props.location }
        }} />
  )} />
);

export default PrivateRoute;
