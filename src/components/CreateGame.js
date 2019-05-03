import React, { Component } from 'react';
import CreateRound from './CreateRound';
import { connect } from 'react-redux';
import { getAllCategories } from '../reducers';

class CreateGame extends Component {

  render() {
    return (
      <div>
        <CreateRound categories={this.props.categories} />

        {/* <AddRound /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: getAllCategories(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateGame);

