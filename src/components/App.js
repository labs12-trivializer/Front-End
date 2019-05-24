import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../styles/global.css';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { compose } from 'redux';
import Auth from '../auth';
import Profile from './Profile';
import Games from './Games';
import Stripe from './stripe/Stripe';
import PrivateRoute from './PrivateRoute';
import Game from './Game';
import RoundDetails from './RoundDetails';
// import Landing from './Landing';
import Home from './Home';
import LargeAppBar from './LargeAppBar';
import SmallAppBar from './SmallAppBar';
import LandingPage from '../components/LandingPage/LandingPage';
import Footer from '../components/LandingPage/Footer';

const auth = new Auth();

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1
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
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto'
  },

  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0'
  },

  left: {},

  block: {
    color: 'inherit',
    padding: '1rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block'
  },
  right: {
    padding: '1rem'
  },
  footerPosition: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

function AppRoot({ classes, isLoggedIn, location }) {
  // hook version of withWidth
  const theme = useTheme();
  const biggerThanSmall = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const { renewSession } = auth;
    if (isLoggedIn) renewSession();
  }, [isLoggedIn]);

  return (
    <>
      <CssBaseline />
      <Route exact path="/" render={() => <LandingPage auth={auth} />} />
      <div className={classes.root}>
        <GlobalStyles />
        <CssBaseline />
        {biggerThanSmall ? (
          <LargeAppBar auth={auth} isLoggedIn={isLoggedIn} />
        ) : (
          <SmallAppBar auth={auth} isLoggedIn={isLoggedIn} />
        )}
        {location.pathname !== '/' && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container>
              <PrivateRoute exact path="/games" component={Games} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute exact path="/rounds/:id" component={RoundDetails} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/billing" component={Stripe} />
              <PrivateRoute path="/games/:id" component={Game} />
            </Container>
          </main>
        )}
      </div>
      <Footer
        content={
          <div className={classes.footerPosition}>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <Link className={classes.block} to="/#about">
                    About
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link className={classes.block} to="/#team">
                    Our Team
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link className={classes.block} to="/#contact">
                    Contact Us
                  </Link>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} Triviabase
            </div>
          </div>
        }
      />
    </>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.loggedIn
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(withRouter(AppRoot));
