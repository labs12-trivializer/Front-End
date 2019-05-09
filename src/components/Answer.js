import React from 'react';
import { connect } from 'react-redux';
import he from 'he';

import { getAnswerById } from '../reducers';

const Answer = ({ answer, answerText }) => {
  if (!answer && !answerText) {
    return null;
  }

  // Use 'answerText' for questions from openTDB
  return answerText
    ? <div>- {he.decode(answerText)}</div>
    : <div>- {he.decode(answer.text)}</div>
};

const mapStateToProps = (state, ownProps) => ({
  answer: getAnswerById(state, ownProps.answerId),
  answerText: ownProps.answerText
});

export default connect(mapStateToProps)(Answer);
