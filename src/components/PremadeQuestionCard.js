import React, { useState } from 'react';
import { Card, IconButton, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import CategorySelect from './CategorySelect';
import TypeSelect from './TypeSelect';
import DifficultySelect from './DifficultySelect';
import { fetchNewRoundQuestions } from '../actions';
import { getAllCategories } from '../reducers';
import { getAllQuestionTypes } from '../reducers';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: theme.spacing(2),
    minHeight: 200
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0
  }
}));

const PremadeQuestionCard = ({
  onBack,
  types,
  categories,
  typesById,
  categoriesById,
  roundId,
  fetchNewRoundQuestions
}) => {
  const classes = useStyles();
  const [fields, setFields] = useState({ amount: 0 });
  const handleChanges = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });
  const handleSubmit = e => {
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

    fetchNewRoundQuestions(params, categories, types, roundId);
  };
  return (
    <Card>
      <IconButton
        aria-label="Previous"
        className={classes.backButton}
        onClick={onBack}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          label="Number of Quesitons"
          name="amount"
          value={fields.amount}
          type="number"
          onChange={handleChanges}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <CategorySelect onChange={handleChanges} />
        <TypeSelect onChange={handleChanges} />
        <DifficultySelect onChange={handleChanges} />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </form>
    </Card>
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
  {
    fetchNewRoundQuestions
  }
)(PremadeQuestionCard);
