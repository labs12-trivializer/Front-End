import React, { Component } from "react";
// import ReturnedQuestions from "./ReturnedQuestions";
import axios from "axios";

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

  queryTriviaDb = round => {
    //generates query string based on dropdowns and number of questions selected
    const queryString = `https://opentdb.com/api.php?amount=${
      this.state.amount
    }${
      this.state.category === "any" ? "" : `&category=${this.state.category}`
    }${
      this.state.difficulty === "any"
        ? ""
        : `&difficulty=${this.state.difficulty}`
    }${this.state.type === "any" ? "" : `&type=${this.state.type}`}`;

    //make request to openTriviadb based on query string
    axios
      .get(queryString)
      .then(res => {
        console.log("array of results from OTDB: ", res.data.results);
        this.setState({
          response: res.data.results
        });
        console.log(this.state.response);
        this.props.saveQuestionsToDb(
          this.state.response,
          round,
          this.props.user_id
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.props.categories.length < 1) {
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

export default CreateRound;
