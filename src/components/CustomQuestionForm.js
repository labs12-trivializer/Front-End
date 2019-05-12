import React, { useState } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { fetchNewRoundQuestions, addCustomQuestion } from '../actions';
import { getAllCategories, getAllQuestionTypes } from '../reducers';

// This Component's one job is to dispatch fetchNewRoundQuestions
const CustomQuestionForm = ({
  roundId,
  position,
  categories,
  types,
  addCustomQuestion
}) => {
  const [errorMsg] = useState(null);
  const [fields, setFields] = useState({
    category_id: categories[0].id,
    question_type_id: types[0].id,
    text: '',
    round_id: roundId
  });
  const handleChanges = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const question = {
      ...fields,
      position,
      isCustom: true,
      id: shortid.generate(),
      round_id: roundId
    };
    addCustomQuestion(question);
  };
  return (
    <form onSubmit={onSubmit}>
      {errorMsg && <div>{errorMsg}</div>}
      <input
        onChange={handleChanges}
        type="text"
        name="text"
        value={fields.question}
        autoComplete="off"
      />
      <select
        name="category_id"
        onChange={handleChanges}
        value={fields.category_id}
      >
        {categories.map(c => (
          <option value={c.id} key={`c${c.id}`}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        name="difficulty"
        onChange={handleChanges}
        value={fields.difficulty}
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <select
        name="question_type_id"
        onChange={handleChanges}
        value={fields.question_type_id}
      >
        <option
          value={types.find(t => t.name.toLowerCase().indexOf('multiple')).id}
        >
          multiple choice
        </option>
        <option
          value={types.find(t => t.name.toLowerCase().indexOf('boolean')).id}
        >
          true/false
        </option>
      </select>
      <button type="submit">Add Question</button>
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
  { fetchNewRoundQuestions, addCustomQuestion }
)(CustomQuestionForm);
