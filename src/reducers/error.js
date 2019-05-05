import {
  FETCH_PROFILE_FAILURE,
  ADD_PROFILE_FAILURE,
  EDIT_PROFILE_FAILURE,
  FETCH_GAMES_FAILURE,
  FETCH_GAME_FAILURE,
  ADD_GAME_FAILURE,
  EDIT_GAME_FAILURE,
  DELETE_GAME_FAILURE,
  FETCH_ROUNDS_FAILURE,
  FETCH_ROUND_FAILURE,
  ADD_ROUND_FAILURE,
  EDIT_ROUND_FAILURE,
  DELETE_ROUND_FAILURE,
  FETCH_ANSWERS_FAILURE,
  ADD_ANSWER_FAILURE,
  EDIT_ANSWER_FAILURE,
  DELETE_ANSWER_FAILURE
} from '../actions/types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_PROFILE_FAILURE:
    case ADD_PROFILE_FAILURE:
    case EDIT_PROFILE_FAILURE:
    case FETCH_GAMES_FAILURE:
    case FETCH_GAME_FAILURE:
    case ADD_GAME_FAILURE:
    case EDIT_GAME_FAILURE:
    case DELETE_GAME_FAILURE:
    case FETCH_ROUNDS_FAILURE:
    case FETCH_ROUND_FAILURE:
    case ADD_ROUND_FAILURE:
    case EDIT_ROUND_FAILURE:
    case DELETE_ROUND_FAILURE:
    case FETCH_ANSWERS_FAILURE:
    case ADD_ANSWER_FAILURE:
    case EDIT_ANSWER_FAILURE:
    case DELETE_ANSWER_FAILURE:
      const { response } = action.payload;
      return (response && response.data && response.data.message) || (action.payload);
    default:
      return '';
  }
};
