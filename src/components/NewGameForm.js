import React from 'react';
import useForm from 'react-hook-form';
import { useInput } from '../hooks';
import { Button, ButtonRow } from '../styles/shared.css';
import { Form, FormTitle, FormField, Label } from '../styles/newGameForm.css';
import { TextInput } from '../styles/newGameForm.css';

export default ({ onDone, onCancel }) => {
  const [name, setName, updateName] = useInput();
  const [playDate, setPlayDate, updatePlayDate] = useInput();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = e => {
    e.preventDefault();
    setName('');
    setPlayDate('');
    onDone &&
      onDone({
        name,
        date_to_be_played: playDate.length > 0 ? playDate : ' '
      });
  };

  // this.props.createNewGame({ name: 'New Game ' + Date.now() })
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>New Game Form</FormTitle>
      <FormField>
        <TextInput
          onChange={updateName}
          placeholder="New Game Title..."
          name="name"
          value={name}
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <Label>Date to Play</Label>
        <TextInput
          type="date"
          name="date_to_be_played"
          value={playDate}
          onChange={updatePlayDate}
        />
      </FormField>
      <ButtonRow>
        <Button type="button" secondary onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create
        </Button>
      </ButtonRow>
    </Form>
  );
};
