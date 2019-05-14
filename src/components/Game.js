import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { fetchGame, deleteGame, addRound } from '../actions';
import Round from './Round';

class Game extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    console.log('Game Info:', this.props.game);
    this.props.fetchGame(this.props.match.params.id);
  };

  handleAddNewRound = async () => {
    await this.props
      .addRound({
        game_id: this.props.game.id,
        number: `${this.props.game.rounds.length + 1}`
      })
      .then(() => {
        this.props.fetchGame(this.props.match.params.id);
      });
  };

  deleteGame = async () => {
    await this.props.deleteGame(this.props.match.params.id);
    this.props.history.replace('/games');
  }

  render() {
    if (!this.props.game || !this.props.game.rounds) {
      return <div>Loading...</div>;
    } else {
      console.log('Rounds Info:', this.props.game.rounds);
      return (
        <div>
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
              <div>
                <button onClick={this.handleAddNewRound}>New Round</button>
                <button onClick={this.deleteGame}>Delete Game</button>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.games.byId[ownProps.match.params.id],
  roundLimit: state.profile.round_limit
});

export default connect(
  mapStateToProps,
  {
    fetchGame,
    deleteGame,
    addRound,
    withRouter
  }
)(Game);
