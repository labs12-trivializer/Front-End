// reducer for a single game
import { ADD_ROUND_SUCCESS } from '../actions/types';

const game = (state, action) => {
  switch (action.type) {
    case ADD_ROUND_SUCCESS:
      return { ...state, rounds: [...state.rounds, action.payload.result] };

    default:
      return state;
  }
};

export default game;
