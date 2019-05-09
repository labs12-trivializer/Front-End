import {
  GET_NEW_ROUND_QUESTIONS_START,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_FAILURE
} from './types';

import axios from 'axios';

export const fetchNewRoundQuestions = ({ amount, category, difficulty, type }) => async dispatch => {
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