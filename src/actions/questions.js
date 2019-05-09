import {
  FETCH_QUESTIONS_START,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTION_START,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  ADD_QUESTION_START,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  EDIT_QUESTION_START,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
  FETCH_OPENTDB_QUESTIONS_START,
  FETCH_OPENTDB_QUESTIONS_SUCCESS,
  FETCH_OPENTDB_QUESTIONS_FAILURE
} from './types';

import axios from 'axios';
import serverHandshake from '../auth/serverHandshake';

export const fetchQuestions = () => async dispatch => {
  dispatch({ type: FETCH_QUESTIONS_START });
  try {
    const success = await serverHandshake(true).get('/questions/normalized');
    dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_QUESTIONS_FAILURE, payload: error });
    return error;
  }
};

export const fetchOpenTDBQuestion = (categoryId, questionType) => async dispatch => {
  dispatch({ type: FETCH_OPENTDB_QUESTIONS_START });
  try {
    const success = await axios.get('https://opentdb.com/api.php', { params: {
      category: categoryId,
      questionType: questionType
    }});
    //{
    //  "response_code": 0,
    //  "results": [
    //    {
    //      "category": "Entertainment: Music",
    //      "type": "multiple",
    //      "difficulty": "medium",
    //      "question": "Who is the vocalist and frontman of rock band &quot;Guns N&#039; Roses&quot;?",
    //      "correct_answer": "Axl Rose",
    //      "incorrect_answers": [
    //        "Kurt Cobain",
    //        "Slash",
    //        "Bono"
    //      ]
    //    }
    //  ]
    //}

    // const result = success.data.results[0];
    //
    // result.category_id = categoryId;
    // result.text = result.question;


    dispatch({ type: FETCH_OPENTDB_QUESTIONS_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_OPENTDB_QUESTIONS_FAILURE, payload: error });
    return error;
  }
};

export const fetchQuestion = id => async dispatch => {
  dispatch({ type: FETCH_QUESTION_START });
  try {
    const success = await serverHandshake(true).get(
      `/questions/normalized/${id}`
    );
    dispatch({ type: FETCH_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_QUESTION_FAILURE, payload: error });
    return error;
  }
};

export const addQuestion = questionData => async dispatch => {
  dispatch({ type: ADD_QUESTION_START });
  try {
    const success = await serverHandshake(true).post(
      '/questions',
      questionData
    );
    dispatch({ type: ADD_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_QUESTION_FAILURE, payload: error });
    return error;
  }
};

export const editQuestion = (id, questionData) => async dispatch => {
  dispatch({ type: EDIT_QUESTION_START });
  try {
    const success = await serverHandshake(true).put(
      `/questions/nested/${id}`,
      questionData
    );
    dispatch({ type: EDIT_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_QUESTION_FAILURE, payload: error });
    return error;
  }
};

export const deleteQuestion = id => async dispatch => {
  dispatch({ type: DELETE_QUESTION_START });
  try {
    const success = await serverHandshake(true).delete(`/questions/${id}`);
    dispatch({ type: DELETE_QUESTION_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: DELETE_QUESTION_FAILURE, payload: error });
    return error;
  }
};
