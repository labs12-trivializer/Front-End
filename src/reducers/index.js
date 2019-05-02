import { combineReducers } from 'redux';

import answers, * as fromAnswers from './answers';
import error from './error';
import games, * as fromGames from './games';
import profile from './profile';
import rounds, * as fromRounds from './rounds';
import questions, * as fromQuestions from './questions';

export default combineReducers({
  answers,
  error,
  games,
  profile,
  questions,
  rounds
});

export const getAllGames = state => fromGames.getAllGames(state.games);

export const getAllRounds = state => fromRounds.getAllRounds(state.rounds);

export const getAllQuestions = state =>
  fromQuestions.getAllQuestions(state.questions);

export const getAllAnswers = state =>
  fromAnswers.getAllAnswers(state.answers);
