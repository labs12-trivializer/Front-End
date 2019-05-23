import React from 'react';
import {
  Card,
  IconButton,
  TextField,
  Button,
  CardContent
} from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import CategorySelect from './CategorySelect';
import TypeSelect from './TypeSelect';
import DifficultySelect from './DifficultySelect';
import { fetchNewRoundQuestions } from '../actions';
import { getAllCategories } from '../reducers';
import { getAllQuestionTypes } from '../reducers';

import { NewRoundSchema as PremadeQuestionsSchema } from './NewRoundDialog';
import { Formik, Form, Field } from 'formik';
import { getRoundById } from '../reducers';

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
  },
  cardContent: {
    maxWidth: '100%',
    width: '600px'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const PremadeQuestionsCard = ({
  onBack,
  types,
  categories,
  typesById,
  categoriesById,
  roundId,
  fetchNewRoundQuestions,
  onComplete,
  questionLimit,
  round
}) => {
  const classes = useStyles();
  const handleFetch = fields => {
    const params = {
      amount: fields.amount,
      category:
        fields.category_id && categoriesById[fields.category_id].category_id,
      type:
        fields.question_type_id &&
        typesById[fields.question_type_id].name.split(' ')[0], //first word
      difficulty: fields.difficulty && fields.difficulty
    };

    fetchNewRoundQuestions(params, categories, types, roundId).then(onComplete);
  };
  return (
    <Card className={classes.card}>
      <IconButton
        aria-label="Previous"
        className={classes.backButton}
        onClick={onBack}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <CardContent className={classes.cardContent}>
        <Formik
          initialValues={{
            amount: 0,
            category_id: '',
            question_type_id: '',
            difficulty: ''
          }}
          validationSchema={PremadeQuestionsSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleFetch(values);
          }}
        >
          {({ values, errors, handleChange, isSubmitting }) => (
            <Form>
              <Field
                name="amount"
                validate={value =>
                  value > questionLimit - round.questions.length &&
                  'Upgrade for more questions'
                }
                render={() => (
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
              <div className={classes.buttonRow}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Add Questions
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state),
  categoriesById: state.categories.byId,
  types: getAllQuestionTypes(state),
  typesById: state.questionTypes.byId,
  questionLimit: state.profile.question_limit,
  tierName: state.profile.tier_name,
  round: getRoundById(state, ownProps.roundId)
});

export default connect(
  mapStateToProps,
  {
    fetchNewRoundQuestions
  }
)(PremadeQuestionsCard);
