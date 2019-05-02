import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  ADD_PROFILE_START,
  ADD_PROFILE_SUCCESS,
  ADD_PROFILE_FAILURE,
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE_START });
  try {
    const success = await serverHandshake(true).get('/users/my_profile');
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error });
    return error;
  }
};

export const addProfile = profileData => async dispatch => {
  dispatch({ type: ADD_PROFILE_START });
  try {
    const success = await serverHandshake(true).post(`/users`, profileData);
    dispatch({ type: ADD_PROFILE_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_PROFILE_FAILURE, payload: error });
    return error;
  }
};

export const editProfile = profileData => async dispatch => {
  dispatch({ type: EDIT_PROFILE_START });
  try {
    const success = await serverHandshake(true).put(
      `/users/my_profile`,
      profileData
    );
    dispatch({ type: EDIT_PROFILE_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_PROFILE_FAILURE, payload: error });
    return error;
  }
};
