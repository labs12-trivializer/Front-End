import React, { Component } from "react";
import CreateRound from "./CreateRound";
import { connect } from "react-redux";
import { getAllCategories } from "../reducers";
import serverHandshake from "../auth/serverHandshake";

class CreateGame extends Component {
  state = {
    user_id: null,
    name: "New Game " + Date.now(),
    game_id: null,
    rounds_ids: [],
    nextRoundNumber: 1,
    questions: {},
    answers: {}
  };

  async componentDidMount() {
    // //create game in db
    console.log("creating new game");
    await serverHandshake(true)
      .post("/games", { name: this.state.name })
      .then(res => {
        console.log("create game status", res.status);
        this.setState({ game_id: res.data.id, user_id: res.data.user_id });
      })
      .catch(err => {
        console.log(err);
      });

    //make initial round in db
    console.log("create initial round");
    await serverHandshake(true)
      .post("./rounds", {
        game_id: this.state.game_id,
        number: this.state.nextRoundNumber
      })
      .then(res => {
        console.log("round created successfully", res);
        this.setState({
          nextRoundNumber: this.state.nextRoundNumber + 1,
          rounds_ids: [...this.state.rounds_ids, res.data.id]
        });
      })
      .catch(err => console.log("round add failed", err));
  }

  // creates a new round in database based on game_id in state and the current nextRoundNumber in state
  addRoundToDb() {
    serverHandshake(true)
      .post("/rounds", {
        game_id: this.state.game_id,
        number: this.state.nextRoundNumber
      })
      .then(res => {
        this.setState({
          nextRoundNumber: this.state.nextRoundNumber + 1,
          rounds_ids: [...this.state.rounds_ids, res.data.id]
        });
      })
      .catch(err => console.log(err));
  }

  // saveQuestionsToDb(openTrivArray, round, user_id) {
  //   let questionObj = {
  //     round_id: round,
  //     text: null,
  //     user_id
  //   };

  //   let correctAnswerObj = {
  //     question_id: null,
  //     text: null,
  //     is_correct: true
  //   };

  //   openTrivArray.forEach(obj => {
  //     questionObj.text = obj.question;
  //     correctAnswerObj.text = obj.correct_answer;

  //     //server request to post question
  //     serverHandshake(true)
  //       .post("/questions", questionObj)
  //       .then(res => {
  //         console.log("question added successfully");
  //         correctAnswerObj.question_id = res.data[0].id;

  //         //server request to post correct answer using question ID in successful response
  //         serverHandshake(true)
  //           .post("/answers", correctAnswerObj)
  //           .then(res => console.log(res.status))
  //           .catch(err => console.log("error posting answer"));
  //       })
  //       .catch(err => console.log("error adding question"));
  //   });
  // }

  render() {
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
          {this.state.rounds_ids.map((round_id, index) => (
            <CreateRound
              game_id={this.state.game_id}
              categories={this.props.categories}
              key={round_id}
              round_id={round_id}
              // saveQuestionsToDb={this.saveQuestionsToDb}
              user_id={this.state.user_id}
              roundNumber={index + 1}
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
