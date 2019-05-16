import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NewQuestionGetter from './NewQuestionGetter';
import { addRound } from '../actions/rounds';
import { fetchQuestionsFormatted } from '../services/opentdb';
import { getAllQuestionTypes, getAllCategories } from '../reducers';

const NewRoundForm = ({
  history,
  number,
  gameId,
  categories,
  types,
  addRound,
  onCancel
}) => {
  const onSubmit = params => {
    fetchQuestionsFormatted(params, categories, types)
      .then(questions =>
        addRound(
          {
            number,
            game_id: gameId,
            questions
          },
          gameId
        )
      )
      .then(success => history.push(`/rounds/${success.result}`));
  };
  return <NewQuestionGetter onCancel={onCancel} submitOverride={onSubmit} goLabel="Generate Round"/>;
};

const mapStateToProps = state => ({
  types: getAllQuestionTypes(state),
  categories: getAllCategories(state)
});
export default withRouter(
  connect(
    mapStateToProps,
    { addRound }
  )(NewRoundForm)
);
