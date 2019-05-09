import {
  CREATE_NEW_GAME_SUCCESS,
  CREATE_NEW_GAME_FAILURE
} from '../actions/types';
// ADD_GAME_START,
//   ADD_GAME_SUCCESS,
//   ADD_GAME_FAILURE,
//   ADD_ROUND_START,
//   ADD_ROUND_SUCCESS,
//   ADD_ROUND_FAILURE

import { combineReducers } from 'redux';

const allRoundIds = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const byRoundId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const game = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_GAME_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const createGame = combineReducers({
  allRoundIds,
  byRoundId,
  game
});

export default createGame;
