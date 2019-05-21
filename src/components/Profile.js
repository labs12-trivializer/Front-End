import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Image } from 'cloudinary-react';
// import clsx from 'clsx';
import Tilt from 'react-tilt';
import {
  Avatar,
  Paper,
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// import { Container, Form, Avatar } from '../styles/profile.css';
// import { Background, Button } from '../styles/shared.css';
import ProfileEditForm from './ProfileEditForm';
import ProfileList from './ProfileList';
import { fetchProfile, editProfile } from '../actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  button: {
    margin: '.5rem 0',
    alignSelf: 'center'
  },
  avatar: {
    margin: '.5rem',
    width: 100,
    height: 100,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '.5rem 0',
    margin: '0 0 1rem'
  }
}));

const Profile = ({ profile, fetchProfile, editProfile }) => {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    isEditing: false
  });

  const handleToggleView = prop => event => {
    setValues({ ...values, [prop]: !values[prop]})
  }

  const handleUpdateSettings = (updates) => {
    // Do a dance and send an action
    console.log('Fake action to update profile...')
    editProfile({
      ...updates
    })

    setValues({ ...values, isEditing: !values['isEditing']})
  }

  // const handleChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  useEffect(() => {
    console.log('avatarid:', profile.avatar_id);
    if (!profile.avatar_id) fetchProfile();
  }, [profile.avatar_id, fetchProfile]);

  let widget = window.cloudinary.createUploadWidget(
    { cloudName: 'trivializer', uploadPreset: 'ntufdwhu' },
    (err, result) => {
      if (result && result.event === 'success') {
        console.log('Widget upload complete?', result);
        editProfile({
          avatar_id: result.info.public_id
        });
      }
    }
  );

  const displayWidget = () => {
    widget.open();
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Tilt className="Tilt" options={{ max: 30 }}>
          <figure onClick={displayWidget} className="Tilt-inner" avatar={profile.avatar_id}>
            {profile.avatar_id ? (
              <Avatar
                alt="Your Avatar"
                // src="/static/images/avatar/1.jpg"
                cloudName="trivializer"
                publicId={profile.avatar_id}
                className={classes.avatar}
              />
              // <Image cloudName="trivializer" publicId={avatar_id} />
            ) : (
              <Avatar alt="Placeholder Avatar" src="https://picsum.photos/100" className={classes.avatar} />
              // <img src="https://picsum.photos/100" alt="placeholder" />
            )}
          </figure>
        </Tilt>
        <Typography
          variant="h5"
        >
          Tier Level: {`${((profile.tier_name || 'bronze').toUpperCase())}`}
        </Typography>
        {profile.tier_name !== 'gold' &&
          <Button
            variant="contained"
            href="/billing"
            className={classes.button}
            color="primary"
          >
            Upgrade Your Account
          </Button>
        }
      </Paper>
      {values.isEditing 
        ? <ProfileEditForm updateSettings={handleUpdateSettings} toggleView={handleToggleView}/>
        : <ProfileList toggleView={handleToggleView}/>
      }
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(Profile);
