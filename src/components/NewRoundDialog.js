import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { generateRound } from '../actions';
import { getAllCategories, getAllQuestionTypes } from '../reducers';
import CategorySelect from './CategorySelect';
import DifficultySelect from './DifficultySelect';
import TypeSelect from './TypeSelect';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button
} from '@material-ui/core';

// This Component's one job is to dispatch generateRound
const NewQuestionDialog = ({
  generateRound,
  types,
  categories,
  typesById,
  categoriesById,
  onCancel,
  open,
  roundNumber,
  gameId,
  history
}) => {
  const [fields, setFields] = useState({ amount: 0 });
  const handleChanges = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });
  const handleCreate = e => {
    e.preventDefault();
    const params = {
      amount: fields.amount,
      category:
        fields.category_id && categoriesById[fields.category_id].category_id,
      type:
        fields.question_type_id &&
        typesById[fields.question_type_id].name.split(' ')[0], //first word
      difficulty: fields.difficulty && fields.difficulty
    };

    generateRound(params, categories, types, roundNumber, gameId).then(
      success => history.push(`/rounds/${success.result}`)
    );
  };
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Round Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Specify options for question generation.
        </DialogContentText>
        <TextField
          label="Number of Quesitons"
          name="amount"
          value={fields.amount}
          type="number"
          onChange={handleChanges}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <br />
        <CategorySelect onChange={handleChanges} />
        <TypeSelect onChange={handleChanges} />
        <DifficultySelect onChange={handleChanges} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
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

export default withRouter(
  connect(
    mapStateToProps,
    { generateRound }
  )(NewQuestionDialog)
);
