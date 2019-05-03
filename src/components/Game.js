import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { fetchGame } from '../actions';
import Menu from './Menu';
import Round from './Round';

class Game extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.props.fetchGame(this.props.match.params.id);
  };

  render() {
    if (!this.props.game || !this.props.game.rounds){
      return (<div>Loading...</div>)
    } else {

      return (
        <div>
        <Menu />
        <h1>Game</h1>
        <p>{ this.props.game && this.props.game.name }</p>
        <ul>
          {this.props.game.rounds.map(r => (
            <li key={`round${r}`}>
              <Round roundId={r}/>
            </li>
          )
          )}
        </ul>
      </div>
    );
  }
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.games.byId[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  {
    fetchGame
  }
)(Game);
