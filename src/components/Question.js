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
import { editQuestion } from '../actions';
import Answer from './Answer';

const Question = ({
  question,
  editQuestion,
  category,
  categories,
  types,
  typeText,
  categoriesById
}) => {
  const [versions, setVersions] = useState([]);
  const currentVersion = versions[versions.length - 1];
  const undo = () => setVersions(versions.slice(0, -1));

  const save = () =>
    editQuestion(question.id, currentVersion).then(() => setVersions([]));

    
  const fetchAnotherQuestion = () => {
    console.log('CATEGORIES: ', categories);
    let categoryId;
    if (question.correct_answer){
      categoryId = categories.find(cat => cat.name === question.category).category_id;
    } else {
      categoryId = categoriesById[question.category_id].category_id
    }
    console.log('CATEGORY: ', category);
    console.log('CATEGORY ID: ', categoryId);
    fetchQuestionsFormatted(
      {
        amount: 1,
        category: categoryId,
        // category: categoriesById[question.category_id].category_id,
        type: ['boolean', 'multiple'].find(
          t => typeText.toLowerCase().indexOf(t) !== -1
        ),
        difficulty: question.difficulty
      },
      categories,
      types
    ).then(([q]) => setVersions([...versions, q]));
  }

  if (!question) {
    return null;
  }

  // If question came directly from openTDB query
  if (question.correct_answer) {
    let answers = [...question.incorrect_answers, question.correct_answer];
    console.log('ANSWERS: ', answers)
    return (
      <div>
        <strong>{he.decode(question.question)}</strong>
        <button onClick={fetchAnotherQuestion}>change</button>
        {answers.map(a => (
          <Answer 
            answerText={he.decode(a)} 
            answerId={he.decode(a)} 
            key={`q${he.decode(question.question)}a${he.decode(a)}`} 
          />
        ))}
      </div>
    );
  }

  // If no other versions, use the question from state
  if (!currentVersion || !question) {
    return (
      <div>
        <strong>{he.decode(question.text)}</strong>
        <button onClick={fetchAnotherQuestion}>change</button>
        {question.answers.map(a => (
          <Answer answerId={a} key={`q${question.id}a${a}`} />
        ))}
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
      {currentVersion.answers.map((a, idx) => (
        <div key={`q${question.id}a${idx}`}>- {a.text}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const question = (ownProps.question 
    ? ownProps.question 
    : getQuestionById(state, ownProps.questionId));
  const category = ownProps.category;
  const categories = getAllCategories(state);
  const types = getAllQuestionTypes(state);
  const typeText = (ownProps.question 
    ? ownProps.question.type 
    : getQuestionTypeById(state, question.question_type_id).name );

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
  { editQuestion }
)(Question);
