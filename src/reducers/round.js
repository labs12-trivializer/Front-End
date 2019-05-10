import {
  DELETE_QUESTION_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  ADD_CUSTOM_QUESTION
} from '../actions/types';

const removeQuestion = (round, questionId) => {
  if (!round.questions || round.questions.length === 0) {
    return round;
  }

  return { ...round, questions: round.questions.filter(q => q !== questionId) };
};
// reducer for a single round
const round = (state, action) => {
  switch (action.type) {
    case ADD_CUSTOM_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload.id]
      };
    case GET_NEW_ROUND_QUESTIONS_SUCCESS:
      // spread the new question ids into this round's questions
      return {
        ...state,
        questions: [...state.questions, ...action.payload.result]
      };
    case DELETE_QUESTION_SUCCESS:
      return removeQuestion(state, action.payload);
    default:
      return state;
  }
};

export default round;
