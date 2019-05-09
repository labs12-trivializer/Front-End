import {
  FETCH_QUESTION_TYPES_START,
  FETCH_QUESTION_TYPES_SUCCESS,
  FETCH_QUESTION_TYPES_FAILURE,
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchQuestionTypes = () => async dispatch => {
  dispatch({ type: FETCH_QUESTION_TYPES_START });
  try {
    const success = await serverHandshake(true).get('/question_types/normalized');
    dispatch({ type: FETCH_QUESTION_TYPES_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_QUESTION_TYPES_FAILURE, payload: error });
    return error;
  }
};
