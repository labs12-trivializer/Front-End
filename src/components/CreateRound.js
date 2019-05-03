import React, { Component } from 'react';
import ReturnedQuestions from './ReturnedQuestions';
import axios from 'axios';

class CreateRound extends Component {
  state = {
    category: 9,
    questions: 0,
    difficulty: 'easy',
    type: 'boolean',
    response: [],
  };

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  queryTriviaDb = e => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${this.state.questions}&category=${
          this.state.category
        }&difficulty=${this.state.difficulty}&type=${this.state.type}`
      )
      .then(res => this.setState({ response: res.data.results }))
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
      <>
        <input
          onChange={e => this.handleChanges(e)}
          type="number"
          name="questions"
          min="1"
          max="50"
        />
        <select name="category" onChange={e => this.handleChanges(e)}>
          {this.props.categories.map(c => (
            <option value={c.category_id}>{c.name}</option>
          ))}
        </select>
        <select name="difficulty" onChange={e => this.handleChanges(e)}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <select name="type" onChange={e => this.handleChanges(e)}>
          <option value="boolean">true/false</option>
          <option value="multiple">multiple choice</option>
        </select>
        <button onClick={this.queryTriviaDb}>Get Questions</button>
        <ReturnedQuestions questions={this.state.response} />
      </>
    );
  }
}

export default CreateRound;
