import React, { useImperativeHandle, useRef } from 'react';
import { connect } from 'react-redux';
import he from 'he';
import { DragSource, DropTarget } from 'react-dnd';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Icon
} from '@material-ui/core';
import {
  getQuestionById,
  getAllCategories,
  getAllQuestionTypes,
  getQuestionTypeById
} from '../reducers';
import {
  editQuestion,
  deleteQuestion,
  deleteStateQuestion,
  addQuestion,
  changeQuestion,
  undo
} from '../actions';
import Answer from './Answer';
import { makeStyles } from '@material-ui/styles';

const indexToLetter = index => String.fromCharCode(index + 64);

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#DFDFDF',
    width: '100%'
  },
  button: {
    border: '1px solid #FFFFFF',
    paddingLeft: '0',
    paddingRight: '0',
    color: '#03A9F4'
  },
  icon: {
    padding: 0
  }
}));

const Question = React.forwardRef(
  (
    {
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
      connectDragSource,
      connectDropTarget,
      index
    },
    ref
  ) => {
    const classes = useStyles();
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    // const opacity = isDragging ? 0 : 1;
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

    const changePosition = e => {
      const index = roundQuestions.indexOf(question.id);
      let newIndex;
      // Swap question up/down by 1 position
      if (e.target.className.includes('up') && index !== 0) {
        newIndex = index - 1;
      } else if (
        e.target.className.includes('down') &&
        index < roundQuestions.length - 1
      ) {
        newIndex = index + 1;
      }
      return newIndex >= 0 && newIndex < roundQuestions.length
        ? moveQuestion(index, newIndex)
        : null;
    };

    if (!question) {
      return null;
    }

    return (
      <Card className={classes.card} ref={elementRef}>
        <CardContent>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            <strong>{index + 1}.</strong>
            {' ' + he.decode(currentQuestion.text)}
          </Typography>
          {currentQuestion.answers &&
            currentQuestion.answers.map((a, idx) => (
              <Answer
                answerId={a}
                key={a}
                label={indexToLetter(idx + 1) + ')'}
                highlightAnswers
              />
            ))}
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div>
            <Button
              className={classes.button}
              size="small"
              onClick={remove}
            >
              <Icon fontSize="small" className="fas fa-trash-alt" />
            </Button>
            <Button
              className={classes.button}
              size="small"
              onClick={fetchAnotherQuestion}
            >
              <Icon fontSize="small" className="fas fa-exchange-alt" />
            </Button>
            {canUndo && (
              <Button
                className={classes.button}
                size="small"
                onClick={() => undo(question.id)}
              >
                <Icon fontSize="small" className="fas fa-history" />
              </Button>
            )}
          </div>
          <div>
            <Button
              className={classes.button}
              size="small"
              onClick={e => changePosition(e)}
            >
              <Icon fontSize="small" className="up fas fa-chevron-up" />
            </Button>
            <Button
              className={classes.button}
              size="small"
              onClick={e => changePosition(e)}
            >
              <Icon fontSize="small" className="down fas fa-chevron-down" />
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
);

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
    changeQuestion,
    editQuestion,
    deleteQuestion,
    addQuestion,
    deleteStateQuestion,
    undo
  }
)(DragDropQuestion);
