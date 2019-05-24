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
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

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
    cursor: 'pointer',
    borderRadius: '50%'
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

  const handleUpdateSettings = async updates => {
    await editProfile({ ...updates });
    setValues({ ...values, isEditing: !values['isEditing']})
  }

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
            {profile.avatar_id
              ? <Image
                  alt="Your Avatar"
                  cloudName="trivializer"
                  publicId={profile.avatar_id}
                  className={classes.avatar}
                />
              : <Avatar
                  alt="Placeholder Avatar"
                  src="https://picsum.photos/100"
                  className={classes.avatar}
                />
            }
          </figure>
        </Tilt>
        <Typography
          variant="h5"
        >
          Tier Level: {`${((profile.tier_name || 'bronze').toUpperCase())}`}
        </Typography>
        {profile.tier_name !== 'gold' &&
          <Button
            component={Link}
            to="/billing"
            variant="contained"
            className={classes.button}
            color="primary"
          >
            Upgrade Your Account
          </Button>
        }
      </Paper>
      {values.isEditing
        ? <ProfileEditForm updateSettings={handleUpdateSettings} toggleView={handleToggleView('isEditing')}/>
        : <ProfileList toggleView={handleToggleView}/>
      }
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(Profile);
