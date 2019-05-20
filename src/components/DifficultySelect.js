import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  Input,
  FormControl,
  InputLabel
} from '@material-ui/core';

// component for selecting difficulties
// the onChange prop mimics an event callback by passing:
// { target: { name: 'difficulty', value }} as the argument
export default ({ onChange }) => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="difficulty-selector">
        Difficulty
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        name="difficulty"
        input={<Input name="difficulty_id" id="difficulty-selector" />}
        displayEmpty
      >
        <MenuItem value="">Any</MenuItem>
        {['easy', 'medium', 'hard'].map((o, idx) => (
          <MenuItem value={o} key={`cid${idx}`}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
