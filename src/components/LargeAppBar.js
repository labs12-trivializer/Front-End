import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// hook version of withStyles
const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const LargeAppBar = ({ isLoggedIn, auth }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Triviabase
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/games">
              Games
            </Button>
            <Button color="inherit" component={Link} to="/billing">
              Billing
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={() => auth.logout()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => auth.login()}>
              Login
            </Button>
            <Button color="inherit" onClick={() => auth.login()}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default LargeAppBar;
