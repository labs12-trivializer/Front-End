import { combineReducers } from 'redux';

import answers, * as fromAnswers from './answers';
import error from './error';
import games, * as fromGames from './games';
import rounds, * as fromRounds from './rounds';
import questions, * as fromQuestions from './questions';

export default combineReducers({
  games,
  rounds,
  questions,
  answers,
  error
});

export const getAllGames = state => fromGames.getAllGames(state.games);

export const getAllRounds = state => fromRounds.getAllRounds(state.rounds);

export const getAllQuestions = state =>
  fromQuestions.getAllQuestions(state.questions);

export const getAllAnswers = state =>
  fromAnswers.getAllAnswers(state.answers);
