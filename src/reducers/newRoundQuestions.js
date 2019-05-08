import {
  GET_NEW_ROUND_QUESTIONS_SUCCESS
} from '../actions/types';

export const getNewRoundQuestions = state => state;

export default (state = [], action) => {
  switch (action.type) {
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
      return [ ...action.payload ];
    default:
      return state;
  }
};

