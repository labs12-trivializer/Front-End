import {
  FETCH_ROUNDS_SUCCESS,
  FETCH_ROUND_SUCCESS,
  FETCH_GAME_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  ADD_ROUND_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  EDIT_ROUND_SUCCESS,
  ADD_CUSTOM_QUESTION,
  ADD_QUESTION_SUCCESS,
  DELETE_STATE_QUESTION,
  DRAG_DROP_QUESTION,
  DELETE_ROUND_SUCCESS
} from '../actions/types';

import { combineReducers } from 'redux';
import round from './round';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
    case ADD_QUESTION_SUCCESS:
    case ADD_CUSTOM_QUESTION:
    case DELETE_QUESTION_SUCCESS:
    case DELETE_STATE_QUESTION:
      return action.round_id
        ? {
            ...state,
            [action.round_id]: round(state[action.round_id], action)
          }
        : {
            ...state,
            [action.payload.round_id]: round(
              state[action.payload.round_id],
              action
            )
          };
    case DRAG_DROP_QUESTION:
      return {
        ...state,
        [action.payload.round_id]: round(state[action.payload.round_id], action)
      };
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUNDS_SUCCESS:
      return {
        ...action.payload.entities.rounds
      };
    case ADD_ROUND_SUCCESS:
    case EDIT_ROUND_SUCCESS:
    case FETCH_ROUND_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.rounds[action.payload.result]
      };
    case DELETE_ROUND_SUCCESS:
      const { [action.payload]: removed, ...newState } = state;
      return newState;

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
    case ADD_ROUND_SUCCESS:
    case EDIT_ROUND_SUCCESS:
    case FETCH_ROUND_SUCCESS:
      return state.indexOf(action.payload.result) > -1
        ? state
        : [...state, action.payload.result];
    case DELETE_ROUND_SUCCESS:
      return state.filter(round => round !== action.payload.toString());

    default:
      return state;
  }
};

const rounds = combineReducers({
  byId,
  allIds
});

export const getAllRounds = state => state.allIds.map(id => state.byId[id]);

export const getRoundById = (state, id) => state.byId[id];

export default rounds;
