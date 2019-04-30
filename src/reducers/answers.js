import {
  FETCH_ANSWERS_SUCCESS,
  ADD_ANSWER_SUCCESS,
  EDIT_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ANSWERS_SUCCESS:
      return action.payload;
    case ADD_ANSWER_SUCCESS:
      return [...state, action.payload];
    case EDIT_ANSWER_SUCCESS:
      return state.map(answer =>
        answer.id === action.payload.id ? action.payload : answer
      );
    case DELETE_ANSWER_SUCCESS:
      return state.filter(answer => answer.id !== action.payload.id);
    default:
      return state;
  }
};
