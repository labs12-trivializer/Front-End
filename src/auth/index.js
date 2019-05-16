import auth0 from 'auth0-js';
import history from '../history';
import { store } from '../store';
import { loginSuccess } from '../actions';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;

  auth0 = new auth0.WebAuth({
    domain: 'dev-d9y68pfa.auth0.com',
    clientID: 'k6xsJZMJxRo6xrlfua5hWIUS0Dms5w8G',
    redirectUri: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/callback',
    audience: 'https://lambda-trivializer.herokuapp.com/',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth0.client.userInfo(authResult.accessToken, async (err, profile) => {
          if (profile) this.userProfile = profile;
          this.setSession(authResult);
        })
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };


  getAccessToken = () => this.accessToken;

  getIdToken = () => this.idToken;

  setSession(authResult) {
    // save username and token to persisted state
    store.dispatch(loginSuccess({
      token: authResult.accessToken,
      username: this.userProfile.given_name || this.userProfile.nickname
    }));

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    // history.replace('/home', [this.userProfile.email]);
    history.replace('/games');
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  };

  logout = () => {
    // reset persistent state
    store.dispatch({ type: 'LOGOUT' });

    // Remove tokens
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the landing route
    history.replace('/');
  };

  // Check whether the current time is past the
  // access token's expiry time
  isAuthenticated = () => this.accessToken || store.getState().profile.token;
}
