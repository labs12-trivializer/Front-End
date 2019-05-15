import React from 'react';
import { connect } from 'react-redux';
import he from 'he';

import { getAnswerById } from '../reducers';

const Answer = ({ answer, answerId, label }) => {
  if (!answer && !answerId) {
    return null;
  }

  if (answer.is_correct) {
    return (
      <div>
        <strong>
          {label || '-'} {he.decode(answer.text)}
        </strong>
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

export default connect(mapStateToProps)(Answer);
