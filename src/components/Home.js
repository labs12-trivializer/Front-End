import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';
import Restricted from './Restricted';

import Menu from './Menu';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      hasUsername: false
    };
  }

  login = () => {
    this.props.auth.login();
  };

  componentDidMount = () => {
    this.props.fetchProfile();
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

export default connect(null, { fetchProfile })(Home);
