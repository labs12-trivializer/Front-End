import { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions';

// this is a component that we insert into the Root component which
// can be used to load categories into our redux state when
// users first authenticate
const mapStateToProps = state => ({
  haveCategories: state.categories.allIds.length > 0
});

// Functional component with destrctured props, wrapped with redux's connect
export default connect(
  mapStateToProps,
  { fetchCategories }
)( ({ haveCategories, fetchCategories }) => {

  // useEffect hook which will run onMount
  useEffect(() => {
    if (!haveCategories && localStorage.getItem('token')) {
      fetchCategories();
    }
  }, [haveCategories, fetchCategories]);

  return null;
});
