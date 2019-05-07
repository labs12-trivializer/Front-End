import React, { Component } from "react";
import CreateRound from "./CreateRound";
import { connect } from "react-redux";
import { getAllCategories } from "../reducers";
import serverHandshake from "../auth/serverHandshake";

class CreateGame extends Component {
  state = {
    name: "Test Add New Game4",
    game_id: null,
    rounds: [],
    numberOfRounds: 1,
    questions: [],
    answers: []
  };

  componentDidMount() {
    // //create game in db
    serverHandshake(true)
      .post("/games", { name: this.state.name })
      .then(res => {
        console.log(res.data);
        this.setState({ game_id: res.data.id });
      })
      .catch(err => {
        console.log(err);
      });

    //make initial round in db
    serverHandshake(true)
      .post("./rounds", {
        game_id: this.state.game_id,
        number: this.state.numberOfRounds
      })
      .then(res => {
        console.log("newly created round id:", res.data.id);
        this.setState({
          numberOfRounds: this.state.numberOfRounds + 1,
          rounds: [...this.state.rounds, res.data.id]
        });
      })
      .catch(err => console.log(err));
  }

  addRoundToDb() {
    serverHandshake(true)
      .post("/rounds", {
        game_id: this.state.game_id,
        number: this.state.numberOfRounds
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          numberOfRounds: this.state.numberOfRounds + 1,
          rounds: [...this.state.rounds, res.data.id]
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.numberOfRounds === 1) {
      return (
        <>
          <h3>Game: {this.state.name}</h3>
          <CreateRound categories={this.props.categories} />
          <button onClick={() => this.addRoundToDb()}>Add Another Round</button>
        </>
      );
    } else {
      return (
        <>
          <h3>Game: {this.state.name}</h3>
          {this.state.rounds.map(item => (
            <CreateRound categories={this.props.categories} key={item} />
          ))}
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
