import React, { useState } from 'react';
import { connect } from 'react-redux';
import he from 'he';
import {
  getQuestionById,
  getAllCategories,
  getAllQuestionTypes,
  getQuestionTypeById
} from '../reducers';
import { fetchQuestionsFormatted } from '../services/opentdb';
import {
  editQuestion,
  deleteQuestion,
  deleteStateQuestion,
  addQuestion
} from '../actions';
import Answer from './Answer';

const Question = ({
  question,
  editQuestion,
  categories,
  types,
  typeText,
  categoriesById,
  deleteQuestion,
  deleteStateQuestion,
  addQuestion
}) => {
  const [versions, setVersions] = useState([]);
  const currentVersion = versions[versions.length - 1];
  const undo = () => setVersions(versions.slice(0, -1));

  const save = () =>
    question.isCustom || question.fromOtdb
      ? addQuestion(currentVersion, question.id)
      : editQuestion(question.id, currentVersion).then(() => setVersions([]));

  const remove = () =>
    question.fromOtdb
      ? deleteStateQuestion(question.id, question.round_id) // question is only in state
      : deleteQuestion(question.id, question.round_id); // question is on our backend
  const fetchAnotherQuestion = () => {
    fetchQuestionsFormatted(
      {
        amount: 1,
        // category: categoryId,
        category: categoriesById[question.category_id].category_id,
        type: ['boolean', 'multiple'].find(
          t => typeText.toLowerCase().indexOf(t) !== -1
        ),
        difficulty: question.difficulty
      },
      categories,
      types
    ).then(([q]) => setVersions([...versions, q]));
  };

  if (!question) {
    return null;
  }

  // If no other versions, use the question from state
  if (!currentVersion) {
    return (
      <div>
        <strong>{he.decode(question.text)}</strong>
        <button onClick={fetchAnotherQuestion}>change</button>
        <button onClick={remove}>
          delete
        </button>
        {question.answers &&
          question.answers.map(a => <Answer answerId={a} key={a} />)}
      </div>
    );
  }

  // Otherwise, use the latest version
  return (
    <div>
      <strong>{he.decode(currentVersion.text)}</strong>
      <button onClick={fetchAnotherQuestion}>change</button>
      <button onClick={undo}>undo</button>
      <button onClick={save}>save</button>
      <button onClick={remove}>delete</button>
      {currentVersion.answers.map((a, idx) => (
        <div key={`q${question.id}a${idx}`}>- {a.text}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const question = getQuestionById(state, ownProps.questionId);
  const category = ownProps.category;
  const categories = getAllCategories(state);
  const types = getAllQuestionTypes(state);
  const typeText = getQuestionTypeById(state, question.question_type_id).name;

  return {
    question,
    category,
    categories,
    types,
    typeText,
    categoriesById: state.categories.byId
  };
};

export default connect(
  mapStateToProps,
  { editQuestion, deleteQuestion, addQuestion, deleteStateQuestion }
)(Question);
