import {
  FETCH_ANSWERS_START,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_FAILURE,
  ADD_ANSWER_START,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE,
  EDIT_ANSWER_START,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_FAILURE,
  DELETE_ANSWER_START,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_FAILURE
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchAnswers = questionID => async dispatch => {
  dispatch({ type: FETCH_ANSWERS_START });
  try {
    const success = await serverHandshake(true).get('/answers');
    dispatch({ type: FETCH_ANSWERS_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_ANSWERS_FAILURE, payload: error });
    return error;
  }
};

export const addAnswer = answerData => async dispatch => {
  dispatch({ type: ADD_ANSWER_START });
  try {
    const success = await serverHandshake(true).post('/answers', answerData);
    dispatch({ type: ADD_ANSWER_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_ANSWER_FAILURE, payload: error });
    return error;
  }
};

export const editAnswer = (id, answerData) => async dispatch => {
  dispatch({ type: EDIT_ANSWER_START });
  try {
    const success = await serverHandshake(true).put(
      `/answers/${id}`,
      answerData
    );
    dispatch({ type: EDIT_ANSWER_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_ANSWER_FAILURE, payload: error });
    return error;
  }
};

export const deleteAnswer = id => async dispatch => {
  dispatch({ type: DELETE_ANSWER_START });
  try {
    const success = await serverHandshake(true).delete(`/answers/${id}`);
    dispatch({ type: DELETE_ANSWER_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: DELETE_ANSWER_FAILURE, payload: error });
    return error;
  }
};
