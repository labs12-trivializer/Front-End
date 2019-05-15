import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { fetchGame, editGame, deleteGame, addRound, deleteRound } from '../actions';
import { Container, Background } from '../styles/shared.css';
import { GameInput, InputControls, RoundList, GameControls } from '../styles/game.css';
import Round from './Round';

const initialState = (props) => ({
  title: props.game && props.game.name,
  editingTitle: false
})

class Game extends Component {
  state = initialState(this.props)

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
  deleteRound = (round_id, game_id) => {
    this.props.deleteRound(round_id, game_id);
  };

  deleteGame = async () => {
    await this.props.deleteGame(this.props.match.params.id);
    this.props.history.replace('/games');
  }

  updateTitle = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  handleInputClick = () => {
    this.setState({ editingTitle: true });
  }

  handleTitleRename = async () => {
    await this.props.editGame(this.props.game.id, {
      name: this.state.title
    });

    this.setState({ editingTitle: false });
  }

  handleTitleCancel = () => {
    this.setState(initialState(this.props));
  }

  render() {
    if (!this.props.game || !this.props.game.rounds) {
      return <div>Loading...</div>;
    } else {
      console.log('Rounds Info:', this.props.game.rounds);
      return (
        <Container>
          <Background />
          <GameInput
            value={this.state.title}
            onChange={this.updateTitle}
            onClick={this.handleInputClick}
          />
          {this.state.editingTitle && (
            <InputControls>
              <span onClick={this.handleTitleRename}>Rename</span>
              <span onClick={this.handleTitleCancel}>Cancel</span>
            </InputControls>
          )}
          <RoundList>
            {this.props.game.rounds.map(r => (
              <li key={`round${r}`}>
                <Round roundId={r} />
                <div onClick={() => this.props.deleteRound(r, this.props.game.id)} className="fas fa-trash-alt" />
              </li>
            ))}
          </RoundList>
          <GameControls>
            {this.props.game.rounds.length >= this.props.roundLimit ? (
              <Link to="/billing">Upgrade to enable more rounds!</Link>
            ) : (
              <>
                <button onClick={this.handleAddNewRound}>New Round</button>
                <button onClick={this.deleteGame}>Delete Game</button>
              </>
            )}
          </GameControls>
        </Container>
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
    editGame,
    deleteGame,
    addRound,
    withRouter,
    deleteRound
  }
)(Game);
