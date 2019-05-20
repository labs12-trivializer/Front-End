import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import Tilt from 'react-tilt';
import { 
  FormControl, 
  TextField, 
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// import { Container, Form, Avatar } from '../styles/profile.css';
// import { Background, Button } from '../styles/shared.css';

import { fetchProfile, editProfile } from '../actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: '100vh',
    padding: 0,
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    // marginBottom: '.5rem'
  },
  formControl: {
    width: '80%'
  },
  button: {
    margin: '.5rem 0',
    alignSelf: 'flex-start'
  }
}));

const Profile = ({ profile, fetchProfile, editProfile }) => {

  const classes = useStyles();

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
      {/* <Background /> */}
      <Tilt className="Tilt" options={{ max: 30 }}>
        <figure onClick={displayWidget} className="Tilt-inner" avatar={profile.avatar_id}>
          {profile.avatar_id ? (
            <Image cloudName="trivializer" publicId={profile.avatar_id} />
          ) : (
            <img src="https://picsum.photos/100" alt="placeholder" />
          )}
          <div className="middle">
            <span className="text">Upload Photo</span>
          </div>
        </figure>
      </Tilt>
      <form className={classes.form}>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="First Name"
            // defaultValue="Name"
            margin="dense"
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="Last Name"
            // defaultValue="Name"
            margin="dense"
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            required
            label="Display Name"
            // defaultValue="Name"
            margin="dense"
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-dense"
            label="Email"
            margin="dense"
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-dense"
            label="Password"
            margin="dense"
            variant="outlined"
          />
        </FormControl>
        <Typography variant="caption" color="inherit">*Required Field</Typography>
        <FormControl className={classes.formControl}>
          <Button 
            className={classes.button}
            variant="outlined" 
            color="primary">
            Save
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(Profile);
