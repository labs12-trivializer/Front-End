import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, editProfile } from '../actions';
import { Image } from 'cloudinary-react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tilt from 'react-tilt';

import { Avatar, Form } from '../styles/settings.css';

const Settings = ({
  profile: {
    avatar_id: avatarId,
    tier_name: tier,
    auth0_id,
    username,
    email
  },
  fetchProfile, editProfile
}) => {
  useEffect(() => {
    console.log('avatarId:', avatarId);
    if (!avatarId) fetchProfile();
  }, [avatarId, fetchProfile]);

  const widget = window.cloudinary.createUploadWidget(
    { cloudName: 'trivializer', uploadPreset: 'ntufdwhu' },
    (err, result) => {
      if (result && result.event === 'success') {
        console.log('Widget upload complete', result);
        editProfile({
          avatar_id: result.info.public_id
        });
      }
    }
  );

  const displayWidget = () => {
    widget.open();
  };

  const [values, setValues] = useState({
    username, email
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const submitProfile = event => {
    event.preventDefault();
    editProfile({ auth0_id, username, email });
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Tilt className="Tilt" options={{ max: 30 }}>
          <Avatar
            onClick={displayWidget}
            className="Tilt-inner"
            avatar={avatarId}
          >
            {avatarId ? (
              <Image cloudName="trivializer" publicId={avatarId} />
            ) : (
              <img src="https://picsum.photos/200" alt="placeholder" />
            )}
            <div className="middle">
              <span className="text">Upload Photo</span>
            </div>
          </Avatar>
        </Tilt>
        <Typography gutterBottom variant="h6">
          <strong>Tier:</strong> {tier ? (tier[0].toUpperCase() + tier.slice(1)) : '?'}
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <Grid container justify="center">
        <Form onSubmit={submitProfile} autoComplete="off">
          <TextField
            id="outlined-email"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-username"
            label="Username"
            value={values.username}
            onChange={handleChange('username')}
            margin="normal"
            variant="outlined"
          />
          <Button type="submit">Save</Button>
        </Form>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(
  mapStateToProps,
  { fetchProfile, editProfile }
)(Settings);
