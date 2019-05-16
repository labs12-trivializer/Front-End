import React, { useState } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Steps, Step } from 'react-albus';
import 'react-dropdown/style.css';

import { fetchNewRoundQuestions, addCustomQuestion } from '../actions';
import {
  QuestionWizard,
  StepForm,
  StepTitle,
  StepBody,
  StepField,
  StepTextInput,
  CheckMark,
  StepCheckBox
} from '../styles/customQustionForm.css';
import { ButtonRow, Button } from '../styles/shared.css';
import CategorySelect from './CategorySelect';
import TypeSelect from './TypeSelect';
import DifficultySelect from './DifficultySelect';

// This component handles adding questions(state change only) to
// the roundId you specify.
// That round will be marked dirty allowing a user to save it.
const CustomQuestionForm = ({
  roundId,
  position,
  addCustomQuestion,
  onCancel,
  onDone
}) => {
  const [errorMsg] = useState(null);
  const initialQuestionState = {
    text: '',
    round_id: roundId
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
                <CategorySelect onChange={handleChanges} placeholder="Select a Category..."/>
                <DifficultySelect onChange={handleChanges} />
                <TypeSelect onChange={handleChanges} placeholder="Select a Question Type..."/>
                <ButtonRow>
                  <Button type="button" secondary onClick={() => {
                    reset();
                    push('question');
                    onCancel && onCancel();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Next</Button>
                </ButtonRow>
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
                  <ButtonRow>
                    <Button type="submit">Add Answer</Button>
                  </ButtonRow>
                  <ButtonRow>
                    <Button onClick={previous} secondary type="button">
                      Back
                    </Button>
                    <Button
                      onClick={e => {
                        onFinish(e);
                        push('question');
                      }}
                      type="button"
                    >
                      Finish
                    </Button>
                  </ButtonRow>
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
  questionLimit: state.profile.question_limit,
  tierName: state.profile.tier_name
});

export default connect(
  mapStateToProps,
  { fetchNewRoundQuestions, addCustomQuestion }
)(CustomQuestionForm);
