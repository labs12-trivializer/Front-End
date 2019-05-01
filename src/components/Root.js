import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Reset from '../styles/reset.css';
import NavBar from './NavBar';
// import Menu from './Menu';
import App from './App';
import Home from './Home';
import Callback from './Callback';
import Auth from '../auth';
import history from '../history';
import Games from './Games';
import Game from './Game';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <React.Fragment>
          <Reset />
          <Route exact path="/" render={props => <App auth={auth} {...props} />} />
          <Route path="/" render={props => <NavBar auth={auth} {...props} />} />
          {/* <Route path="/" render={props => <Menu auth={auth} {...props} />} /> */}
          <Route path="/home" render={props => <Home auth={auth} {...props} />} />
          <Route exact path="/games" render={props => <Games auth={auth} {...props} />} />
          <Route path="/games/:id" render={props => <Game auth={auth} {...props} />} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default Root;
