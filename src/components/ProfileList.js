import React from 'react';
// import clsx from 'clsx'
import { connect } from 'react-redux';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { fetchProfile, editProfile } from '../actions';


const useStyles = makeStyles(theme => ({
  button: {
    margin: '1rem 0 .5rem',
    alignSelf: 'center'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    paddingTop: 0
  },
  listItem: {
    width: '80%',
  },
  listPaper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    margin: 0
  }
}));


const ProfileList = ({ profile, toggleView }) => {

  const classes = useStyles();

  return (
    <Paper className={classes.listPaper}>
      <List className={classes.list}>
        {profile.first_name ? (
          <ListItem divider className={classes.listItem}>
            <ListItemText
              secondary="First Name"
              primary={profile.first_name}
            />
          </ListItem>
          ) : null
        }
        {profile.last_name ? (
          <ListItem divider className={classes.listItem}>
            <ListItemText
              secondary="Last Name"
              primary={profile.last_name}
            />
          </ListItem>
          ) : null
        }
        <ListItem divider className={classes.listItem}>
          <ListItemText
            secondary="Username"
            primary={profile.nickname}
          />
        </ListItem>
        <ListItem divider className={classes.listItem}>
          <ListItemText
            secondary="Email"
            primary={profile.email}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            // inset
            className={classes.button}
            onClick={toggleView('isEditing')}
            variant="outlined"
            color="primary"
          >
            Edit Profile
          </Button>
        </ListItem>
      </List>
    </Paper>
  )  
}

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(ProfileList);
