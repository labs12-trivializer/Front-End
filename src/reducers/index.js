import { combineReducers } from 'redux';

import categories, * as fromCategories from './categories';
import answers, * as fromAnswers from './answers';
import error from './error';
import games, * as fromGames from './games';
import profile, * as fromProfile from './profile';
import rounds, * as fromRounds from './rounds';
import questions, * as fromQuestions from './questions';
import newRoundQuestions, * as fromNewRoundQuestions from './newRoundQuestions';
import auth, * as fromAuth from './auth';
import questionTypes, * as fromQuestionTypes from './questionTypes';

const appReducer = combineReducers({
  answers,
  error,
  games,
  profile,
  questions,
  newRoundQuestions,
  questionTypes,
  rounds,
  categories,
  auth
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;

export const getAllGames = state => fromGames.getAllGames(state.games);

export const getAllRounds = state => fromRounds.getAllRounds(state.rounds);

export const getAllQuestions = state =>
  fromQuestions.getAllQuestions(state.questions);

export const getQuestionById = (state, id) =>
  fromQuestions.getQuestionById(state.questions, id);

export const getAllAnswers = state => fromAnswers.getAllAnswers(state.answers);
export const getAnswerById = (state, id) =>
  fromAnswers.getAnswerById(state.answers, id);

export const getAllCategories = state =>
  fromCategories.getAllCategories(state.categories);

export const getLoggedIn = state => fromAuth.getLoggedIn(state.auth);

export const getHasProfile = state => fromProfile.getHasProfile(state.profile);

export const getNewRoundQuestions = state =>
  fromNewRoundQuestions.getNewRoundQuestions(state.newRoundQuestions);

export const getAllQuestionTypes = state =>
  fromQuestionTypes.getAllQuestionTypes(state.questionTypes);

export const getQuestionTypeById = (state, id) =>
  fromQuestionTypes.getQuestionTypeById(state.questionTypes, id);
