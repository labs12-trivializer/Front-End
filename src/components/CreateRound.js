import React, { Component } from "react";
import { connect } from 'react-redux';

import { fetchNewRoundQuestions } from '../actions';
import { getNewRoundQuestions } from '../reducers';
// import ReturnedQuestions from "./ReturnedQuestions";

class CreateRound extends Component {
  state = {
    category: "any",
    amount: 0,
    difficulty: "any",
    type: "any",
    response: {}
  };

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  queryTriviaDb = () => {

    this.props.fetchNewRoundQuestions(this.state);

  //   const queryString = `https://opentdb.com/api.php?amount=${
  //     this.state.amount
  //   }${
  //     this.state.category === "any" ? "" : `&category=${this.state.category}`
  //   }${
  //     this.state.difficulty === "any"
  //       ? ""
  //       : `&difficulty=${this.state.difficulty}`
  //   }${this.state.type === "any" ? "" : `&type=${this.state.type}`}`;
  //   axios
  //     .get(queryString)
  //     .then(res => this.setState({ response: res.data.results }))
  //     .catch(err => console.log(err));
  };

  render() {
    if (this.props.categories.length < 1) {
      console.log('PROPS: ', this.props);
      return (
        <div>
          <h5>loading...</h5>
        </div>
      );
    }
    return (
      //form for specifying question parameters
      <>
        <input
          onChange={e => this.handleChanges(e)}
          type="number"
          name="amount"
          min="1"
          max="50"
        />
        <select name="category" onChange={e => this.handleChanges(e)}>
          <option value="any">Any Category</option>
          {this.props.categories.map(c => (
            <option value={c.category_id} key={`category${c.id}`}>
              {c.name}
            </option>
          ))}
        </select>
        <select name="difficulty" onChange={e => this.handleChanges(e)}>
          <option value="any">Any Difficulty</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <select name="type" onChange={e => this.handleChanges(e)}>
          <option value="any">Any Type</option>
          <option value="boolean">true/false</option>
          <option value="multiple">multiple choice</option>
        </select>
        <button onClick={() => this.queryTriviaDb(this.props.round_id)}>
          Get Questions
        </button>
        {/* <ReturnedQuestions questions={this.state.response} /> */}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  newRoundQuestions: getNewRoundQuestions(state)
});

export default connect(
  mapStateToProps,
  {
    fetchNewRoundQuestions
  }
)(CreateRound);