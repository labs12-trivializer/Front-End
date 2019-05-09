import {
  CREATE_NEW_GAME_START,
  CREATE_NEW_GAME_SUCCESS,
  CREATE_NEW_GAME_FAILURE
} from './types';
import serverHandshake from '../auth/serverHandshake';

export const createNewGame = newGame => async dispatch => {
  dispatch({ type: CREATE_NEW_GAME_START });
  try {
    const success = await serverHandshake(true).post('/games', newGame);
    dispatch({ type: CREATE_NEW_GAME_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: CREATE_NEW_GAME_FAILURE, payload: error });
    return error;
  }
};
