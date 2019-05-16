import React, { useState } from 'react';
import { Dropdown } from '../styles/shared.css';

// component for selecting difficulties
// the onChange prop mimics an event callback by passing:
// { target: { name: 'difficulty', value }} as the argument
export default ({ onChange }) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      options={['easy', 'medium', 'hard']}
      onChange={c => {
        setValue(c);
        onChange({
          target: {
            name: 'difficulty',
            value: c.value
          }
        });
      }}
      value={value}
      placeholder="Select a Difficulty..."
    />
  );
};
