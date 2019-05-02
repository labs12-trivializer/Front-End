import {
  FETCH_ROUNDS_SUCCESS,
  FETCH_ROUND_SUCCESS,
  FETCH_GAME_SUCCESS
} from '../actions/types';

import { combineReducers } from 'redux';
import round from './round';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ROUND?':
    case 'SOME_CHANGE_TO_ROUND':
      return {
        ...state,
        [action.payload.id]: round(state[action.payload.id], action)
      };
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUNDS_SUCCESS:
      return {
        ...action.payload.entities.rounds
      };
    case FETCH_ROUND_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.rounds[action.payload.result]
      };
    default:
      return state;
  }
};

// allIds reducer
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROUND?':
      return [...state, action.payload.id];
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUNDS_SUCCESS:
      return Object.keys(action.payload.entities.rounds);
    case FETCH_ROUND_SUCCESS:
      return state.indexOf(action.payload.result) > -1
        ? state
        : [...state, action.payload.result];
    default:
      return state;
  }
};

const rounds = combineReducers({
  byId,
  allIds
});

export const getAllRounds = state => state.allIds.map(id => state.byId[id]);

export default rounds;
