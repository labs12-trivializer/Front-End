import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchNewRoundQuestions } from '../actions';
import { getAllCategories, getAllQuestionTypes } from '../reducers';

// This Component's one job is to dispatch fetchNewRoundQuestions
const NewQuestionGetter = ({
  fetchNewRoundQuestions,
  questionLimit,
  types,
  categories,
  roundId,
  tierName
}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [fields, setFields] = useState({ amount: 0 });
  const handleChanges = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    let limit = questionLimit;
    if (limit > 50) {
      limit = 50;
    }
    if (fields.amount > 50) {
      setErrorMsg('Max: 50 questions at a time!');
    } else if (fields.amount > limit) {
      setErrorMsg(`${tierName} question limit: ${questionLimit}`);
    } else {
      fetchNewRoundQuestions(fields, categories, types, roundId);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {errorMsg && <div>{errorMsg}</div>}
      <input
        onChange={e => {
          handleChanges(e);
          const value = parseInt(e.target.value);
          let limit = questionLimit;
          if (limit > 50) {
            limit = 50;
          }
          if (value > limit) {
            if (questionLimit > limit) {
              setErrorMsg('Max: 50 questions at a time!');
            } else {
              setErrorMsg(`${tierName} question limit: ${questionLimit}`);
            }
          } else {
            setErrorMsg(null);
          }
        }}
        type="number"
        name="amount"
        min="1"
        max={questionLimit > 50 ? '50' : questionLimit}
        value={fields.amount}
      />
      <select name="category" onChange={handleChanges}>
        <option value="any">Any Category</option>
        {categories.map(c => (
          <option value={c.category_id} key={`category${c.id}`}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="difficulty" onChange={handleChanges}>
        <option value="any">Any Difficulty</option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <select name="type" onChange={handleChanges}>
        <option value="any">Any Type</option>
        <option value="boolean">true/false</option>
        <option value="multiple">multiple choice</option>
      </select>
      <button
        type="submit"
        disabled={fields.amount > 50 || fields.amount > questionLimit}
      >
        Get Questions
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  types: getAllQuestionTypes(state),
  questionLimit: state.profile.question_limit,
  tierName: state.profile.tier_name
});

export default connect(
  mapStateToProps,
  { fetchNewRoundQuestions }
)(NewQuestionGetter);
