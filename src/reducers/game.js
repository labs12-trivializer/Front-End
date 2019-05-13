// reducer for a single game
import { ADD_ROUND_SUCCESS, DELETE_ROUND_SUCCESS } from '../actions/types';

const game = (state, action) => {
  switch (action.type) {
    case ADD_ROUND_SUCCESS:
      return { ...state, rounds: [...state.rounds, action.payload.result] };
    case DELETE_ROUND_SUCCESS:
      const newRounds = state.rounds.filter(
        rounds => rounds !== action.payload
      );
      return {
        ...state,
        rounds: newRounds
      };

    default:
      return state;
  }
};

export default game;
