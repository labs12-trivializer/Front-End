import React, { useImperativeHandle, useRef } from 'react';
import { connect } from 'react-redux';
import he from 'he';
import { DragSource, DropTarget } from 'react-dnd';
import {
  getQuestionById,
  getAllCategories,
  getAllQuestionTypes,
  getQuestionTypeById
} from '../reducers';
import {
  // moveQuestion,
  editQuestion,
  deleteQuestion,
  deleteStateQuestion,
  addQuestion,
  changeQuestion,
  undo
} from '../actions';
import Answer from './Answer';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const Question = React.forwardRef(
  (
    {
      round,
      moveQuestion,
      question,
      roundQuestions,
      categories,
      types,
      typeText,
      categoriesById,
      deleteQuestion,
      deleteStateQuestion,
      changeQuestion,
      questionsById,
      undo,
      isDragging,
      connectDragSource,
      connectDropTarget
    },
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({ getNode: () => elementRef.current }));
    const canUndo = question.changes && question.changes.length > 0;
    const currentQuestion = canUndo
      ? questionsById[question.changes[question.changes.length - 1]]
      : question;

    const remove = () =>
      question.fromOtdb || question.isCustom
        ? deleteStateQuestion(question.id, question.round_id) // question is only in state
        : deleteQuestion(question.id, question.round_id); // question is on our backend

    const fetchAnotherQuestion = () => {
      changeQuestion(
        {
          amount: 1,
          category: categoriesById[question.category_id].category_id,
          type: ['boolean', 'multiple'].find(
            t => typeText.toLowerCase().indexOf(t) !== -1
          ),
          difficulty: question.difficulty
        },
        categories,
        types,
        question
      );
    };

    const changePosition = (e) => {
      const index = roundQuestions.indexOf(question.id);
      let newIndex;
      // Swap question up/down by 1 position
      if (e.target.innerText === 'Move Up' && index !== 0) {
        newIndex = index - 1;
      } else if (e.target.innerText === 'Move Down' && index < roundQuestions.length - 1) {
        newIndex = index + 1;
      }
      return newIndex >= 0 && newIndex < roundQuestions.length
        ? moveQuestion(index, newIndex)
        : null;
    }

    if (!question) {
      return null;
    }

    return (
      <div ref={elementRef} style={{...style, opacity }}>
        <strong>{he.decode(currentQuestion.text)}</strong>
        <button onClick={fetchAnotherQuestion}>change</button>
        {canUndo && <button onClick={() => undo(question.id)}>undo</button>}
        <button onClick={remove}>delete</button>
        {currentQuestion.answers &&
          currentQuestion.answers.map(a => <Answer answerId={a} key={a} />)}
        <div>
          <button onClick={e => changePosition(e)}>Move Up</button>
          <button onClick={e => changePosition(e)}>Move Down</button>
        </div>
      </div>
    );
  }
);

const mapStateToProps = (state, ownProps) => {
  const question = getQuestionById(state, ownProps.questionId);
  const categories = getAllCategories(state);
  const types = getAllQuestionTypes(state);
  const typeText = getQuestionTypeById(state, question.question_type_id).name;

  return {
    question,
    categories,
    types,
    typeText,
    categoriesById: state.categories.byId,
    questionsById: state.questions.byId,
    roundQuestions: state.rounds.byId[ownProps.round.id].questions
  };
};

const DragDropQuestion = DropTarget(
  'question',
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveQuestion(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    'question',
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Question)
);

export default connect(
  mapStateToProps,
  {
    // moveQuestion,
    changeQuestion,
    editQuestion,
    deleteQuestion,
    addQuestion,
    deleteStateQuestion,
    undo
  }
)(DragDropQuestion);
