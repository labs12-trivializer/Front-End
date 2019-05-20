import React, { useState, useEffect } from 'react';
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
export default ({ onChange, allowAny = true }) => {
  const [value, setValue] = useState(allowAny ? '' : 'easy');
  const handleChange = e => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => handleChange({ target: { name: 'difficulty', value } }), []);
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
        {allowAny && <MenuItem value="">Any</MenuItem>}
        {['easy', 'medium', 'hard'].map((o, idx) => (
          <MenuItem value={o} key={`cid${idx}`}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
