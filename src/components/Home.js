import React, { Component } from 'react';
import Restricted from './Restricted';

// const username = localStorage.getItem('username');

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      hasUsername: false
    }
  }

  login = () => {
    this.props.auth.login();
  };
  
  componentDidMount = () => {
    this.setState({
      ...this.state,
      username: localStorage.getItem('username')
    })
  }
  
  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div>{isAuthenticated() ? (
        <div>{this.state.hasUsername ? (
          <div>Loading user info...</div>
          ) : (
            <div>{`Welcome, ${this.state.username}!`}</div>
          )}
        </div>
      ) 
      : (<Restricted login={this.login}/>)
        }
      </div>
    );
  }
}

export default Home;

