import React from 'react';
import { connect } from 'react-redux';
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
import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';

const NewRoundSchema = Yup.object().shape({
  amount: Yup.number()
    .integer('Must be an integer')
    .min(0, "Can't be negative")
    .max(50, 'Max 50')
});

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
  history,
  questionLimit
}) => {
  const handleCreate = values => {
    const params = {
      amount: values.amount,
      category:
        values.category_id && categoriesById[values.category_id].category_id,
      type:
        values.question_type_id &&
        typesById[values.question_type_id].name.split(' ')[0], //first word
      difficulty: values.difficulty && values.difficulty
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
        <Formik
          initialValues={{
            amount: 0,
            category_id: '',
            question_type_id: '',
            difficulty: ''
          }}
          validationSchema={NewRoundSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleCreate(values);
          }}
        >
          {({ values, errors, handleChange, isSubmitting }) => (
            <Form>
              <Field
                name="amount"
                validate={value =>
                  value > questionLimit && 'Upgrade for more questions'
                }
                render={({ field, form }) => (
                  <TextField
                    autoFocus
                    label="Number of Questions"
                    name="amount"
                    value={values.amount}
                    type="number"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    helperText={errors.amount}
                    error={errors.amount ? true : false}
                  />
                )}
              />
              <br />
              <CategorySelect onChange={handleChange} />
              <TypeSelect onChange={handleChange} />
              <DifficultySelect onChange={handleChange} />
              <DialogActions>
                <Button type="button" onClick={onCancel} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Create
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
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
