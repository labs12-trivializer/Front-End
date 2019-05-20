import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import Tilt from 'react-tilt';
import { 
  Paper,
  FormControl, 
  TextField, 
  Button,
  Typography,
  List,
  ListItem,
  ListItemText
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
    // alignSelf: 'flex-start'
  },
  paper: {
    width: '100%',
    padding: '1rem 0',
    margin: '0 0 1rem'
  },
  avatarPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '.5rem 0',
    margin: '0 0 1rem'
  },
  typography: {
    width: '80%',
    alignSelf: 'center'
  }
}));

const Profile = ({ profile, fetchProfile, editProfile }) => {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    first_name: 'test',
    last_name: 'test',
    display_name: 'test',
    email: 'test'
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSaveInfo = async () => {
    console.log('PROFILE: ', await fetchProfile());
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

  console.log('VALUES: ', Object.keys(values))
  let isEditing = false;

  return (
    <div className={classes.container}>
      <Paper className={classes.avatarPaper}>
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
        <Typography
          variant="h5"
        >
          Tier Level: {`${(profile.tier_name.toUpperCase())}`}
        </Typography>
        {profile.tier_name !== 'bronze' &&
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
      {isEditing 
        ? (
          <List>
            {Object.keys(values).map((value, idx) => 
              <ListItem>
                <ListItemText
                  primary={values[value]}
                  key={idx}
                />
              </ListItem>
            )}
          </List>
        ) 
        : (
          <Paper className={classes.paper}>
            <form className={classes.form}>
            <FormControl className={classes.formControl}>
              <TextField
                id="filled-uncontrolled"
                label="First Name"
                value={values.first_name}
                onChange={handleChange('first_name')}
                margin="dense"
                variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="filled-uncontrolled"
                label="Last Name"
                value={values.last_name}
                onChange={handleChange('last_name')}
                margin="dense"
                variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="filled-uncontrolled"
                label="Display Name"
                value={values.display_name}
                onChange={handleChange('display_name')}
                defaultValue={profile.username}
                margin="dense"
                variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-dense"
                required
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                margin="dense"
                variant="outlined"
              />
            </FormControl>
            {/* <Typography variant="caption" color="inherit">*Required Field</Typography> */}
            <FormControl className={classes.formControl}>
              <Button 
                onClick={handleSaveInfo}
                className={classes.button}
                variant="outlined" 
                color="primary">
                Save Profile
              </Button>
            </FormControl>
          </form>
        </Paper>
        )}
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(Profile);
