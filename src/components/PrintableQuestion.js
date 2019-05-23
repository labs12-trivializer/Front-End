import React from 'react';
import { connect } from 'react-redux';
import he from 'he';
import { Card, CardContent, Typography } from '@material-ui/core';
import { getQuestionById } from '../reducers';
import Answer from './Answer';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

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
  },
  blankLine: {
    flex: 1,
    display: 'block',
    borderBottom: '1px solid black',
    minHeight: '30px',
    paddingTop: '30px'
  },
  fillIn: {
    height: '100px'
  },
  answeredBlankLine: {
    height: 'auto',
    paddingTop: '0px',
    fontSize: '20px'
  }
}));

const PrintableQuestion = ({
  highlightAnswers,
  question,
  index,
  questionsById,
  variation,
  answersById
}) => {
  const classes = useStyles();

  if (!question) {
    return null;
  }

  const canUndo = question.changes && question.changes.length > 0;
  const currentQuestion = canUndo
    ? questionsById[question.changes[question.changes.length - 1]]
    : question;

  const answerComponents = () => {
    if (!variation) {
      return currentQuestion.answers.map((a, idx) => (
        <Answer
          answerId={a}
          key={a}
          label={indexToLetter(idx + 1) + ')'}
          highlightAnswers={highlightAnswers}
        />
      ));
    }

    if (variation === 'fill-in-the-blank') {
      if (highlightAnswers) {
        return (
          <div className={clsx(classes.blankLine, classes.answeredBlankLine)}>
            {currentQuestion.answers
              .filter(a => answersById[a].is_correct)
              .map((a, idx, arry) => (
                <Answer
                  oneLine
                  answerId={a}
                  highlightAnswers
                  key={a}
                  postFix={idx < arry.length - 1 && ','}
                />
              ))}
          </div>
        );
      } else {
        return <div className={classes.blankLine} />;
      }
    }
  };

  return (
    <Card
      className={
        variation === 'fill-in-the-blank'
          ? clsx(classes.card, classes.fillIn)
          : classes.card
      }
    >
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
          {currentQuestion.answers && answerComponents()}
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const question = getQuestionById(state, ownProps.questionId);

  return {
    question,
    questionsById: state.questions.byId,
    answersById: state.answers.byId
  };
};

export default connect(mapStateToProps)(PrintableQuestion);
