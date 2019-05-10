import React, { Component } from 'react';
import CreateRound from './CreateRound';
import { connect } from 'react-redux';
import { getAllCategories } from '../reducers';
import {
  // newGameCreateRound,
  updateGame,
  addRound
} from '../actions';

class CreateGame extends Component {
  state = {
    user_id: null,
    name: '',
    game_id: null,
    rounds_ids: [],
    nextRoundNumber: 1,
    date_to_be_played: ' '
  };

  async componentDidMount() {
    // create game in db
    // await this.props.createNewGame({ name: this.state.name });
  }

  // create initial round associated with game above
  async addRound() {
    await this.props.addRound(
      {
        game_id: this.props.game.id,
        number: this.props.game.rounds.length + 1
      },
      this.props.game.id
    );
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
    this.props.updateGame(saveGameObj, this.props.game.id);
  }

  // delete round
  // deleteRound = async round_id => {
  //   console.log('inside delete round', this.state.rounds_ids, round_id);
  //   const removed = this.state.rounds_ids.filter(item => item !== round_id);
  //   this.setState({ rounds_ids: removed });
  //   const deleted = await serverHandshake(true).delete(`/rounds/${round_id}`);
  //   console.log(deleted);
  // };

  render() {
    if (!this.props.game) {
      return <h1>loading...</h1>;
    }
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
        {this.props.game.rounds.map((round_id, index) => (
          <CreateRound
            game_id={this.props.game.id}
            categories={this.props.categories}
            key={round_id}
            round_id={round_id}
            user_id={this.props.game.user_id}
            roundNumber={index + 1}
            deleteRound={this.deleteRound}
          />
        ))}
        <br />
        <button onClick={() => this.addRound()}>Add Round</button>
        <button onClick={() => this.updateGame()}>Save Game</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: getAllCategories(state),
    game: state.games.byId[state.createGame]
    // user_id: state.createGame.game.user_id,
    // rounds: state.createGame.allRoundIds.length,
    // round_ids: state.createGame.allRoundIds
  };
};

export default connect(
  mapStateToProps,
  { updateGame, addRound }
)(CreateGame);
