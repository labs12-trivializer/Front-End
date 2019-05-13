import {
  FETCH_GAMES_SUCCESS,
  FETCH_GAME_SUCCESS,
  EDIT_GAME_SUCCESS,
  ADD_GAME_SUCCESS,
  DELETE_GAME_SUCCESS,
  ADD_ROUND_SUCCESS,
  UPDATE_GAME_DETAILS_SUCCESS
} from '../actions/types';
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
    case EDIT_GAME_SUCCESS:
    case ADD_GAME_SUCCESS:
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.games[action.payload.result]
      };
    case DELETE_GAME_SUCCESS:
      const { [action.payload.id]: removed, ...newState } = state;
      return newState;
    case ADD_ROUND_SUCCESS:
      return {
        ...state,
        [action.game_id]: game(state[action.game_id], action)
      };
    case UPDATE_GAME_DETAILS_SUCCESS:
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
    case ADD_GAME_SUCCESS:
      return [...state, action.payload.result];
    case FETCH_GAMES_SUCCESS:
      return Object.keys(action.payload.entities.games);
    case FETCH_GAME_SUCCESS:
      return state.indexOf(action.payload.result.toString()) > -1
        ? state
        : [...state, action.payload.result.toString()];
    case DELETE_GAME_SUCCESS:
      return state.filter(g => g !== action.payload.id);
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
