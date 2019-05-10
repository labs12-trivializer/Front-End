import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import waitForLogin from './waitForLogin';
import { getAllGames } from '../reducers';
import { fetchGames } from '../actions';

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
      <div>
        <ul>
          {this.props.games.map(g => (
            <li key={`game${g.id}`}>
              <Link to={`/games/${g.id}`}>
                {g.name} - [{g.num_rounds},{g.num_questions}]
              </Link>
            </li>
          ))}
        </ul>
        {this.props.games.length >= this.props.gameLimit ? (
          <Link to="/billing">Upgrade For more games</Link>
        ) : (
          <Link to="/create">Create New Game</Link>
        )}
      </div>
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
      fetchGames
    }
  )(Games)
);
