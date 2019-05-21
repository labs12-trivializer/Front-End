import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';
import { compose } from 'redux';
import { Background } from '../styles/shared.css';
import Auth from '../auth';
// import Profile from './Profile';
import Games from './Games';
import Stripe from './stripe/Stripe';
import PrivateRoute from './PrivateRoute';
import Game from './Game';
import RoundDetails from './RoundDetails';
import Landing from './Landing';
import Home from './Home';
import LargeAppBar from './LargeAppBar';
import SmallAppBar from './SmallAppBar';
import Settings from './Settings';

const auth = new Auth();

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
});

function AppRoot({ classes, isLoggedIn }) {
  // hook version of withWidth
  const theme = useTheme();
  const biggerThanSmall = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <CssBaseline />
      {biggerThanSmall ? (
        <LargeAppBar auth={auth} isLoggedIn={isLoggedIn} />
      ) : (
        <SmallAppBar auth={auth} isLoggedIn={isLoggedIn} />
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <PrivateRoute exact path="/games" component={Games} />
          <Route
            exact
            path="/"
            render={props => <Landing auth={auth} {...props} />}
          />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/rounds/:id" component={RoundDetails} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/billing" component={Stripe} />
          <PrivateRoute path="/games/:id" component={Game} />
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.loggedIn
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(AppRoot);
