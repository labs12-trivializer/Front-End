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
  Tooltip
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
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import UndoIcon from '@material-ui/icons/Undo';
import DragIcon from '@material-ui/icons/DragIndicator';

const indexToLetter = index => String.fromCharCode(index + 64);

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  dragIcon: {
    cursor: 'move',
    position: 'absolute',
    left: 0,
    top: 13,
    color: theme.palette.text.secondary,
    fontSize: 35
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%'
  },
  cardContent: {
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    margin: theme.spacing(1)
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

    const changePosition = direction => {
      const index = roundQuestions.indexOf(question.id);
      let newIndex;
      // Swap question up/down by 1 position
      if (direction === 'up' && index !== 0) {
        newIndex = index - 1;
      } else if (direction === 'down' && index < roundQuestions.length - 1) {
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
        <DragIcon className={classes.dragIcon} />
        <CardContent className={classes.cardContent}>
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
            <Tooltip title="Delete" aria-label="Delete">
              <Button
                className={classes.button}
                size="small"
                onClick={remove}
                variant="contained"
                color="default"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Shuffle" aria-label="shuffle">
              <Button
                variant="contained"
                className={classes.button}
                size="small"
                onClick={fetchAnotherQuestion}
              >
                <ShuffleIcon />
              </Button>
            </Tooltip>
            {canUndo && (
              <Tooltip title="Undo" aria-label="Undo">
                <Button
                  variant="contained"
                  className={classes.button}
                  size="small"
                  onClick={() => undo(question.id)}
                >
                  <UndoIcon />
                </Button>
              </Tooltip>
            )}
          </div>
          <div>
            <Tooltip title="Move Up" aria-label="Move Up">
              <Button
                variant="contained"
                className={classes.button}
                size="small"
                onClick={() => changePosition('up')}
              >
                <ArrowUpwardIcon className="up" />
              </Button>
            </Tooltip>
            <Tooltip title="Move Down" aria-label="Move Down">
              <Button
                variant="contained"
                className={classes.button}
                size="small"
                onClick={() => changePosition('down')}
              >
                <ArrowDownwardIcon />
              </Button>
            </Tooltip>
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
