import axios from 'axios';

const serverHandshake = auth => {
  const options = {
    baseURL: process.env.REACT_APP_BACKEND_URI || 'http://localhost:9000/api'
  };

  if (auth) {
    const token = localStorage.getItem('token');
    options.headers = { Authorization: `Bearer ${token}` };
  }

  return axios.create(options);
};

export { serverHandshake as default };
