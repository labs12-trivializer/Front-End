import axios from 'axios';
import { store } from '../store';

const serverHandshake = auth => {
  const options = {
    baseURL: process.env.REACT_APP_BACKEND_URI || 'http://localhost:9000/api'
  };

  if (auth) {
    const token = store.getState().profile.token;
    options.headers = { Authorization: `Bearer ${token}` };
  }

  return axios.create(options);
};

export { serverHandshake as default };
