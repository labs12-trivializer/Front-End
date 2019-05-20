import React, { useState } from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
  Drawer
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';

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

const SmallAppBar = ({ isLoggedIn, auth }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => setOpen(false);
  const handleDrawerOpen = () => setOpen(true);
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Trivease?
          </Typography>
          {isLoggedIn ? (
            <>
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
      <Drawer open={open} onClose={handleDrawerClose}>
        {isLoggedIn ? (
          <List>
            <ListItem
              button
              component={Link}
              to="/games"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <Icon className={clsx(classes.icon, 'far fa-file-alt')} />
              </ListItemIcon>
              <ListItemText primary="Games" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/billing"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Billing" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/profile"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleDrawerClose();
                auth.logout();
              }}
            >
              <ListItemIcon>
                <Icon className={clsx(classes.icon, 'fa fa-sign-out-alt')} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem
              button
              onClick={() => {
                handleDrawerClose();
                auth.login();
              }}
            >
              <ListItemIcon>
                <Icon className={clsx(classes.icon, 'fas fa-sign-in-alt')} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        )}
      </Drawer>
    </>
  );
};

export default SmallAppBar;
