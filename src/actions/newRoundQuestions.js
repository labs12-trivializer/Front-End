import {
  GET_NEW_ROUND_QUESTIONS_START,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_FAILURE,
  CLEAR_NEW_ROUND_QUESTIONS_START,
  CLEAR_NEW_ROUND_QUESTIONS_SUCCESS,
  CLEAR_NEW_ROUND_QUESTIONS_FAILURE
} from './types';

import axios from 'axios';

export const fetchNewRoundQuestions = ({ amount, category, difficulty, type }, categories, types) => async dispatch => {
  dispatch({ type: GET_NEW_ROUND_QUESTIONS_START });
  try {
    const queryString = `https://opentdb.com/api.php?amount=${
      amount
    }${
      category === "any" ? "" : `&category=${category}`
    }${
      difficulty === "any" ? "" : `&difficulty=${difficulty}`
    }${
      type === "any" ? "" : `&type=${type}`
    }`;

    // Use fetchQuestionsFormatted() instead of this:

    const success = await axios.get(queryString)
    .then(res => {
      dispatch({ type: GET_NEW_ROUND_QUESTIONS_SUCCESS, payload: res.data.results });
    })
    return success;
  } catch (err) {
    dispatch({ type: GET_NEW_ROUND_QUESTIONS_FAILURE, payload: err });
    return err;
  }
}

export const clearNewRoundQuestions = () => async dispatch => {
  dispatch({ type: CLEAR_NEW_ROUND_QUESTIONS_START });
  try {
    dispatch({ type: CLEAR_NEW_ROUND_QUESTIONS_SUCCESS, payload: [] });
    return true;
  } catch (err) {
    dispatch({ type: CLEAR_NEW_ROUND_QUESTIONS_FAILURE, payload: err });
    return err;
  }
}