import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchNewRoundQuestions } from '../actions';
import { getAllCategories, getAllQuestionTypes } from '../reducers';
import CategorySelect from './CategorySelect';
import DifficultySelect from './DifficultySelect';
import TypeSelect from './TypeSelect';
import { TextInput, Button } from '../styles/shared.css';

// This Component's one job is to dispatch fetchNewRoundQuestions
const NewQuestionGetter = ({
  fetchNewRoundQuestions,
  questionLimit,
  types,
  categories,
  roundId,
  tierName,
  typesById,
  categoriesById
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
      if (roundId) {
        fetchNewRoundQuestions(
          {
            amount: fields.amount,
            category: categoriesById[fields.category_id].category_id,
            type: typesById[fields.question_type_id].name.split(' ')[0], //first word
            difficulty: fields.difficulty
          },
          categories,
          types,
          roundId
        );
      }
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {errorMsg && <div>{errorMsg}</div>}
      <TextInput
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
      <CategorySelect onChange={handleChanges} />
      <DifficultySelect onChange={handleChanges} />
      <TypeSelect onChange={handleChanges} />
      <Button
        type="submit"
        disabled={fields.amount > 50 || fields.amount > questionLimit}
      >
        Get Questions
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  categoriesById: state.categories.byId,
  types: getAllQuestionTypes(state),
  typesById: state.questionTypes.byId,
  questionLimit: state.profile.question_limit,
  tierName: state.profile.tier_name
});

export default connect(
  mapStateToProps,
  { fetchNewRoundQuestions }
)(NewQuestionGetter);
