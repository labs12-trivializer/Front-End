import React from 'react';
import { connect } from 'react-redux';
import he from 'he';

import { getAnswerById } from '../reducers';

const Answer = ({ answer, answerId }) => {
  if (!answer && !answerId) {
    console.log('NULL!!');
    return null;
  }

  if (!answer) {
    return <div>- {he.decode(answerId.text)}</div>;
  }

  return <div>- {he.decode(answer.text)}</div>;

};

const mapStateToProps = (state, ownProps) => ({
  answer: getAnswerById(state, ownProps.answerId)
});

export default connect(mapStateToProps)(Answer);
