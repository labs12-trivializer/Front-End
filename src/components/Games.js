import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import waitForLogin from './waitForLogin';
import { getAllGames } from '../reducers';
import { fetchGames, createNewGame } from '../actions';

import { Container, Background, Title } from '../styles/shared.css';
import { GameList } from '../styles/games.css';

class Games extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.props.fetchGames();
    console.log(this.props.auth);
  };

  render() {
    return (
      <Container>
        <Background />
        <Title>Games</Title>
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
            <Link
              onClick={() =>
                this.props.createNewGame({ name: 'New Game ' + Date.now() })
              }
              to="/create"
            >
              Create New Game
            </Link>
          )}
        </GameList>
      </Container>
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
