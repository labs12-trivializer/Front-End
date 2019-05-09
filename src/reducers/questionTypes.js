import { FETCH_QUESTION_TYPES_SUCCESS } from '../actions/types';

import { combineReducers } from 'redux';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTION_TYPES_SUCCESS:
      return {
        ...action.payload.entities.questionTypes
      };
    default:
      return state;
  }
};

// allIds reducer
const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_QUESTION_TYPES_SUCCESS:
      return Object.keys(action.payload.entities.questionTypes);
    default:
      return state;
  }
};

const questionTypes = combineReducers({
  byId,
  allIds
});

export const getAllQuestionTypes = state => state.allIds.map(id => state.byId[id]);

export const getQuestionTypeByName = (state, name) =>
  state.byId[state.allIds.find(id => state.byId[id].name === name)];

export const getQuestionTypeById = (state, id) =>
  state.byId[id];

export default questionTypes;
