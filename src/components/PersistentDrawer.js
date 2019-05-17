import React from 'react';
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
export const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const PersistentDrawer = ({ isLoggedIn, classes, auth }) => {
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      open
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader} />
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/games">
          <ListItemIcon>
            <GamesIcon />
          </ListItemIcon>
          <ListItemText>Games</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/billing">
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText>Billing</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </ListItem>
        {isLoggedIn && (
          <ListItem button onClick={() => auth.logout()}>
            <ListItemIcon>
              <Icon className={clsx(classes.icon, 'fa fa-sign-out-alt')} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.loggedIn
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(PersistentDrawer)
);
