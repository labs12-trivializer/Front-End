import React, { Component } from "react";
import CreateRound from "./CreateRound";
import { connect } from "react-redux";
import { getAllCategories } from "../reducers";
import serverHandshake from "../auth/serverHandshake";

class CreateGame extends Component {
  state = {
    user_id: null,
    name: "Hardcoded Test Game Name",
    game_id: null,
    rounds_ids: [],
    nextRoundNumber: 1,
    questions: {},
    answers: {}
  };

  componentDidMount() {
    // //create game in db
    serverHandshake(true)
      .post("/games", { name: this.state.name })
      .then(res => {
        console.log("here", res.data.user_id);
        this.setState({ game_id: res.data.id });
      })
      .catch(err => {
        console.log(err);
      });

    //make initial round in db
    serverHandshake(true)
      .post("./rounds", {
        game_id: this.state.game_id,
        number: this.state.nextRoundNumber
      })
      .then(res => {
        console.log("newly created round id:", res.data.id);
        this.setState({
          nextRoundNumber: this.state.nextRoundNumber + 1,
          rounds_ids: [...this.state.rounds_ids, res.data.id]
        });
      })
      .catch(err => console.log(err));
  }

  // creates a new round in database based on game_id in state and the current nextRoundNumber in state
  addRoundToDb() {
    console.log("inside addRoundToDb()");
    serverHandshake(true)
      .post("/rounds", {
        game_id: this.state.game_id,
        number: this.state.nextRoundNumber
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          nextRoundNumber: this.state.nextRoundNumber + 1,
          rounds_ids: [...this.state.rounds_ids, res.data.id]
        });
      })
      .catch(err => console.log(err));
  }

  saveQuestionsToDb(openTrivArray, round) {
    // const { user_id } = this.state;
    let questionObj = {
      round_id: round,
      text: null
      // user_id: null
    };

    let correctAnswerObj = {
      question_id: null,
      text: null,
      is_correct: true
    };

    openTrivArray.forEach(obj => {
      questionObj.text = obj.question;
      correctAnswerObj.text = obj.correct_answer;

      //server request to post question
      serverHandshake(true)
        .post("/questions", questionObj)
        .then(res => {
          console.log("question added successfully");
          correctAnswerObj.question_id = res.data[0].id;

          //server request to post correct answer using question ID in successful response
          serverHandshake(true)
            .post("/answers", correctAnswerObj)
            .then(res => console.log(res.status))
            .catch(err => console.log("error posting answer"));
        })
        .catch(err => console.log("error adding question"));
    });
  }

  render() {
    console.log("array of round_ids: ", this.state.rounds_ids);
    if (this.state.nextRoundNumber < 1) {
      return (
        <>
          <h2>Loading...</h2>
        </>
      );
    } else {
      return (
        <>
          <h3>Game: {this.state.name}</h3>
          {this.state.rounds_ids.map(round_id => (
            <CreateRound
              categories={this.props.categories}
              key={round_id}
              round_id={round_id}
              saveQuestionsToDb={this.saveQuestionsToDb}
            />
          ))}
          <br />
          <button onClick={() => this.addRoundToDb()}>Add Another Round</button>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: getAllCategories(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateGame);
