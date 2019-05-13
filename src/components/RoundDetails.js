import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRound, clearNewRoundQuestions, editRound } from '../actions';
import { getAllCategories, getQuestionById, getRoundById } from '../reducers';
import Question from './Question';
// import { Link } from 'react-router-dom';

import NewQuestionGetter from './NewQuestionGetter';
import CustomQuestionForm from './CustomQuestionForm';

class RoundDetails extends Component {
  componentDidMount = () => {
    // fetch only if we don't have it
    if (!this.props.round) {
      this.props.fetchRound(this.props.match.params.id);
    }
  };

  // componentWillUnmount = () => {
  //   // Dispatch action to remove 'newRoundQuestions' from Redux store
  //   this.props.clearNewRoundQuestions();
  // };

  // Rebuild a nested object for a round, lose properties
  // that the backend doesn't like (can probably be fixed with Joi)
  nestedRound() {
    const { round, questionsById, answersById } = this.props;

    return {
      ...round,
      questions: round.questions.map(q => {
        const {
          fromOtdb: omit1,
          id: omit2,
          isCustom: omit3,
          ...question
        } = questionsById[q];
        return {
          ...question,
          answers: question.answers
            ? question.answers.map(a => {
                const {
                  fromOtdb: omit1,
                  id: omit2,
                  isCustom: omit3,
                  ...answer
                } = answersById[a];
                return answer;
              })
            : []
        };
      })
    };
  }

  render() {
    if (!this.props.round || !this.props.round.game_id) {
      return <div>Loading...</div>;
    }

    const newQuestionCount =
      this.props.round.questions.length - this.props.dbQuestionCount;
    // if (this.props.round.questions < 1) {
    //   return (
    //     <div>
    //       <NewQuestionGetter roundId={this.props.round.id} />
    //       <p>{this.props.round.game_id}</p>
    //       <p>{this.props.round.created_at}</p>
    //       <p>{this.props.round.updated_at}</p>
    //       <ul>
    //         {this.props.newRoundQuestions.map(q => (
    //           <Question questionId={q} key={q} />
    //         ))}
    //       </ul>
    //     </div>
    //   );
    // }

    // console.log('QUESTIONS', this.props.round.questions);
    return (
      <div>
        {this.props.dbQuestionCount === 0 && (
          <NewQuestionGetter roundId={this.props.round.id} />
        )}
        {newQuestionCount > 0 && (
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
        <ul>
          {this.props.round.questions.map(q => (
            <Question questionId={q} key={`q${q}`} />
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
    return !thisQuestion.fromOtdb && !thisQuestion.isCustom;
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
    editRound
  }
)(RoundDetails);
