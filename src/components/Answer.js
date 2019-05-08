import React from 'react';
import { connect } from 'react-redux';
import { getAnswerById } from '../reducers';

const Answer = ({ answer }) => {
  if (!answer) {
    return null;
  }

  return <div>- {answer.text}</div>;
};

const mapStateToProps = (state, ownProps) => ({
  answer: getAnswerById(state, ownProps.answerId)
});

export default connect(mapStateToProps)(Answer);
