import React from 'react';
import clsx from 'clsx'
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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '.5rem 0',
    margin: '0 0 1rem'
  },
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
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'space-between'
  }
}));


const ProfileEditForm = ({ profile, toggleView, updateSettings }) => {
  
  const classes = useStyles();

  const [values, setValues] = React.useState({
    first_name: '',
    last_name: '',
    nickname: '',
    email: '' || profile.email
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmitForm = e => {
    e.preventDefault()
    console.log('Form Submitted!');
    console.log('Values: ', values);
    updateSettings(values)
  }

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmitForm}>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="First Name"
            defaultValue={profile.first_name}
            onChange={handleChange('first_name')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="Last Name"
            defaultValue={profile.last_name}
            onChange={handleChange('last_name')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-uncontrolled"
            label="Display Name"
            defaultValue={profile.nickname}
            onChange={handleChange('nickname')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-dense"
            required
            label="Email"
            defaultValue={profile.email}
            onChange={handleChange('email')}
            margin="dense"
            variant="outlined"
            />
        </FormControl>
        <FormControl className={clsx(classes.formControl, classes.buttonRow)}>
          <Button 
            type="submit"
            // onClick={updateSettings}
            className={classes.button}
            variant="outlined" 
            color="primary"
          >
            Save Profile
          </Button>
          <Button 
            onClick={toggleView}
            className={classes.button}
            variant="outlined" 
            color="secondary"
          >
            Cancel
          </Button>
        </FormControl>
      </form>
    </Paper>
  )
}

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(ProfileEditForm);
