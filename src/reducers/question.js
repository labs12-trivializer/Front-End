import { CHANGE_QUESTION_SUCCESS, UNDO } from '../actions/types';
// reducer for a single question
const question = (state, action) => {
  switch (action.type) {
    case UNDO:
      return state.changes && state.changes.length > 0
        ? { ...state, changes: state.changes.slice(0, -1) }
        : state;
    case CHANGE_QUESTION_SUCCESS:
      return {
        ...state,
        changes: state.changes
          ? [...state.changes, action.payload.result[0]]
          : action.payload.result
      };
    default:
      return state;
  }
};

export default question;
