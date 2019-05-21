import React from 'react';
import { connect } from 'react-redux';
import he from 'he';
import {
  Card,
  CardContent,
  Typography} from '@material-ui/core';
import { getQuestionById } from '../reducers';
import Answer from './Answer';
import { makeStyles } from '@material-ui/styles';

const indexToLetter = index => String.fromCharCode(index + 64);

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
    height: '150px'
  },
  icon: {
    padding: 0
  },
  questionText: {
    lineHeight: '18px'
  },
  answerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }
}));

const PrintableQuestion = ({ highlightAnswers, question, index, questionsById }) => {
  const classes = useStyles();

  if (!question) {
    return null;
  }

  const canUndo = question.changes && question.changes.length > 0;
  const currentQuestion = canUndo
    ? questionsById[question.changes[question.changes.length - 1]]
    : question;

  return (
    <Card className={classes.card}>
      <CardContent classes={classes.cardContent}>
        <Typography
          className={classes.questionText}
          variant="h6"
          color="textPrimary"
          gutterBottom
        >
          {index + 1}.{' ' + he.decode(currentQuestion.text)}
        </Typography>
        <div className={classes.answerContainer}>
          {currentQuestion.answers &&
            currentQuestion.answers.map((a, idx) => (
              <Answer
                answerId={a}
                key={a}
                label={indexToLetter(idx + 1) + ')'}
                highlightAnswers={highlightAnswers}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const question = getQuestionById(state, ownProps.questionId);

  return {
    question,
    questionsById: state.questions.byId
  };
};

export default connect(mapStateToProps)(PrintableQuestion);
