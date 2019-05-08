import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchNewRoundQuestions } from "../actions";
import { getNewRoundQuestions } from "../reducers";
// import ReturnedQuestions from "./ReturnedQuestions";
import serverHandshake from "../auth/serverHandshake";

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
    // this.saveToDb();

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

  async saveQuestionsToDb() {
    const questionsNested = [];
    for (let i = 0; i < this.props.unsavedQuestions.length; i++) {
      let questionObj = {
        text: null,
        // question_type_id: 1,
        // category_id: 1,
        difficulty: null,
        answers: [
          {
            text: null,
            is_correct: null
          }
        ]
      };

      questionObj.text = this.props.unsavedQuestions[i].question;
      questionObj.difficulty = this.props.unsavedQuestions[i].difficulty;
      questionObj.answers[0].text = this.props.unsavedQuestions[
        i
      ].correct_answer;
      questionObj.answers[0].is_correct = true;

      questionsNested.push(questionObj);
    }

    let requestObj = {
      game_id: this.props.game_id,
      number: this.props.roundNumber,
      questions: questionsNested
    };

    console.log(requestObj);
    await serverHandshake(true)
      .post("/rounds/nested", requestObj)
      .then(res => console.log("great success", res.data))
      .catch(err => console.log(err));
  }

  render() {
    if (this.props.categories.length < 1) {
      console.log("PROPS: ", this.props);
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
        <button onClick={() => this.saveQuestionsToDb()}>Save</button>
        {/* <ReturnedQuestions questions={this.state.response} /> */}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  newRoundQuestions: getNewRoundQuestions(state),
  unsavedQuestions: state.newRoundQuestions
});

export default connect(
  mapStateToProps,
  {
    fetchNewRoundQuestions
  }
)(CreateRound);
