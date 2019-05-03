import React from 'react';

const ReturnedQuestions = props => {
  if (props.questions.length < 1) {
    return (
      <div>
        <h4>Click button to generate questions</h4>
      </div>
    );
  } else {
    return (
      <div>
        {props.questions.map((q, index) => {
          return (
            <div key={index}>
              <h5>{q.question}</h5>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ReturnedQuestions;
