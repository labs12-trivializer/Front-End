import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_SUCCESS,
  FETCH_ROUND_SUCCESS,
  FETCH_GAME_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  GET_NEW_OPENTDB_QUESTIONS_SUCCESS
} from '../actions/types';

import { combineReducers } from 'redux';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QUESTION?':
    case 'SOME_CHANGE_TO_QUESTION':
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUND_SUCCESS:
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...action.payload.entities.questions
      };
    case GET_NEW_OPENTDB_QUESTIONS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.questions
      };
    case EDIT_QUESTION_SUCCESS:
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.questions[action.payload.result]
      };
    case DELETE_QUESTION_SUCCESS:
      const { [action.payload]: omit, ...nextState } = state;
      return nextState;
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
    case GET_NEW_OPENTDB_QUESTIONS_SUCCESS:
      return state.concat(
        Object.keys(action.payload.entities.questions).filter(
          a => state.indexOf(a) === -1
        )
      );
    case DELETE_QUESTION_SUCCESS:
      return state.filter(id => id !== action.payload);
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
