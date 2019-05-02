import { combineReducers } from 'redux';

import answers from './answers';
import error from './error';
import games, * as fromGames from './games';
import profile from './profile';
import rounds, * as fromRounds from './rounds';

export default combineReducers({
  answers,
  error,
  games,
  profile,
  rounds
});

export const getAllGames = state =>
  fromGames.getAllGames(state.games)

export const getAllRounds = state =>
  fromRounds.getAllRounds(state.rounds)
