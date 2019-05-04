import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  ADD_PROFILE_SUCCESS
} from '../actions/types';
// reducer for a single auth
const auth = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case ADD_PROFILE_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default auth;
