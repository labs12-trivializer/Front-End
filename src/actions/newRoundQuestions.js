import { fetchQuestionsNormalized } from '../services/opentdb';
import {
  GET_NEW_ROUND_QUESTIONS_START,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_FAILURE,
  CLEAR_NEW_ROUND_QUESTIONS_START,
  CLEAR_NEW_ROUND_QUESTIONS_SUCCESS,
  CLEAR_NEW_ROUND_QUESTIONS_FAILURE
} from './types';

// import axios from 'axios';

export const fetchNewRoundQuestions = (
  params,
  categories,
  types,
  round_id
) => async dispatch => {
  dispatch({ type: GET_NEW_ROUND_QUESTIONS_START });
  try {
    const success = await fetchQuestionsNormalized(
      params,
      categories,
      types
    ).then(res => {
      res.entities.questions = Object.keys(res.entities.questions).reduce(
        (accu, cur) => ({
          ...accu,
          [cur]: { ...res.entities.questions[cur], round_id }
        }),
        {}
      );
      dispatch({
        type: GET_NEW_ROUND_QUESTIONS_SUCCESS,
        payload: res,
        round_id
      });
    });
    return success;
  } catch (err) {
    dispatch({ type: GET_NEW_ROUND_QUESTIONS_FAILURE, payload: err });
    return err;
  }
};

export const clearNewRoundQuestions = () => async dispatch => {
  dispatch({ type: CLEAR_NEW_ROUND_QUESTIONS_START });
  try {
    dispatch({ type: CLEAR_NEW_ROUND_QUESTIONS_SUCCESS, payload: [] });
    return true;
  } catch (err) {
    dispatch({ type: CLEAR_NEW_ROUND_QUESTIONS_FAILURE, payload: err });
    return err;
  }
};
