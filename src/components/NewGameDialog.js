import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const NewGameSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .max(100, 'Too Long')
    .required('Required'),
  date_to_be_played: Yup.date()
});

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <DatePicker
      name={field.name}
      value={field.value}
      format="MM/DD/YYYY"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      {...other}
    />
  );
};

export default ({ onCreate, onCancel, open }) => {
  const handleCreate = fields => {
    onCreate({
      name: fields.name,
      date_to_be_played: moment(fields.date_to_be_played).format('MM/DD/YYYY')
    });
  };

  // this component implements to most verbose example of formik validation
  // the rest will use more concise methods
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Game Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide a name and optional date for this game.
        </DialogContentText>
        <Formik
          initialValues={{ name: '', date_to_be_played: new Date() }}
          validationSchema={NewGameSchema}
          onSubmit={values => handleCreate(values)}
        >
          {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <TextField
                autoFocus
                id="name"
                label="Game Name"
                helperText={errors.name}
                type="text"
                fullWidth
                value={values.name}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name ? true : false}
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Field
                  label="Scheduled Date"
                  name="date_to_be_played"
                  component={DatePickerField}
                />
              </MuiPickersUtilsProvider>
              <DialogActions>
                <Button type="button" onClick={onCancel} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Create
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
