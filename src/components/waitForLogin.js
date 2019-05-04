import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default Component =>
  connect(mapStateToProps)(({ loggedIn, ...rest }) => {
    if (!loggedIn) {
      return null;
    }
    return <Component {...rest} />;
  });

// const PrivateRoute = connect(mapStateToProps)(
//   ({ component: Component, loggedIn, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           loggedIn ? <Component {...props} /> : <Redirect to="/restricted" />
//         }
//       />
//     );
//   }
// );
//
// export default PrivateRoute;
