import {
  LOGIN_SUCCESS,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  ADD_PROFILE_START,
  ADD_PROFILE_SUCCESS,
  ADD_PROFILE_FAILURE,
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  UPGRADE_TIER_START,
  UPGRADE_TIER_SUCCESS,
  UPGRADE_TIER_FAILURE,
  CREATE_TOKEN_SUCESS,
  SUBSCRIBE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_SUCCESS
} from './types';

import serverHandshake from '../auth/serverHandshake';

export const loginSuccess = loginData => ({
  type: LOGIN_SUCCESS,
  payload: loginData
});

export const fetchProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE_START });
  try {
    const success = await serverHandshake(true).get('/users/my_profile');
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error });
    return error;
  }
};

export const addProfile = profileData => async dispatch => {
  dispatch({ type: ADD_PROFILE_START });
  try {
    const success = await serverHandshake(true).post(`/users`, profileData);
    dispatch({ type: ADD_PROFILE_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: ADD_PROFILE_FAILURE, payload: error });
    return error;
  }
};

export const editProfile = profileData => async dispatch => {
  dispatch({ type: EDIT_PROFILE_START });
  try {
    const success = await serverHandshake(true).put(
      `/users/my_profile`,
      profileData
    );
    dispatch({ type: EDIT_PROFILE_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: EDIT_PROFILE_FAILURE, payload: error });
    return error;
  }
};

export const upgradeTier = (plan, name, token) => async dispatch => {
  dispatch({ type: UPGRADE_TIER_START });
  try {
    dispatch({ type: CREATE_TOKEN_SUCESS });

    //create stripe customer using above token as their payment source
    const customer = await serverHandshake(true).post('/billing/customer', {
      name,
      source: token.id //using the token returned above as their payment source
    });
    dispatch({ type: CREATE_CUSTOMER_SUCCESS });

    //Using backend api, Subscribe customer to one of our two paid plans (silver or gold)
    const subscribe = await serverHandshake(true).post('/billing/subscribe', {
      customer: customer.data.id, //using customer id returned above.
      plan //gold plan, silver plan: 'plan_Eyw8BcuV5qyAV2'
    });

    dispatch({
      type: SUBSCRIBE_CUSTOMER_SUCCESS
    });
    dispatch({
      type: UPGRADE_TIER_SUCCESS,
      payload: subscribe.data.plan.nickname
    });
    return { status: 200 };
  } catch (error) {
    dispatch({ type: UPGRADE_TIER_FAILURE });
    return { status: 402, error };
  }
};
