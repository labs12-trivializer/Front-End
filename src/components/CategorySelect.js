import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../reducers';
import {
  Select,
  MenuItem,
  Input,
  FormControl,
  InputLabel
} from '@material-ui/core';

// component for selecting categories
// the onChange prop mimics an event callback by passing:
// { target: { name: 'category_id', value }} as the argument
const CategorySelect = ({ options, onChange, allowAny = true }) => {
  const [value, setValue] = useState(
    allowAny ? '' : options[0] ? options[0].value : ''
  );

  const handleChange = e => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="category-selector">
        Category
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        name="category_id"
        input={<Input name="category_id" id="category-selector" />}
        displayEmpty
      >
        {allowAny && <MenuItem value="">Any</MenuItem>}
        {options.map((o, idx) => (
          <MenuItem value={o.value} key={`cid${idx}`}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = state => ({
  options: getAllCategories(state).map(c => ({
    value: c.id,
    label: c.name
  }))
});

export default connect(mapStateToProps)(CategorySelect);
