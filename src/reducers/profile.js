import {
  LOGIN_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  ADD_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  UPGRADE_TIER_SUCCESS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
    case ADD_PROFILE_SUCCESS:
    case EDIT_PROFILE_SUCCESS:
      return { ...state, ...action.payload };
    case UPGRADE_TIER_SUCCESS:
      return { ...state, tier_name: action.payload };
    default:
      return state;
  }
};

export const getHasProfile = state => (state.tier_name ? true : false);
