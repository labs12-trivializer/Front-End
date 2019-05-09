import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
              <Link to={`/games/${g.id}`}>{g.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/create">Create New Game</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: getAllGames(state),
});

export default connect(
  mapStateToProps,
  {
    fetchGames,
  }
)(Games);
