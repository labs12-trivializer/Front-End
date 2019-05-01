import {
  FETCH_GAMES_START,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  FETCH_GAME_START,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
  ADD_GAME_START,
  ADD_GAME_SUCCESS,
  ADD_GAME_FAILURE,
  EDIT_GAME_START,
  EDIT_GAME_SUCCESS,
  EDIT_GAME_FAILURE,
  DELETE_GAME_START,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const fetchGames = () => async dispatch => {
  dispatch({ type: FETCH_GAMES_START });
  try {
    const success = await serverHandshake(true).get('/games/normalized');
    dispatch({ type: FETCH_GAMES_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_GAMES_FAILURE, payload: error });
    return error;
  }
};

export const fetchGame = (id) => async dispatch => {
  dispatch({ type: FETCH_GAME_START });
  try {
    const success = await serverHandshake(true).get(`/games/normalized/${id}`);
    dispatch({ type: FETCH_GAME_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_GAME_FAILURE, payload: error });
    return error;
  }
};

export const addGame = gameData => async dispatch => {
  dispatch({ type: ADD_GAME_START });
  try {
    const success = await serverHandshake(true).post('/games', gameData);
    dispatch({ type: ADD_GAME_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_GAME_FAILURE, payload: error });
    return error;
  }
};

export const editGame = (id, gameData) => async dispatch => {
  dispatch({ type: EDIT_GAME_START });
  try {
    const success = await serverHandshake(true).put(
      `/games/${id}`,
      gameData
    );
    dispatch({ type: EDIT_GAME_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_GAME_FAILURE, payload: error });
    return error;
  }
};

export const deleteGame = id => async dispatch => {
  dispatch({ type: DELETE_GAME_START });
  try {
    const success = await serverHandshake(true).delete(`/games/${id}`);
    dispatch({ type: DELETE_GAME_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: DELETE_GAME_FAILURE, payload: error });
    return error;
  }
};
