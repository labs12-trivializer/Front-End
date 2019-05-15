import React, { useState } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Steps, Step } from 'react-albus';
import 'react-dropdown/style.css';

import { fetchNewRoundQuestions, addCustomQuestion } from '../actions';
import { getAllCategories, getAllQuestionTypes } from '../reducers';
import {
  QuestionWizard,
  StepForm,
  StepTitle,
  StepBody,
  StepField,
  StepTextInput,
  StepDropdown,
  StepButton,
  StepControls,
  CheckMark,
  StepCheckBox
} from '../styles/customQustionForm.css';

// This component handles adding questions(state change only) to
// the roundId you specify.
// That round will be marked dirty allowing a user to save it.
const CustomQuestionForm = ({
  roundId,
  position,
  categories,
  types,
  addCustomQuestion,
  onCancel,
  onDone
}) => {
  const [errorMsg] = useState(null);
  const categoryOptions = categories.map(c => ({
    value: c.id,
    label: c.name,
    target: 'test'
  }));
  const typeOptions = [
    {
      value: types.find(t => t.name.toLowerCase().indexOf('multiple')).id,
      label: 'multiple choice'
    },
    {
      value: types.find(t => t.name.toLowerCase().indexOf('boolean')).id,
      label: 'true/false'
    }
  ];
  const initialQuestionState = {
    text: '',
    round_id: roundId,
    category_id: categoryOptions[0],
    question_type_id: typeOptions[0],
    difficulty: 'easy'
  };

  const initialAnswerState = {
    is_correct: false,
    text: ''
  };

  const [fields, setFields] = useState(initialQuestionState);
  const [question, setQuestion] = useState(null);
  const [answerFields, setAnswerFields] = useState(initialAnswerState);
  const [answers, setAnswers] = useState([]);
  const handleChanges = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });
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
    setAnswerFields(initialAnswerState);
  };

  const reset = () => {
    setAnswerFields(initialAnswerState);
    setAnswers([]);
    setFields(initialQuestionState);
    setQuestion(null);
  };

  // onFinish, turn our questions and answers into
  // what looks like a normalized server response
  // then clear our fields
  const onFinish = () => {
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
          category_id: question.category_id.value,
          question_type_id: question.question_type_id.value,
          answers: answers.map(a => a.id)
        }
      }
    };
    const result = question.id;
    addCustomQuestion({ entities, result }, question.round_id);
    reset();
    onDone();
  };

  return (
    <QuestionWizard>
      <Steps>
        <Step
          id="question"
          render={({ next, push }) => (
            <StepForm
              onSubmit={e => {
                onQuestionSubmit(e);
                next();
              }}
            >
              <StepTitle>Step 1: Create Question</StepTitle>
              {errorMsg && <div>{errorMsg}</div>}
              <StepBody>
                <StepTextInput
                  onChange={handleChanges}
                  type="text"
                  name="text"
                  value={fields.text}
                  autoComplete="off"
                  placeholder="Question Text..."
                />
                <StepDropdown
                  options={categoryOptions}
                  onChange={c => setFields({ ...fields, category_id: c })}
                  value={fields.category_id}
                  placeholder="Pick something!"
                />
                <StepDropdown
                  options={['easy', 'medium', 'hard']}
                  onChange={d => setFields({ ...fields, difficulty: d })}
                  value={fields.difficulty}
                />
                <StepDropdown
                  options={typeOptions}
                  onChange={t => setFields({ ...fields, question_type_id: t })}
                  value={fields.question_type_id}
                />

                <StepControls>
                  <StepButton type="button" secondary onClick={() => {
                    reset();
                    push('question');
                    onCancel && onCancel();
                  }}>
                    Cancel
                  </StepButton>
                  <StepButton type="submit">Next</StepButton>
                </StepControls>
              </StepBody>
            </StepForm>
          )}
        />
        <Step
          id="answers"
          render={({ previous, push }) => (
            <>
              <StepForm onSubmit={onAnswerSubmit}>
                <StepTitle>Step 2: Create Answers</StepTitle>
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
                <StepBody>
                  <StepField>
                    <StepTextInput
                      onChange={handleAnswerChanges}
                      type="text"
                      name="text"
                      value={answerFields.text}
                      autoComplete="off"
                      placeholder="Answer Text"
                    />
                  </StepField>
                  <StepField>
                    <StepCheckBox>
                      Answer is Correct
                      <input
                        type="checkbox"
                        name="is_correct"
                        checked={answerFields.is_correct}
                        onChange={handleAnswerChanges}
                      />
                      <CheckMark />
                    </StepCheckBox>
                  </StepField>
                  <StepControls>
                    <StepButton type="submit">Add Answer</StepButton>
                  </StepControls>
                  <StepControls>
                    <StepButton onClick={previous} secondary type="button">
                      Back
                    </StepButton>
                    <StepButton
                      onClick={e => {
                        onFinish(e);
                        push('question');
                      }}
                      type="button"
                    >
                      finish
                    </StepButton>
                  </StepControls>
                </StepBody>
              </StepForm>
            </>
          )}
        />
      </Steps>
    </QuestionWizard>
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
