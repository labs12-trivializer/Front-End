import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './config';
import { store } from '../store';
import { loginSuccess } from '../actions';

const { dispatch, getState } = store;

class Auth {
  accessToken;
  auth0Manage;
  expiresAt;
  idToken;
  requestedScopes = 'openid profile email read:current_user';
  scopes;
  tokenRenewalTimeout;
  userProfile;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    audience: 'https://lambda-trivializer.herokuapp.com/api',
    scope: this.requestedScopes
  });

  constructor() {
    this.scheduleRenewal();
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  getAccessToken = () => this.accessToken || getState().profile.accessToken;

  getIdToken = () => this.idToken || getState().profile.idToken;

  getProfile = async () => {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) reject(err);
        this.userProfile = profile;
        resolve(profile);
      });
    });
  };

  setSession = async authResult => {
    // Set the time that the access token will expire at
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    // Set the user scopes
    this.scopes = authResult.scope || this.requestedScopes;

    // Update user profile
    if (!this.userProfile) {
      try {
        const profile = await this.getProfile();

        await dispatch(
          loginSuccess({
            ...profile,
            accessToken: this.accessToken,
            idToken: this.idToken,
            expiresAt: this.expiresAt,
            scopes: this.scopes
          })
        );
      } catch (error) {
        throw new Error(error);
      }
    }

    // Schedule a token renewal
    this.scheduleRenewal();

    history.replace('/games');
  };

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

  scheduleRenewal = () => {
    let expiresAt = this.expiresAt || getState().profile.expiresAt;

    const timeout = expiresAt - Date.now();

    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  };

  getExpiryDate() {
    return JSON.stringify(
      new Date(this.expiresAt || getState().profile.expiresAt)
    );
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user profile
    this.userProfile = null;

    // Clear token renewal
    clearTimeout(this.tokenRenewalTimeout);

    // clear redux state
    dispatch({ type: 'LOGOUT_SUCCESS' });

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace('/');
  };

  userHasScopes = scopes => scopes.every(scope => this.scopes.includes(scope));

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt || getState().profile.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}

const auth = new Auth();

export { Auth as default, auth };
