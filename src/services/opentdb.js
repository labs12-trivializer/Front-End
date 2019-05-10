import axios from 'axios';
import shortid from 'shortid';

const opentdb = () => {
  const options = {
    baseURL: 'https://opentdb.com/api.php'
  };

  return axios.create(options);
};

export default opentdb;

// return a promse that fetches from opentdb
// possible params: { amount, category, difficulty, type }
export const fetchQuestions = ({ amount, category, difficulty, type }) => {

  return opentdb().get('/', {
    params: {
      amount: amount === 'any' ? null : amount,
      category: category === 'any' ? null : category,
      type: type === 'any' ? null : type,
      difficulty: difficulty === 'any' ? null : difficulty
    }
  });
};

export const formatOpentdbResponse = (response, categories, types) =>
  response.data.results.map(r => ({
    question_type_id: types.find(
      t => t.name.toLowerCase().indexOf(r.type) !== -1
    ).id,
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

// take the nested response and normalize it
export const normalizeNestedResponse = nestedQuestions => {
  // these responses don't have ID's so we need to make them up
  const entities = {
    questions: {},
    answers: {}
  };

  nestedQuestions.forEach(({ answers, ...q }) => {
    q.id = shortid.generate();
    q.fromOtdb = true; // flag them as from otdb

    // take care of answers here
    q.answers = answers.map(a => {
      // give them an id and flag as fromOtdb
      a.id = shortid.generate();
      a.fromOtdb = true;

      // add them to our entities
      entities.answers[a.id] = a;

      // return an id so that q.answers is an array of ids
      return a.id;
    });

    entities.questions[q.id] = q;
  });

  return {
    entities,
    result: Object.keys(entities.questions)
  };
};

// fetch questions, format them to match our db, normalize the result
export const fetchQuestionsNormalized = (params, categories, types) =>
  fetchQuestionsFormatted(params, categories, types).then(
    normalizeNestedResponse
  );
