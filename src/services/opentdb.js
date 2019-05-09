import axios from 'axios';

const opentdb = () => {
  const options = {
    baseURL: 'https://opentdb.com/api.php'
  };

  return axios.create(options);
};

export default opentdb;

// return a promse that fetches from opentdb
// common params: { amount, category, difficulty, type }
export const fetchQuestions = params => {
  // params.amount = Number(params.amount);
  const queryString = `?amount=${
    params.amount
  }${
    params.category === "any" ? "" : `&category=${params.category}`
  }${
    params.difficulty === "any" ? "" : `&difficulty=${params.difficulty}`
  }${
    params.type === "any" ? "" : `&type=${params.type}`
  }`;

  return opentdb().get(`/${queryString}`);
};

export const formatOpentdbResponse = (response, categories, types) =>
  response.data.results.map(r => ({
    question_type_id: types.find(t => t.name.toLowerCase().indexOf(r.type) !== -1).id,
    category_id: categories.find(c => c.name === r.category).id,
    difficulty: r.difficulty,
    text: r.question,
    answers: [
      { text: r.correct_answer, is_correct: true },
      ...r.incorrect_answers.map(a => ({
        text: a,
        is_correct: false
      }))
    ]
  }));

// given a params object and arrays of our categories and types,
// request questions for a given set of parameters and format them
// to match our database schema as best as possible
export const fetchQuestionsFormatted = (params, categories, types) =>
  fetchQuestions(params).then(res =>
    formatOpentdbResponse(res, categories, types)
  );
