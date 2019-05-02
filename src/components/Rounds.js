import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import Menu from './Menu';

class Rounds extends Component {

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
  // rounds: getRounds(state)
})

export default connect(mapStateToProps, {})(Rounds);