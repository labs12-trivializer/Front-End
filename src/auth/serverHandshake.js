import axios from 'axios';

const serverHandshake = auth => {
  const options = {
    baseURL: 'https://lambda-trivializer.herokuapp.com/api'
  };

  if (auth) {
    const token = localStorage.getItem('token');
    options.headers = { Authorization: `Bearer ${token}` };
  }

  return axios.create(options);
};

export { serverHandshake as default };
