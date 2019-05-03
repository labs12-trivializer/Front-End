import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchCategories = () => async dispatch => {
  dispatch({ type: FETCH_CATEGORIES_START });
  try {
    const success = await serverHandshake(true).get('/categories');
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error });
    return error;
  }
};
