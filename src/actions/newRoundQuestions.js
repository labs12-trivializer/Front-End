import { fetchQuestionsFormatted } from '../services/opentdb';
import {
  GET_NEW_ROUND_QUESTIONS_START,
  GET_NEW_ROUND_QUESTIONS_SUCCESS,
  GET_NEW_ROUND_QUESTIONS_FAILURE,
  CLEAR_NEW_ROUND_QUESTIONS_START,
  CLEAR_NEW_ROUND_QUESTIONS_SUCCESS,
  CLEAR_NEW_ROUND_QUESTIONS_FAILURE
} from './types';

// import axios from 'axios';

export const fetchNewRoundQuestions = (params, categories, types) => async dispatch => {
  dispatch({ type: GET_NEW_ROUND_QUESTIONS_START });
  try {
    // const queryString = `https://opentdb.com/api.php?amount=${
    //   params.amount
    // }${
    //   params.category === "any" ? "" : `&category=${params.category}`
    // }${
    //   params.difficulty === "any" ? "" : `&difficulty=${params.difficulty}`
    // }${
    //   params.type === "any" ? "" : `&type=${params.type}`
    // }`;

    // Use fetchQuestionsFormatted() instead of this:

    // const success = await axios.get(queryString)
    const success = await fetchQuestionsFormatted(params, categories, types)
      .then(res => {
        // dispatch({ type: GET_NEW_ROUND_QUESTIONS_SUCCESS, payload: res.data.results });
        dispatch({ type: GET_NEW_ROUND_QUESTIONS_SUCCESS, payload: res });
      })
    
      console.log('SUCCESS: ', success);
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