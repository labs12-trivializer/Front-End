import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/types';

const categories = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return state;
    case FETCH_CATEGORIES_SUCCESS:
      return [...action.payload];
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// export const getAllCategories = state => null;

export default categories;
