import {
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWER_SUCCESS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_SUCCESS,
  FETCH_ROUND_SUCCESS,
  EDIT_ROUND_SUCCESS,
  FETCH_GAME_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  CHANGE_QUESTION_SUCCESS,
  ADD_CUSTOM_QUESTION
} from '../actions/types';

import { combineReducers } from 'redux';
import answer from './answer';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ANSWER?':
    case 'SOME_CHANGE_TO_ANSWER':
      return {
        ...state,
        [action.payload.id]: answer(state[action.payload.id], action)
      };
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUND_SUCCESS:
    case EDIT_ROUND_SUCCESS:
    case FETCH_QUESTIONS_SUCCESS:
    case FETCH_QUESTION_SUCCESS:
    case FETCH_ANSWERS_SUCCESS:
      return {
        ...action.payload.entities.answers
      };
    case ADD_CUSTOM_QUESTION:
    case EDIT_QUESTION_SUCCESS:
    case CHANGE_QUESTION_SUCCESS:
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.answers
      };
    case FETCH_ANSWER_SUCCESS:
      return {
        ...state,
        [action.payload.result]:
          action.payload.entities.answers[action.payload.result]
      };
    default:
      return state;
  }
};

// allIds reducer
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ANSWER?':
      return [...state, action.payload.id];
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUND_SUCCESS:
    case EDIT_ROUND_SUCCESS:
    case FETCH_ANSWERS_SUCCESS:
      return Object.keys(action.payload.entities.answers);
    case EDIT_QUESTION_SUCCESS:
    case ADD_CUSTOM_QUESTION:
    case CHANGE_QUESTION_SUCCESS:
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
      return state.concat(
        Object.keys(action.payload.entities.answers).filter(
          a => state.indexOf(a) === -1
        )
      );
    case FETCH_ANSWER_SUCCESS:
      return state.indexOf(action.payload.result) > -1
        ? state
        : [...state, action.payload.result];
    default:
      return state;
  }
};

const answers = combineReducers({
  byId,
  allIds
});

export const getAllAnswers = state => state.allIds.map(id => state.byId[id]);
export const getAnswerById = (state, id) => state.byId[id];

export default answers;
