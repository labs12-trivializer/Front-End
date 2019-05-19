import React from 'react';
import Stripe from './stripe/Stripe';
import PrivateRoute from './PrivateRoute';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Background } from '../styles/shared.css';
import { Button, Container } from '@material-ui/core';
import Auth from '../auth';
import Profile from './Profile';
import Games from './Games';
import { compose } from 'redux';
import Game from './Game';
import RoundDetails from './RoundDetails';
import Landing from './Landing';
import Home from './Home';

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
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Background />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Not Trivializer
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={RouterLink} to="/games">
                Games
              </Button>
              <Button color="inherit" component={RouterLink} to="/billing">
                Billing
              </Button>
              <Button color="inherit" component={RouterLink} to="/profile">
                Settings
              </Button>
              <Button color="inherit" onClick={() => auth.logout()}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => auth.login()}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
          <PrivateRoute path="/profile" component={Profile} />
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
