import {
  ADD_GAME_START,
  ADD_GAME_SUCCESS,
  ADD_GAME_FAILURE,
  CREATE_ROUND_FOR_NEW_GAME_START,
  CREATE_ROUND_FOR_NEW_GAME_SUCCESS,
  CREATE_ROUND_FOR_NEW_GAME_FAILURE,
  UPDATE_GAME_DETAILS_START,
  UPDATE_GAME_DETAILS_SUCCESS,
  UPDATE_GAME_DETAILS_FAILURE,
  NEW_GAME_DELETE_ROUND_START,
  NEW_GAME_DELETE_ROUND_SUCCESS,
  NEW_GAME_DELETE_ROUND_FAILURE
} from './types';
import serverHandshake from '../auth/serverHandshake';

export const createNewGame = newGame => async dispatch => {
  dispatch({ type: ADD_GAME_START });
  try {
    const success = await serverHandshake(true).post('/games/nested', newGame);
    dispatch({ type: ADD_GAME_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_GAME_FAILURE, payload: error });
    return error;
  }
};

export const newGameCreateRound = newRound => async dispatch => {
  dispatch({ type: CREATE_ROUND_FOR_NEW_GAME_START });
  try {
    const success = await serverHandshake(true).post('/rounds', newRound);
    dispatch({
      type: CREATE_ROUND_FOR_NEW_GAME_SUCCESS,
      payload: success.data
    });
  } catch (error) {
    dispatch({ type: CREATE_ROUND_FOR_NEW_GAME_FAILURE, payload: error });
  }
};

export const updateGame = (game, id) => async dispatch => {
  dispatch({ type: UPDATE_GAME_DETAILS_START });
  try {
    const success = await serverHandshake(true).put(`/games/${id}`, game);
    dispatch({
      type: UPDATE_GAME_DETAILS_SUCCESS,
      payload: success.data
    });
  } catch (error) {
    dispatch({ type: UPDATE_GAME_DETAILS_FAILURE, payload: error });
  }
};

export const deleteRound = id => async dispatch => {
  dispatch({ type: NEW_GAME_DELETE_ROUND_START });
  try {
    await serverHandshake(true).delete(`/rounds/${id}`);
    dispatch({ type: NEW_GAME_DELETE_ROUND_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: NEW_GAME_DELETE_ROUND_FAILURE, payload: error });
  }
};
