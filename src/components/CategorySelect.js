import React, { useState } from 'react';
import { Dropdown } from '../styles/shared.css';
import { connect } from 'react-redux';
import { getAllCategories } from '../reducers';

// component for selecting categories
// the onChange prop mimics an event callback by passing:
// { target: { name: 'category_id', value }} as the argument
const CategorySelect = ({options, onChange, placeholder }) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      options={options}
      onChange={c => {
        setValue(c);
        onChange({
          target: {
            name: 'category_id',
            value: c.value
          }
        });
      }}
      value={value}
      placeholder={placeholder}
    />
  );
};

const mapStateToProps = state => ({
  options: getAllCategories(state).map(c => ({
    value: c.id,
    label: c.name
  }))
});

export default connect(mapStateToProps)(CategorySelect);
