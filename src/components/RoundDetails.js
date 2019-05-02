import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRound } from '../actions';
// import { Link } from 'react-router-dom';

class RoundDetails extends Component {

  componentDidMount = () => {
    this.props.fetchRound(this.props.match.params.id);
  }

  render(){
    if (!this.props.round || !this.props.round.game_id){
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <p>{this.props.round.game_id}</p>
        <p>{this.props.round.created_at}</p>
        <p>{this.props.round.updated_at}</p>
        <ul>{ this.props.round.questions.map(q => {
          const question = this.props.questionsById[q]
          return (
            <li>
              <strong>{question.text}</strong>
              <strong>Answers:</strong>
              <ol>
                {question.answers.map(a => {
                  const answer = this.props.answersById[a];
                  return (
                    <li>{' - ' + answer.text}</li>
                  )
                })}
              </ol>
            </li>
          )})
        }</ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  round: state.rounds.byId[ownProps.match.params.id],
  questionsById: state.questions.byId,
  answersById: state.answers.byId
});

export default connect(
  mapStateToProps,
  { fetchRound }
)(RoundDetails);
