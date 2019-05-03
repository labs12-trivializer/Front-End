import {
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/types';

import { combineReducers } from 'redux';

// byId reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...action.payload.entities.categories
      };
    default:
      return state;
  }
};

// allIds reducer
const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return Object.keys(action.payload.entities.categories);
    default:
      return state;
  }
};

const categories = combineReducers({
  byId,
  allIds
});

export const getAllCategories = state => state.allIds.map(id => state.byId[id]);

export default categories;
