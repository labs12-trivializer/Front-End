import React, { Component } from 'react';
import { connect } from 'react-redux';
// import he from 'he';

import { fetchRound, clearNewRoundQuestions } from '../actions';
import { getAllCategories } from '../reducers';
import Question from './Question';
// import { Link } from 'react-router-dom';

import CreateRound from './CreateRound';

class RoundDetails extends Component {
  componentDidMount = () => {
    // fetch only if we don't have it
    // if (!this.props.round) {
    // }
    this.props.fetchRound(this.props.match.params.id);
  };

  componentWillUnmount = () => {
    // Dispatch action to remove 'newRoundQuestions' from Redux store
    this.props.clearNewRoundQuestions();
  };

  render() {
    if (!this.props.round || !this.props.round.game_id) {
      return <div>Loading...</div>;
    } else if (this.props.round.questions < 1) {
      return (
        <div>
          <CreateRound categories={this.props.categories} />;
          <p>{this.props.round.game_id}</p>
          <p>{this.props.round.created_at}</p>
          <p>{this.props.round.updated_at}</p>
          <ul>
            {this.props.newRoundQuestions.map(q => (
              <Question questionId={q} key={q} />
            ))}
          </ul>
        </div>
      );
    }

    // console.log('QUESTIONS', this.props.round.questions);
    return (
      <div>
        <p>{this.props.round.game_id}</p>
        <p>{this.props.round.created_at}</p>
        <p>{this.props.round.updated_at}</p>
        <ul>
          {this.props.round.questions.map(q => (
            <Question questionId={q} key={`q${q}`} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  round: state.rounds.byId[ownProps.match.params.id],
  questionsById: state.questions.byId,
  answersById: state.answers.byId,
  categories: getAllCategories(state),
  newRoundQuestions: state.newRoundQuestions
});

export default connect(
  mapStateToProps,
  {
    fetchRound,
    clearNewRoundQuestions
    // fetchQuestion,
    // fetchQuestions
  }
)(RoundDetails);
