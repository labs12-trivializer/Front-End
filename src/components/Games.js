import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import waitForLogin from './waitForLogin';
import { getAllGames } from '../reducers';
import { fetchGames, createNewGame } from '../actions';

import { Container, Background, Title } from '../styles/shared.css';
import { GameList } from '../styles/games.css';
import { Background, Button } from '../styles/shared.css';
import { Container, GameList } from '../styles/games.css';
import Modal from './Modal';
import NewGameForm from './NewGameForm';

class Games extends Component {
  state = { modalShowing: false };
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.props.fetchGames();
    console.log(this.props.auth);
  };

  onCreateGame = game => {
    this.props.createNewGame(game).then(success => {
      this.props.history.push(`/games/${success.data.result}`);
    });
  };

  render() {
    return (
      <>
        {this.state.modalShowing && (
          <Modal onClose={() => this.setState({ modalShowing: false })}>
            <NewGameForm
              onDone={this.onCreateGame}
              onCancel={() => this.setState({ modalShowing: false })}
            />
          </Modal>
        )}
        <Container>
          <Background />
          <GameList>
            {this.props.games.map(g => (
              <li key={`game${g.id}`}>
                <Link to={`/games/${g.id}`}>
                  <span>{g.name}</span>
                  <div>
                    <span>Rounds: {g.num_rounds}</span>
                    <br />
                    <span>Questions: {g.num_questions}</span>
                  </div>
                </Link>
              </li>
            ))}
            {this.props.games.length >= this.props.gameLimit ? (
              <Link to="/billing">Upgrade For more games</Link>
            ) : (
              <Button onClick={() => this.setState({ modalShowing: true })}>
                Create New Game
              </Button>
            )}
          </GameList>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  games: getAllGames(state),
  gameLimit: state.profile.game_limit
});

export default waitForLogin(
  connect(
    mapStateToProps,
    {
      fetchGames,
      createNewGame
    }
  )(Games)
);
