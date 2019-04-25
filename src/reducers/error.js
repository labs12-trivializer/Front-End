import {
  SIGNUP_FAILURE,
  LOGIN_FAILURE,
} from '../actions/types';

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      const { response } = action.payload;
      return response.data.message;
    default:
      return '';
  }
};
