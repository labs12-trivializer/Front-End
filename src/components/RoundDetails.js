import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Loader from 'react-loader-spinner';

import {
  fetchRound,
  clearNewRoundQuestions,
  editRound,
  dragDropQuestion
} from '../actions';
import {
  getAllCategories,
  getQuestionById,
  getRoundById,
  getGameById
} from '../reducers';
import Question from './Question';

import {
  withStyles,
  Typography,
  withWidth,
  Grid,
  Paper,
  Button,
  Card,
  CardActionArea,
  CardContent
} from '@material-ui/core';
import { compose } from 'redux';
import AddQuestionCard from './AddQuestionsCard';
import PrintRoundButton from './PrintRoundButton';

const styles = theme => ({
  card: {
    minHeight: 200,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: theme.spacing(3),
    boxShadow: theme.shadows[5],
    transition: 'box-shadow 0.3s ease-in-out !important',
    '&:hover': {
      backgroundColor: '#FFF',
      boxShadow: theme.shadows[20]
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& button': {
      margin: [[theme.spacing(1), 0, theme.spacing(1)]]
    }
  },
  button: {
    margin: [[theme.spacing(1), 0]]
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1
  },
  cardContent: {
    minHeight: 200
  },
  icon: {
    color: theme.palette.grey[400],
    fontSize: 40
  },
  pos: {
    marginBottom: 12
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardRow: {
    display: 'flex'
  },
  nothing: {
    flex: 1,
    margin: '0.5rem',
    visiblity: 'hidden'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  },
  fullCardAction: {
    display: 'flex',
    flex: 1
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});

class RoundDetails extends Component {
  state = { modalShowing: false };

  componentDidMount = () => {
    // fetch only if we don't have it
    if (!this.props.round) {
      this.props.fetchRound(this.props.match.params.id);
    }
  };

  // Rebuild a nested object for a round, lose properties
  // that the backend doesn't like (can probably be fixed with Joi)
  nestedRound = () => {
    const {
      round: { dirty: omit, ...round },
      questionsById,
      answersById
    } = this.props;

    return {
      ...round,
      questions: round.questions.map((q, idx) => {
        // have to check if the original question had changes
        // if so, we save use the last change instead
        const { changes, ...originalQuestion } = questionsById[q];
        const {
          fromOtdb: omit1,
          id: omit2,
          isCustom: omit3,
          changes: omit4,
          ...question
        } =
          changes && changes.length > 0
            ? questionsById[changes[changes.length - 1]]
            : originalQuestion;

        return {
          ...question,
          position: idx,
          answers: question.answers
            ? question.answers.map((a, idx) => {
                const {
                  fromOtdb: omit1,
                  id: omit2,
                  isCustom: omit3,
                  ...answer
                } = answersById[a];
                answer.position = idx;
                return answer;
              })
            : []
        };
      })
    };
  };

  // call back for when a dragged question hovers another question
  // questions are both drag targets and drop targets
  moveQuestion = (dragIndex, hoverIndex) => {
    this.props.dragDropQuestion(this.props.round.id, dragIndex, hoverIndex);
  };

  render() {
    const { round, questionLimit, classes, game } = this.props;
    const { questions } = round;
    if (!this.props.round || !this.props.round.game_id) {
      return <div>Loading...</div>;
    }

    const newQuestionCount =
      this.props.round.questions.length - this.props.dbQuestionCount;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container className={classes.header}>
                <Grid item xs={8} className={classes.headerText}>
                  <Typography component="h3" variant="h6">
                    {game.name}
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                  >
                    Round {round.number}
                  </Typography>
                </Grid>
                <Grid item xs={4} className={classes.buttonContainer}>
                  <PrintRoundButton
                    roundId={round.id}
                    className={classes.button}
                  />
                  <PrintRoundButton
                    roundId={round.id}
                    highlightAnswers
                    label="Generate Answer Sheet"
                    className={classes.button}
                  />
                </Grid>
              </Grid>
              {(newQuestionCount > 0 || round.dirty) && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() =>
                    this.props.editRound(
                      this.props.round.id,
                      this.nestedRound()
                    )
                  }
                >
                  Save Changes
                </Button>
              )}
              {questions.map((q, idx) => (
                <Question
                  round={this.props.round}
                  questionId={q}
                  key={`q${q}`}
                  index={idx}
                  moveQuestion={this.moveQuestion}
                  highlightAnswers
                />
              ))}

              {round.questions.length >= questionLimit ? (
                <Card className={classes.card}>
                  <CardActionArea
                    component={Link}
                    className={classes.fullCardAction}
                    to="/billing"
                  >
                    <CardContent>
                      <Typography
                        component="h2"
                        variant="h6"
                        color="textSecondary"
                      >
                        Upgrade for more questions
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                <AddQuestionCard
                  roundId={round.id}
                  position={questions.length + 1}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const round = getRoundById(state, ownProps.match.params.id);
  const dbQuestionCount = round.questions.filter(q => {
    const thisQuestion = getQuestionById(state, q);
    return (
      !thisQuestion.fromOtdb &&
      !thisQuestion.isCustom &&
      !(thisQuestion.changes && thisQuestion.changes.length > 0)
    );
  }).length;
  return {
    round,
    dbQuestionCount,
    questionsById: state.questions.byId,
    answersById: state.answers.byId,
    categories: getAllCategories(state),
    newRoundQuestions: state.newRoundQuestions,
    questionLimit: state.profile.question_limit,
    game: getGameById(state, round.game_id)
  };
};

// use compose with with withStyles applied last
export default compose(
  connect(
    mapStateToProps,
    {
      fetchRound,
      clearNewRoundQuestions,
      editRound,
      dragDropQuestion
    }
  ),
  withWidth(),
  withStyles(styles, { withTheme: true })
)(RoundDetails);
