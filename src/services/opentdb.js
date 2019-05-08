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
  return opentdb().get('/', { params });
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

// given our categoriesByName object, and our types array,
// request questions for a given set of parameters and format them
// to match our database schema
export const fetchQuestionsFormatted = (params, categoriesByName, types) =>
  fetchQuestions(params).then(res =>
    formatOpentdbResponse(res, categoriesByName, types)
  );
