import React, { Component } from 'react';

class App extends Component {
  goTo = route => {
    this.props.history.replace(`/${route}`);
  };

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <header>
          <h1>Trivializer</h1>
          <nav>
            <button onClick={() => this.goTo('home')}>Home</button>
            {!isAuthenticated() ? (
              <button onClick={this.login}>Log In</button>
            ) : (
              <button onClick={this.logout}>Log Out</button>
            )}
          </nav>
        </header>
      </div>
    );
  }
}

export default App;
