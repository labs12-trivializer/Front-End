import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
  accessToken;
  idToken;

  auth0 = new auth0.WebAuth({
    domain: 'dev-d9y68pfa.auth0.com',
    clientID: 'k6xsJZMJxRo6xrlfua5hWIUS0Dms5w8G',
    redirectUri: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/callback',
    audience: 'https://lambda-trivializer.herokuapp.com/',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth0.client.userInfo(authResult.accessToken, async (err, profile) => {
          if (profile) {
            this.userProfile = { profile };
            console.log('User Profile:', this.userProfile)
            // Wait for localStorate to receive username value
            await this.userProfile.profile.given_name
              ? localStorage.setItem('username', this.userProfile.profile.given_name)
              : localStorage.setItem('username', this.userProfile.profile.nickname);
          }
          this.setSession(authResult);
        })
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };


  getAccessToken = () => this.accessToken;

  getIdToken = () => this.idToken;

  setSession(authResult) {
    // Set token flag in localStorage
    localStorage.setItem('token', authResult.accessToken);

    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;

    // navigate to the home route
    history.replace('/home');
  }

  logout = () => {
    // Remove tokens
    this.accessToken = null;
    this.idToken = null;

    // Remove token flag from localStorage
    localStorage.removeItem('token');

    this.auth0.logout({
      returnTo: window.location.origin
    });
  };

  // Check whether the current time is past the
  // access token's expiry time
  isAuthenticated = () => this.accessToken || localStorage.getItem('token');
}
