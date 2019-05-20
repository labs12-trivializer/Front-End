import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllQuestionTypes } from '../reducers';
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

// component for selecting types
// the onChange prop mimics an event callback by passing:
// { target: { name: 'question_type_id', value }} as the argument
const TypeSelect = ({ options, onChange, allowAny = true }) => {
  const [value, setValue] = useState(
    allowAny ? '' : options[0] ? options[0].value : ''
  );

  const handleChange = e => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => handleChange({ target: { name: 'question_type_id', value } }), []);

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="question-type-selector">
        Question Type
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        name="question_type_id"
        input={<Input name="question_type_id" id="question-type-selector" />}
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

const mapStateToProps = state => {
  const types = getAllQuestionTypes(state);
  return {
    options: [
      {
        value: types.find(t => t.name.toLowerCase().indexOf('multiple') > -1)
          .id,
        label: 'multiple choice'
      },
      {
        value: types.find(t => t.name.toLowerCase().indexOf('boolean') > -1).id,
        label: 'true/false'
      }
    ]
  };
};

export default connect(mapStateToProps)(TypeSelect);
