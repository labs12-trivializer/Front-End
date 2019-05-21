import React from 'react';
import { connect } from 'react-redux';
import he from 'he';

import { getAnswerById } from '../reducers';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';

const styles = () => ({
  rightAnswer: {
    fontWeight: 800
  }
});

const Answer = ({ answer, answerId, label, classes, highlightAnswers }) => {
  if (!answer && !answerId) {
    return null;
  }

  if (answer.is_correct && highlightAnswers) {
    return (
      <div className={classes.rightAnswer}>
        {label || '-'} {he.decode(answer.text)}
      </div>
    );
  }

  return (
    <div>
      {label || '-'} {he.decode(answer.text)}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  answer: getAnswerById(state, ownProps.answerId)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(Answer);
