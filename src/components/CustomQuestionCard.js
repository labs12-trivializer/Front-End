import React, { useState } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import {
  Card,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import CategorySelect from './CategorySelect';
import DifficultySelect from './DifficultySelect';
import TypeSelect from './TypeSelect';
import { addCustomQuestion } from '../actions';
import shuffle from '../helpers/shuffle';
import { getAllCategories, getAllQuestionTypes } from '../reducers';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const QuestionSchema = Yup.object().shape({
  text: Yup.string()
    .trim()
    .max(150, 'Too Long')
    .required('Required')
});

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

const getSteps = () => {
  return ['Step 1', 'Step 2', 'Step 3'];
};

const CustomQuestionCard = ({
  onBack,
  position,
  onComplete,
  addCustomQuestion,
  roundId,
  categories,
  types
}) => {
  const initialAnswerState = {
    is_correct: false,
    text: ''
  };
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [question, setQuestion] = useState(null);
  const [, setAnswerFields] = useState(initialAnswerState);
  const [answers, setAnswers] = useState([]);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep =>
      prevActiveStep + 1 > steps.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  const onQuestionSubmit = fields => {
    setQuestion({
      ...fields,
      position,
      isCustom: true,
      id: shortid.generate(),
      round_id: roundId
    });
  };

  const onAnswerSubmit = (answerFields, isIncorrect) => {
    const answer = {
      ...answerFields,
      id: shortid.generate(),
      question_id: question.id,
      is_correct: isIncorrect ? false : true
    };
    setAnswers([...answers, answer]);
    setAnswerFields(initialAnswerState);
  };

  // onComplete, turn our questions and answers into
  // what looks like a normalized server response
  // then clear our fields
  const handleFinish = () => {
    const entities = {
      answers: shuffle(answers).reduce(
        (accu, cur) => ({
          ...accu,
          [cur.id]: cur
        }),
        {}
      ),
      questions: {
        [question.id]: {
          ...question,
          answers: answers.map(a => a.id)
        }
      }
    };
    const result = question.id;
    addCustomQuestion({ entities, result }, question.round_id);
    onComplete();
  };

  const step1 = (
    <Formik
      initialValues={{
        text: '',
        category_id: categories[0].id,
        difficulty: 'easy',
        question_type_id: types[0].id
      }}
      validationSchema={QuestionSchema}
      onSubmit={(values, actions) => {
        onQuestionSubmit(values);
        handleNext();
        actions.resetForm();
      }}
    >
      {({ values, errors, handleChange }) => (
        <Form autoComplete="off">
          <Field
            id="QuestionText"
            name="text"
            render={() => (
              <TextField
                margin="normal"
                autoFocus
                label="Question Text"
                name="text"
                value={values.text}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                helperText={errors.text}
                error={errors.text ? true : false}
                fullWidth
              />
            )}
          />
          <CategorySelect
            allowAny={false}
            onChange={handleChange}
            placeholder="Select a Category..."
          />
          <DifficultySelect allowAny={false} onChange={handleChange} />
          <TypeSelect
            allowAny={false}
            onChange={handleChange}
            placeholder="Select a Question Type..."
          />
          <div className={classes.buttonRow}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  const step2 = (
    <Formik
      initialValues={{
        text: ''
      }}
      validationSchema={QuestionSchema}
      onSubmit={(values, actions) => {
        onAnswerSubmit(values);
        actions.resetForm();
      }}
    >
      {({ values, errors, handleChange }) => (
        <Form autoComplete="off">
          <Field
            name="text"
            id="AnswerText"
            validate={() => {
              if (answers && answers.length > 3) {
                return 'Only 4 answers per question allowed';
              }
            }}
            render={() => (
              <TextField
                autoFocus
                label="Correct Answer Text"
                helperText={errors.text || (answers.length > 3 && 'Answer Limit Reached')}
                name="text"
                value={values.text}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
                error={errors.text ? true : false}
                fullWidth
                disabled={answers.length > 3}
              />
            )}
          />
          <div className={classes.buttonRow}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={answers.length > 3}
            >
              Add Answer
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleNext}
              type="button"
            >
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  const step3 = (
    <Formik
      initialValues={{
        text: ''
      }}
      validationSchema={QuestionSchema}
      onSubmit={(values, actions) => {
        onAnswerSubmit(values, true);
        actions.resetForm();
      }}
    >
      {({ values, errors, handleChange }) => (
        <Form autoComplete="off">
          <Field
            name="text"
            id="IncorrectAnswerText"
            render={() => (
              <TextField
                autoFocus
                label="Incorrect Answer Text"
                name="text"
                value={values.text}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
                helperText={errors.text || (answers.length > 3 && 'Answer Limit Reached')}
                error={errors.text ? true : false}
                fullWidth
                disabled={answers.length > 3}
              />
            )}
          />
          <div className={classes.buttonRow}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={answers.length > 3}
            >
              Add Incorrect Answer
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleFinish}
              type="button"
            >
              Finish
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  const stepContent = [step1, step2, step3];
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <IconButton
          aria-label="Previous"
          className={classes.backButton}
          onClick={onBack}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Question</StepLabel>
          </Step>
          <Step>
            <StepLabel>Correct Answers</StepLabel>
          </Step>
          <Step>
            <StepLabel>Incorrect Answers</StepLabel>
          </Step>
        </Stepper>
        <div>{stepContent[activeStep]}</div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  types: getAllQuestionTypes(state)
});

export default connect(
  mapStateToProps,
  { addCustomQuestion }
)(CustomQuestionCard);
