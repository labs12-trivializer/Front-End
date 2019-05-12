import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { fetchGame, addRound, updateGame } from '../actions';
import Round from './Round';

class CreateGame extends Component {
  state = {
    name: '',
    date_to_be_played: ' '
  };

  componentDidMount = () => {
    console.log('Game Info:', this.props.game);
    this.props.fetchGame(this.props.game);
  };

  //save/update game info
  updateGame() {
    const saveGameObj = {
      name: this.state.name,
      date_to_be_played: this.state.date_to_be_played
      // logo_url: ""
    };
    this.props.updateGame(saveGameObj, this.props.game.id);
  }

  //change handler
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddNewRound = async () => {
    await this.props
      .addRound(
        {
          game_id: this.props.game.id,
          number: `${this.props.game.rounds.length + 1}`
        },
        this.props.game.id
      )
      .then(() => {
        this.props.fetchGame(this.props.game.id);
      });
  };

  render() {
    if (!this.props.game) {
      return <div>Loading...</div>;
    } else {
      console.log('Rounds Info:', this.props.game.rounds);
      return (
        <div>
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
          <h1>Game</h1>
          <p>{this.props.game && this.props.game.name}</p>
          <ul>
            {this.props.game.rounds.map(r => (
              <li key={`round${r}`}>
                <Round roundId={r} />
              </li>
            ))}
          </ul>
          <div>
            {this.props.game.rounds.length >= this.props.roundLimit ? (
              <Link to="/billing">Upgrade to enable more rounds!</Link>
            ) : (
              <button onClick={this.handleAddNewRound}>New Round</button>
            )}
          </div>
          <button onClick={() => this.updateGame()}>Save Game</button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.games.byId[state.createGame],
  roundLimit: state.profile.round_limit
});

export default connect(
  mapStateToProps,
  {
    fetchGame,
    addRound,
    updateGame
    // withRouter
  }
)(CreateGame);
