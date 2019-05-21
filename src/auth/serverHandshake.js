import axios from 'axios';
import { store } from '../store';

const getBackendUrl = () => {
  const url = window.location.href;
  const split = url.split('/');

  if (split[2].indexOf('ngrok') > -1) {
    return 'https://lambda-trivializer.herokuapp.com/api';
  }

  return null;
};

const serverHandshake = auth => {
  const options = {
    baseURL:
      process.env.REACT_APP_BACKEND_URI ||
      getBackendUrl() ||
      'http://localhost:9000/api'
    // baseURL: 'https://lambda-trivializer.herokuapp.com/api' || 'http://localhost:9000/api'
  };

  if (auth) {
    const token = store.getState().profile.accessToken;
    options.headers = { Authorization: `Bearer ${token}` };
  }

  return axios.create(options);
};

export { serverHandshake as default };
