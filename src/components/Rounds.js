import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { getAllRounds } from '../reducers';
import { fetchRounds } from '../actions'
import Menu from './Menu';

class Rounds extends Component {

  componentDidMount = () => {
    this.props.fetchRounds();
  };

  render(){
    return (
      <div>
        <Menu />
        <h2>Rounds for this game will be listed here:</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rounds: getAllRounds(state)
})

export default connect(mapStateToProps, { fetchRounds })(Rounds);