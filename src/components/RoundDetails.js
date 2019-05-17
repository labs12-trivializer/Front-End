import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import {
  fetchRound,
  clearNewRoundQuestions,
  editRound,
  dragDropQuestion
} from '../actions';
import { getAllCategories, getQuestionById, getRoundById } from '../reducers';
import Question from './Question';

import NewQuestionGetter from './NewQuestionGetter';
import CustomQuestionForm from './CustomQuestionForm';
import Modal from './Modal';

import { Background, Button } from '../styles/shared.css';
import {
  RoundContainer,
  RoundInfo,
  SaveChanges,
  NoChanges,
  ListContainer,
  LoadingContainer
  // AddCustomQuestion
} from '../styles/round.css';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing.unit
  },
  cardContent: {
    minHeight: '20rem'
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
    if (!this.props.round || !this.props.round.game_id) {
      return (
        <LoadingContainer>
          <Background />
          <Loader
            type="Ball-Triangle"
            color="#FFFFFF"
            height="100"
            width="100"
          />
        </LoadingContainer>
      );
    }

    console.log('ROUND INFO: ', this.props.round);

    const newQuestionCount =
      this.props.round.questions.length - this.props.dbQuestionCount;

    const { round, classes } = this.props;
    return (
      <RoundContainer>
        <Background />
        <Typography
          component="h1"
          variant="h1"
          className={classes.title}
          color="inherit"
          gutterBottom
        >
          {`Round ${round.number}`}
        </Typography>
        <RoundInfo>
          <div>
            <p>{`ROUND ${this.props.round.number}`}</p>
          </div>
          <div>
            <p>Created On: {this.props.round.created_at}</p>
            <p>Last Updated: {this.props.round.updated_at}</p>
          </div>
        </RoundInfo>
        {newQuestionCount > 0 || this.props.round.dirty ? (
          <SaveChanges
            warning
            onClick={() =>
              this.props.editRound(this.props.round.id, this.nestedRound())
            }
          >
            Save Changes
          </SaveChanges>
        ) : (
          <NoChanges>Can't Touch This</NoChanges>
        )}
        {newQuestionCount === 0 && this.props.dbQuestionCount === 0 && (
          <NewQuestionGetter roundId={this.props.round.id} />
        )}
        <ListContainer>
          {this.props.round.questions.map((q, idx) => (
            <Question
              round={this.props.round}
              questionId={q}
              key={`q${q}`}
              index={idx}
              moveQuestion={this.moveQuestion}
            />
          ))}
        </ListContainer>
        <Button onClick={() => this.setState({ modalShowing: true })}>
          Add Custom Question
        </Button>
        {this.state.modalShowing && (
          <Modal onClose={() => this.setState({ modalShowing: false })}>
            <CustomQuestionForm
              roundId={this.props.round.id}
              onCancel={() => this.setState({ modalShowing: false })}
              onDone={() => this.setState({ modalShowing: false })}
            />
          </Modal>
        )}
      </RoundContainer>
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
    newRoundQuestions: state.newRoundQuestions
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    {
      fetchRound,
      clearNewRoundQuestions,
      editRound,
      dragDropQuestion
    }
  )(RoundDetails)
);
