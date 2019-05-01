import { combineReducers } from 'redux';

import answers from './answers';
import error from './error';
import games, * as fromGames from './games';
import rounds, * as fromRounds from './rounds';

export default combineReducers({
  games,
  answers,
  rounds,
  error
});

export const getAllGames = state =>
  fromGames.getAllGames(state.games)

export const getAllRounds = state =>
  fromRounds.getAllRounds(state.rounds)
