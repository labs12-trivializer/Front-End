import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './types';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
