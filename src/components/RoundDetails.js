import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRound } from '../actions';
import { getAllCategories } from '../reducers';
import Question from './Question';
// import { Link } from 'react-router-dom';

import CreateRound from './CreateRound';
class RoundDetails extends Component {
  componentDidMount = () => {
    // fetch only if we don't have it
    if (!this.props.round) {
      this.props.fetchRound(this.props.match.params.id);
    }
  };

  render() {
    if (!this.props.round || !this.props.round.game_id) {
      return <div>Loading...</div>;
    } else if (this.props.round.questions < 1) {
      return <CreateRound categories={this.props.categories} />;
    }

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
{
  /* <div> */
}
{
  /*   <strong>Answers:</strong> */
}
{
  /* </div> */
}
{
  /* <ol> */
}
{
  /*   {question.answers.map(a => { */
}
{
  /*     const answer = this.props.answersById[a]; */
}
{
  /*     return <li key={`Answer: ${a}`}>{' - ' + answer.text}</li>; */
}
{
  /*   })} */
}
{
  /* </ol> */
}

const mapStateToProps = (state, ownProps) => ({
  round: state.rounds.byId[ownProps.match.params.id],
  questionsById: state.questions.byId,
  answersById: state.answers.byId,
  categories: getAllCategories(state)
});

export default connect(
  mapStateToProps,
  { fetchRound }
)(RoundDetails);
