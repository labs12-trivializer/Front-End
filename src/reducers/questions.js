import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_SUCCESS,
  FETCH_ROUND_SUCCESS,
  FETCH_GAME_SUCCESS,
  EDIT_QUESTION_SUCCESS
} from '../actions/types';

import { combineReducers } from 'redux';
import question from './question';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QUESTION?':
    case 'SOME_CHANGE_TO_QUESTION':
      return {
        ...state,
        [action.payload.id]: question(state[action.payload.id], action)
      };
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUND_SUCCESS:
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...action.payload.entities.questions
      };
    case EDIT_QUESTION_SUCCESS:
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.questions[action.payload.result]
      };
    default:
      return state;
  }
};

// allIds reducer
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION?':
      return [...state, action.payload.id];
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUND_SUCCESS:
    case FETCH_QUESTIONS_SUCCESS:
      return Object.keys(action.payload.entities.questions);
    case EDIT_QUESTION_SUCCESS:
    case FETCH_QUESTION_SUCCESS:
      return state.indexOf(action.payload.result) > -1
        ? state
        : [...state, action.payload.result];
    default:
      return state;
  }
};

const questions = combineReducers({
  byId,
  allIds
});

export const getAllQuestions = state => state.allIds.map(id => state.byId[id]);
export const getQuestionById = (state, id) => state.byId[id];

export default questions;
