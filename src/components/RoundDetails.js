import React, { Component } from 'react';
import { connect } from 'react-redux';
import he from 'he';

import { fetchRound } from '../actions';
import { getAllCategories } from '../reducers';
// import { Link } from 'react-router-dom';

import CreateRound from './CreateRound';
class RoundDetails extends Component {

  componentDidMount = () => {
    this.props.fetchRound(this.props.match.params.id);
    console.log('Props: ', this.props)
  }

  render(){
    if (!this.props.round || !this.props.round.game_id){
      return (
        <div>Loading...</div>
      )
    } 
    // else if (this.props.round.questions < 1){
    //   console.log('Props: ', this.props)
    //   return (<CreateRound categories={this.props.categories}/>)
    // }

    return (
      <div>
        <CreateRound categories={this.props.categories}/>
        <p>{this.props.round.game_id}</p>
        <p>{this.props.round.created_at}</p>
        <p>{this.props.round.updated_at}</p>
        <ul>{this.props.newRoundQuestions.map(q => {
          const question = q;
          // const decoder = new TextDecoder('utf-8');
          return (
            <li key={q.question}>
              <p>{question.category}</p>
              <strong>{he.decode(question.question)}</strong>
              <div><strong>Wrong Answers:</strong></div>
              <ol>
                {question.incorrect_answers.map(a => {
                  const answer = he.decode(a)
                  return (
                    <li key={answer}>{' - ' + answer}</li>
                    )
                  })}
              </ol>
              <div><strong>Correct Answers:</strong></div>
              <p>{` - ${he.decode(question.correct_answer)}`}</p>
            </li>
          )
        })}</ul>
      </div>
    )
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
  { fetchRound }
)(RoundDetails);
