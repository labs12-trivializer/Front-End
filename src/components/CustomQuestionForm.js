import React, { useState } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Wizard, Steps, Step } from 'react-albus';

import { fetchNewRoundQuestions, addCustomQuestion } from '../actions';
import { getAllCategories, getAllQuestionTypes } from '../reducers';

// This Component's one job is to dispatch fetchNewRoundQuestions
const CustomQuestionForm = ({
  roundId,
  position,
  categories,
  types,
  addCustomQuestion
}) => {
  const [errorMsg] = useState(null);
  const [fields, setFields] = useState({
    category_id: categories[0].id,
    question_type_id: types[0].id,
    text: '',
    round_id: roundId
  });
  const [question, setQuestion] = useState(null);
  const [answerFields, setAnswerFields] = useState({
    is_correct: false,
    text: ''
  });
  const [answers, setAnswers] = useState([]);
  const handleChanges = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleAnswerChanges = e => {
    setAnswerFields({
      ...answerFields,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };
  const onQuestionSubmit = e => {
    e.preventDefault();
    setQuestion({
      ...fields,
      position,
      isCustom: true,
      id: shortid.generate(),
      round_id: roundId
    });
  };

  const onAnswerSubmit = e => {
    e.preventDefault();
    const answer = {
      ...answerFields,
      id: shortid.generate(),
      question_id: question.id
    };
    setAnswers([...answers, answer]);
    setAnswerFields({
      is_correct: false,
      text: ''
    });
  };

  // onFinish, turn our questions nad answers into
  // what looks like a normalized server response
  // then clear our fields
  const onFinish = e => {
    const entities = {
      answers: answers.reduce(
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
    setAnswerFields({ is_correct: false, text: '' });
    setAnswers([]);
    setFields({
      category_id: categories[0].id,
      question_type_id: types[0].id,
      text: '',
      round_id: roundId
    });
    setQuestion(null);
  };

  return (
    <>
      <Wizard>
        <Steps>
          <Step
            id="question"
            render={({ next }) => (
              <form
                onSubmit={e => {
                  onQuestionSubmit(e);
                  next();
                }}
              >
                {errorMsg && <div>{errorMsg}</div>}
                Question Text:
                <input
                  onChange={handleChanges}
                  type="text"
                  name="text"
                  value={fields.text}
                  autoComplete="off"
                />
                <select
                  name="category_id"
                  onChange={handleChanges}
                  value={fields.category_id}
                >
                  {categories.map(c => (
                    <option value={c.id} key={`c${c.id}`}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  name="difficulty"
                  onChange={handleChanges}
                  value={fields.difficulty}
                >
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
                <select
                  name="question_type_id"
                  onChange={handleChanges}
                  value={fields.question_type_id}
                >
                  <option
                    value={
                      types.find(t => t.name.toLowerCase().indexOf('multiple'))
                        .id
                    }
                  >
                    multiple choice
                  </option>
                  <option
                    value={
                      types.find(t => t.name.toLowerCase().indexOf('boolean'))
                        .id
                    }
                  >
                    true/false
                  </option>
                </select>
                <button type="submit">Add Question</button>
              </form>
            )}
          />
          <Step
            id="answers"
            render={({ previous, push }) => (
              <>
                <form onSubmit={onAnswerSubmit}>
                  {question && <div>{question.text}</div>}
                  {answers &&
                    answers.map((a, idx) => (
                      <div key={a.id}>
                        {a.text}
                        <button
                          onClick={() =>
                            setAnswers([
                              ...answers.slice(0, idx),
                              ...answers.slice(idx + 1)
                            ])
                          }
                        >
                          delete
                        </button>
                      </div>
                    ))}
                  Answer Text:
                  <input
                    onChange={handleAnswerChanges}
                    type="text"
                    name="text"
                    value={answerFields.text}
                    autoComplete="off"
                  />
                  Correct?
                  <input
                    name="is_correct"
                    type="checkbox"
                    checked={answerFields.is_correct}
                    onChange={handleAnswerChanges}
                  />
                  <button type="submit">Add Answer</button>
                </form>
                <button onClick={previous}>back to question</button>
                <button onClick={(e) => {
                  onFinish(e);
                  push("question");
                }}>finish</button>
              </>
            )}
          />
        </Steps>
      </Wizard>
    </>
  );
};

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  types: getAllQuestionTypes(state),
  questionLimit: state.profile.question_limit,
  tierName: state.profile.tier_name
});

export default connect(
  mapStateToProps,
  { fetchNewRoundQuestions, addCustomQuestion }
)(CustomQuestionForm);
