import React, { Component } from 'react';
import { connect } from 'react-redux';
import Restricted from './Restricted';
import Menu from './Menu';

import { addProfile, fetchProfile, fetchCategories } from '../actions';

class Home extends Component {
  state = {
    username: '',
    hasUsername: false
  };

  login = () => {
    this.props.auth.login();
  };

  componentDidMount = () => {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.props;

    if (isAuthenticated() && !profile.id) {
      const { state } = this.props.history.location;

      (state
        ? this.props.addProfile({ email: state[0] })
        : this.props.fetchProfile()
      ).then(() => {
        this.props.fetchCategories();
      });
    }

    this.setState({
      ...this.state,
      username: localStorage.getItem('username')
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return !isAuthenticated() ? (
      <div>
        <Restricted login={this.login} />
      </div>
    ) : (
      <div>
        <div>{`Welcome${', ' + this.state.username}!`}</div>
        <div>
          <Menu />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addProfile, fetchProfile, fetchCategories }
)(Home);
