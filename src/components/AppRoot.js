import React from 'react';
import Stripe from './stripe/Stripe';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import Games from './Games';
import Game from './Game';
import CreateGame from './CreateGame';
import RoundDetails from './RoundDetails';
import Landing from './Landing';
import Home from './Home';
import Callback from './Callback';
import Auth from '../auth';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GamesIcon from '@material-ui/icons/Games';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Background } from '../styles/shared.css';
import { Button, Container } from '@material-ui/core';

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

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function PermanentDrawerLeft({ classes, isLoggedIn }) {
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
          <Route
            exact
            path="/"
            render={props => <Landing auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/games" component={Games} />
          <PrivateRoute path="/games/:id" component={Game} />
          <PrivateRoute exact path="/rounds/:id" component={RoundDetails} />
          <PrivateRoute path="/create" component={CreateGame} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/billing" component={Stripe} />
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.loggedIn
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(PermanentDrawerLeft)
);
