import {
  FETCH_ROUNDS_START,
  FETCH_ROUNDS_SUCCESS,
  FETCH_ROUNDS_FAILURE,
  FETCH_ROUND_START,
  FETCH_ROUND_SUCCESS,
  FETCH_ROUND_FAILURE,
  ADD_ROUND_START,
  ADD_ROUND_SUCCESS,
  ADD_ROUND_FAILURE,
  EDIT_ROUND_START,
  EDIT_ROUND_SUCCESS,
  EDIT_ROUND_FAILURE,
  DELETE_ROUND_START,
  DELETE_ROUND_SUCCESS,
  DELETE_ROUND_FAILURE
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchRounds = () => async dispatch => {
  dispatch({ type: FETCH_ROUNDS_START });
  try {
    const success = await serverHandshake(true).get('/rounds/normalized');
    dispatch({ type: FETCH_ROUNDS_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_ROUNDS_FAILURE, payload: error });
    return error;
  }
};

export const fetchRound = id => async dispatch => {
  dispatch({ type: FETCH_ROUND_START });
  try {
    const success = await serverHandshake(true).get(`/rounds/normalized/${id}`);
    dispatch({ type: FETCH_ROUND_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_ROUND_FAILURE, payload: error });
    return error;
  }
};

export const addRound = (roundData, game_id) => async dispatch => {
  dispatch({ type: ADD_ROUND_START });
  try {
    const success = await serverHandshake(true).post(
      '/rounds/nested',
      roundData
    );
    dispatch({ type: ADD_ROUND_SUCCESS, payload: success.data, game_id });
    return success.data;
  } catch (error) {
    dispatch({ type: ADD_ROUND_FAILURE, payload: error });
    return error;
  }
};

export const editRound = (id, roundData) => async dispatch => {
  dispatch({ type: EDIT_ROUND_START });
  try {
    const success = await serverHandshake(true).put(
      `/rounds/nested/${id}`,
      roundData
    );
    dispatch({ type: EDIT_ROUND_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_ROUND_FAILURE, payload: error });
    return error;
  }
};

export const deleteRound = (round_id, game_id) => async dispatch => {
  dispatch({ type: DELETE_ROUND_START });
  try {
    const success = await serverHandshake(true).delete(`/rounds/${round_id}`);
    dispatch({ type: DELETE_ROUND_SUCCESS, payload: round_id, game_id });
    return success;
  } catch (error) {
    dispatch({ type: DELETE_ROUND_FAILURE, payload: error });
    return error;
  }
};
