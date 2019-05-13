import {
  DELETE_QUESTION_SUCCESS,
  DELETE_STATE_QUESTION,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  ADD_CUSTOM_QUESTION,
  ADD_QUESTION_SUCCESS,
  DRAG_DROP_QUESTION
} from '../actions/types';

const arrayMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

const removeQuestion = (round, questionId) => {
  if (!round.questions || round.questions.length === 0) {
    return round;
  }

  return { ...round, questions: round.questions.filter(q => q !== questionId) };
};

const dragDropQuestion = (round, { dragIndex, hoverIndex }) => {
  const newQuestions = arrayMove([...round.questions], dragIndex, hoverIndex);
  return {
    ...round,
    questions: newQuestions,
    dirty: true
  };
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
    case DELETE_STATE_QUESTION:
    case DELETE_QUESTION_SUCCESS:
      return removeQuestion(state, action.payload);
    case ADD_QUESTION_SUCCESS:
      return action.updateId
        ? {
            ...state,
            questions: [
              ...state.questions.filter(id => id !== action.updateId),
              action.payload.result
            ]
          }
        : { ...state, questions: [...state.questions, action.payload.result] };
    case DRAG_DROP_QUESTION:
      return dragDropQuestion(state, action.payload);
    default:
      return state;
  }
};

export default round;
