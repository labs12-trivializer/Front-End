import { combineReducers } from 'redux';

import answers from './answers';
import error from './error';
import games, * as fromGames from './games';

export default combineReducers({
  games,
  answers,
  error
});

export const getAllGames = state =>
  fromGames.getAllGames(state.games)
