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
    date_to_be_played: ""
  };

  //create a new game and the initial round on mount
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

  //change handler
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //save game with updated info
  updateGame() {
    const saveGameObj = {
      name: this.state.name,
      date_to_be_played: this.state.date_to_be_played
      // logo_url: ""
    };
    console.log(saveGameObj);
    serverHandshake(true)
      .put(`/games/${this.state.game_id}`, saveGameObj)
      .then(res => console.log(res.data))
      .catch(err => console.log("fail", err));
  }

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
          <h1>Create A Game:</h1>
          <div>
            <h3>Game Name:</h3>
            <input
              onChange={this.changeHandler}
              placeholder="Wednesday Night Trivia"
              name="name"
              value={this.state.name}
            />
          </div>
          <div>
            <h3>To Be Played:</h3>
            <input
              type="date"
              name="date_to_be_played"
              value={this.state.date_to_be_played}
              onChange={this.changeHandler}
            />
          </div>
          {this.state.rounds_ids.map((round_id, index) => (
            <CreateRound
              game_id={this.state.game_id}
              categories={this.props.categories}
              key={round_id}
              round_id={round_id}
              user_id={this.state.user_id}
              roundNumber={index + 1}
            />
          ))}
          <br />
          <button onClick={() => this.addRoundToDb()}>Add Another Round</button>
          <button onClick={() => this.updateGame()}>Save Game</button>
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
