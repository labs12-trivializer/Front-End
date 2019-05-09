import React, { Component } from 'react';
import { connect } from 'react-redux';
import he from 'he';

import { fetchRound, fetchQuestion, fetchQuestions } from '../actions';
import { getAllCategories } from '../reducers';
import CreateRound from './CreateRound';

class RoundDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      allQuestions: {}
    }
  }

  componentDidMount = async () => {
    this.props.fetchRound(this.props.match.params.id);
    let getAllQuestions = await this.props.fetchQuestions();
    console.log('All Questions: ', getAllQuestions);
    if(getAllQuestions.data){
      this.setState({
        allQuestions: getAllQuestions
      })
    }
  }

  render(){
    if (!this.props.round || !this.props.round.game_id){
      return ( <div>Loading...</div> )
    } else if (this.props.round.questions < 1){
      return (
        <div>
          <CreateRound categories={this.props.categories}/>
          <p>{this.props.round.game_id}</p>
          <p>{this.props.round.created_at}</p>
          <p>{this.props.round.updated_at}</p>
          <ul>{this.props.newRoundQuestions.map(q => {
            const question = q;
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

    // console.log('PROPS: ', this.props.round);

    if(!this.state.allQuestions.data){
      return (<div>Loading Questions...</div>)
    }
    // console.log('QUESTIONS: ', this.state.allQuestions)
    let questions = Object.keys(this.state.allQuestions.data.entities.questions).map(key => this.state.allQuestions.data.entities.questions[key])
    // console.log('Array from questions: ', questions);

    return (
      <div>
        <p>{this.props.round.game_id}</p>
        <p>{this.props.round.created_at}</p>
        <p>{this.props.round.updated_at}</p>
        <ul>{questions.filter(q => {
          return this.props.round.id === q.round_id;
        }).map(q => {
          let question = q;
          return (
            <li key={`Question: ${question}`}>
              <strong>{question.text}</strong>
              <div><strong>Answers:</strong></div>
              <ol>
                {/* {question.answers.map(a => {
                  const answer = a;
                  return (
                    <li key={`Answer: ${a}`}>{' - ' + answer.text}</li>
                  )
                })} */}
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
  answersById: state.answers.byId,
  categories: getAllCategories(state),
  newRoundQuestions: state.newRoundQuestions
});

export default connect(
  mapStateToProps,
  { 
    fetchRound,
    fetchQuestion,
    fetchQuestions
  }
)(RoundDetails);
