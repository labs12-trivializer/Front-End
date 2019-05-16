import { combineReducers } from 'redux';

import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_SUCCESS,
  FETCH_ROUND_SUCCESS,
  FETCH_GAME_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  EDIT_ROUND_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  ADD_CUSTOM_QUESTION,
  ADD_QUESTION_SUCCESS,
  DELETE_STATE_QUESTION,
  CHANGE_QUESTION_SUCCESS,
  UNDO,
  ADD_ROUND_SUCCESS
} from '../actions/types';

import question from './question';

// add question, account for dealing with questions
// previously only stored in redux (not on backend)
const addQuestion = (state, action) => {
  if (action.updateId) {
    // this question was only in redux, so it has a different id
    // from our database. Remove the old one, add the new one.
    const { [action.updateId]: omit, ...newState } = state;
    return {
      ...newState,
      [action.payload.result]:
        action.payload.entities.questions[action.payload.result]
    };
  }

  return {
    ...state,
    [action.payload.result]:
      action.payload.entities.questions[action.payload.result]
  };
};

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'SOME_CHANGE_TO_QUESTION':
    case FETCH_GAME_SUCCESS:
    case FETCH_ROUND_SUCCESS:
    case EDIT_ROUND_SUCCESS:
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...action.payload.entities.questions
      };
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
    case ADD_ROUND_SUCCESS:
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
    case ADD_CUSTOM_QUESTION:
    case ADD_QUESTION_SUCCESS:
      return addQuestion(state, action);
    case DELETE_STATE_QUESTION:
    case DELETE_QUESTION_SUCCESS:
      const { [action.payload]: omit, ...nextState } = state;
      return nextState;
    case CHANGE_QUESTION_SUCCESS:
      // add the question, then adjust original question's history
      return {
        ...state,
        ...action.payload.entities.questions,
        [action.originalId]: question(
          state[action.originalId],
          action
        )
      };
    case UNDO:
      return {
        ...state,
        [action.payload]: question(state[action.payload], action)
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
    case EDIT_ROUND_SUCCESS:
    case FETCH_QUESTIONS_SUCCESS:
      return Object.keys(action.payload.entities.questions);
    case EDIT_QUESTION_SUCCESS:
    case FETCH_QUESTION_SUCCESS:
      return state.indexOf(action.payload.result) > -1
        ? state
        : [...state, action.payload.result];
    case CHANGE_QUESTION_SUCCESS:
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
    case ADD_ROUND_SUCCESS:
      return state.concat(
        Object.keys(action.payload.entities.questions).filter(
          a => state.indexOf(a) === -1
        )
      );
    case DELETE_STATE_QUESTION:
    case DELETE_QUESTION_SUCCESS:
      return state.filter(id => id !== action.payload);
    case ADD_CUSTOM_QUESTION:
    case ADD_QUESTION_SUCCESS:
      return action.updateId
        ? [...state.filter(id => id !== action.updateId), action.payload.result]
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
