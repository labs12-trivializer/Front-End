import { DELETE_QUESTION_SUCCESS } from '../actions/types';

const removeQuestion = (round, questionId) => {
  if (!round.questions || round.questions.length === 0) {
    return round;
  }

  return { ...round, questions: round.questions.filter(q => q !== questionId) };
};
// reducer for a single round
const round = (state, action) => {
  switch (action.type) {
    case DELETE_QUESTION_SUCCESS:
      return removeQuestion(state, action.payload);
    default:
      return state;
  }
};

export default round;
