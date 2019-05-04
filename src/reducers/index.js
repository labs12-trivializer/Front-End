import { combineReducers } from 'redux';

import categories, * as fromCategories from './categories';
import answers, * as fromAnswers from './answers';
import error from './error';
import games, * as fromGames from './games';
import profile, * as fromProfile from './profile';
import rounds, * as fromRounds from './rounds';
import questions, * as fromQuestions from './questions';
import auth, * as fromAuth from './auth';

export default combineReducers({
  answers,
  error,
  games,
  profile,
  questions,
  rounds,
  categories,
  auth
});

export const getAllGames = state => fromGames.getAllGames(state.games);

export const getAllRounds = state => fromRounds.getAllRounds(state.rounds);

export const getAllQuestions = state =>
  fromQuestions.getAllQuestions(state.questions);

export const getAllAnswers = state =>
  fromAnswers.getAllAnswers(state.answers);

export const getAllCategories = state =>
  fromCategories.getAllCategories(state.categories);

export const getLoggedIn = state =>
  fromAuth.getLoggedIn(state.auth);

export const getHasProfile = state =>
  fromProfile.getHasProfile(state.profile);
