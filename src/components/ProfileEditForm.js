import React from 'react';
// import clsx from 'clsx'
import { connect } from 'react-redux';
import {
  Paper,
  FormControl,
  TextField,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { fetchProfile, editProfile } from '../actions';


const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  formControl: {
    width: '80%'
  },
  button: {
    margin: '.5rem 0',
    alignSelf: 'center'
  }
}));


const ProfileEditForm = ({ profile }) => {
  
  const classes = useStyles();

  // const [values, setValues] = React.useState({
  //   first_name: 'test',
  //   last_name: 'test',
  //   display_name: 'test',
  //   email: 'test'
  // });

  // const handleChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  return (
    <Paper className={classes.paper}>
      <form className={classes.form}>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="First Name"
            value={profile.first_name}
            // onChange={handleChange('first_name')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="Last Name"
            value={profile.last_name}
            // onChange={handleChange('last_name')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="Display Name"
            value={profile.display_name}
            // onChange={handleChange('display_name')}
            // defaultValue={profile.username}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-dense"
            required
            label="Email"
            value={profile.email}
            // onChange={handleChange('email')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button 
            // onClick={handleSaveInfo}
            className={classes.button}
            variant="outlined" 
            color="primary">
            Save Profile
          </Button>
        </FormControl>
      </form>
    </Paper>
  )
}

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(ProfileEditForm);
