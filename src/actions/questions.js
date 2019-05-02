import {
  FETCH_QUESTIONS_START,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTION_START,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  ADD_QUESTION_START,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  EDIT_QUESTION_START,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchQuestions = () => async dispatch => {
  dispatch({ type: FETCH_QUESTIONS_START });
  try {
    const success = await serverHandshake(true).get('/questions/normalized');
    dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_QUESTIONS_FAILURE, payload: error });
    return error;
  }
};

export const fetchQuestion = (id) => async dispatch => {
  dispatch({ type: FETCH_QUESTION_START });
  try {
    const success = await serverHandshake(true).get(`/questions/normalized/${id}`);
    dispatch({ type: FETCH_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_QUESTION_FAILURE, payload: error });
    return error;
  }
};

export const addQuestion = questionData => async dispatch => {
  dispatch({ type: ADD_QUESTION_START });
  try {
    const success = await serverHandshake(true).post('/questions', questionData);
    dispatch({ type: ADD_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_QUESTION_FAILURE, payload: error });
    return error;
  }
};

export const editQuestion = (id, questionData) => async dispatch => {
  dispatch({ type: EDIT_QUESTION_START });
  try {
    const success = await serverHandshake(true).put(
      `/questions/${id}`,
      questionData
    );
    dispatch({ type: EDIT_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_QUESTION_FAILURE, payload: error });
    return error;
  }
};

export const deleteQuestion = id => async dispatch => {
  dispatch({ type: DELETE_QUESTION_START });
  try {
    const success = await serverHandshake(true).delete(`/questions/${id}`);
    dispatch({ type: DELETE_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: DELETE_QUESTION_FAILURE, payload: error });
    return error;
  }
};
