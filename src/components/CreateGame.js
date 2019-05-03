import React, { Component } from 'react';
import CreateRound from './CreateRound';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';
import { getAllCategories } from '../reducers';

class CreateGame extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

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
  { fetchCategories }
)(CreateGame);
