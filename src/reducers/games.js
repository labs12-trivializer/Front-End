import { FETCH_GAMES_SUCCESS, FETCH_GAME_SUCCESS } from '../actions/types';
import { combineReducers } from 'redux';
import game from './game';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_GAME?':
    case 'SOME_CHANGE_TO_GAME':
      return {
        ...state,
        [action.payload.id]: game(state[action.payload.id], action)
      };
    case FETCH_GAMES_SUCCESS:
      return {
        ...action.payload.entities.games
      };
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.games[action.payload.result]
      };
    default:
      return state;
  }
};

// allIds reducer
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_GAME?':
      return [...state, action.payload.id];
    case FETCH_GAMES_SUCCESS:
      return Object.keys(action.payload.entities.games);
    case FETCH_GAME_SUCCESS:
      return state.indexOf(action.payload.result) > -1
        ? state
        : [...state, action.payload.result];
    default:
      return state;
  }
};

const games = combineReducers({
  byId,
  allIds
});

export const getAllGames = state => state.allIds.map(id => state.byId[id]);

export default games;
