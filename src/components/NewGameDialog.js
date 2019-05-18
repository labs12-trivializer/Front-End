import React, { useState } from 'react';
import { useInput } from '../hooks';
import { Form, FormTitle, FormField, Label } from '../styles/newGameForm.css';
import { TextInput } from '../styles/newGameForm.css';
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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

export default ({ onCreate, onCancel, open }) => {
  const [name,, updateName] = useInput();
  const [playDate, setPlayDate] = useState(new Date());

  const handleCreate = () => {
    onCreate({
      name,
      date_to_be_played: moment(playDate).format('MM/DD/YYYY')
    });
  }

  // this.props.createNewGame({ name: 'New Game ' + Date.now() })
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Game Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide a name and optional date for this game.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Game Name"
          type="text"
          fullWidth
          value={name}
          autoComplete="off"
          onChange={updateName}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            margin="normal"
            label="Scheduled Date"
            value={playDate}
            onChange={setPlayDate}
            format="MM/DD/YYYY"
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
//-    <Form onSubmit={onSubmit}>
//      <FormTitle>New Game Form</FormTitle>
//      <FormField>
//        <TextInput
//          onChange={updateName}
//          placeholder="New Game Title..."
//          name="name"
//          value={name}
//          autoComplete="off"
//        />
//      </FormField>
//      <FormField>
//        <Label>Date to Play</Label>
//        <TextInput
//          type="date"
//          name="date_to_be_played"
//          value={playDate}
//          onChange={updatePlayDate}
//        />
//      </FormField>
//      <ButtonRow>
//        <Button type="button" secondary onClick={onCancel}>
//          Cancel
//        </Button>
//        <Button type="submit">
//          Create
//        </Button>
//      </ButtonRow>
//    </Form>
