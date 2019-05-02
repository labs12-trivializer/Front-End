import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllGames } from '../reducers';
import { fetchGames } from '../actions';
import Menu from './Menu';

class Games extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.props.fetchGames();
  };

  render() {
    return (
      <div>
        <Menu />
        <ul>
          {this.props.games.map(g => (
            <li key={g.id}>
              <Link to={`/games/${g.id}`}>{g.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: getAllGames(state)
});

export default connect(
  mapStateToProps,
  {
    fetchGames
  }
)(Games);
