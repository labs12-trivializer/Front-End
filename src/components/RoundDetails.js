import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class RoundDetails extends Component {
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
      return <div>Loading...</div>;
    }

    const newQuestionCount =
      this.props.round.questions.length - this.props.dbQuestionCount;
    return (
      <div>
        {this.props.dbQuestionCount === 0 && (
          <NewQuestionGetter roundId={this.props.round.id} />
        )}
        {(newQuestionCount > 0 || this.props.round.dirty) && (
          <button
            onClick={() =>
              this.props.editRound(this.props.round.id, this.nestedRound())
            }
          >
            Save Round Changes
          </button>
        )}
        <p>{this.props.round.game_id}</p>
        <p>{this.props.round.created_at}</p>
        <p>{this.props.round.updated_at}</p>
        <ul style={{ width: 400 }}>
          {this.props.round.questions.map((q, idx) => (
            <Question
              round={this.props.round}
              questionId={q}
              key={`q${q}`}
              index={idx}
              moveQuestion={this.moveQuestion}
            />
          ))}
        </ul>
        <CustomQuestionForm roundId={this.props.round.id} />
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
    newRoundQuestions: state.newRoundQuestions
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRound,
    clearNewRoundQuestions,
    editRound,
    dragDropQuestion
  }
)(RoundDetails);
