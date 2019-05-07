import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import { fetchGame, addRound } from '../actions';
import Menu from './Menu';
import Round from './Round';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: this.props.game.rounds
    }
  }

  componentDidMount = () => {
    console.log('Game Info:', this.props.game);
    this.props.fetchGame(this.props.match.params.id);
  };
  
  handleAddNewRound = async () => {
    await this.props.addRound({
      "game_id": this.props.game.id,
      "number": `${this.props.game.rounds.length + 1}`
    }).then(() => {
      this.props.fetchGame(this.props.match.params.id);
    })
  }
  
  render() {
    if (!this.props.game || !this.props.game.rounds){
      return (<div>Loading...</div>)
    } else {

      console.log('Rounds Info:', this.props.game.rounds);
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
          <div>
            <button onClick={this.handleAddNewRound}>New Round</button>
          </div>

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
    fetchGame, 
    addRound,
    withRouter
  }
)(Game);
