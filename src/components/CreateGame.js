import React, { Component } from 'react';
import CreateRound from './CreateRound';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';

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
    categories: state.categories,
  };
};

export default connect(
  mapStateToProps,
  { fetchCategories }
)(CreateGame);
