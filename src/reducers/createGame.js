import {
  ADD_GAME_START,
  ADD_GAME_SUCCESS,
  CREATE_NEW_GAME_START,
  CREATE_NEW_GAME_SUCCESS,
  CREATE_ROUND_FOR_NEW_GAME_SUCCESS,
  UPDATE_GAME_DETAILS_SUCCESS,
  NEW_GAME_DELETE_ROUND_SUCCESS
} from '../actions/types';

import { combineReducers } from 'redux';

export default (state = null, action) => {
  switch (action.type) {
    case ADD_GAME_START:
      return null;
    case ADD_GAME_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};
// const allRoundIds = (state = [], action) => {
//   switch (action.type) {
//     case CREATE_NEW_GAME_START:
//       return [];
//     case CREATE_ROUND_FOR_NEW_GAME_SUCCESS:
//       return [...state, action.payload.id];
//     case NEW_GAME_DELETE_ROUND_SUCCESS:
//       const update = state.filter(item => item !== action.payload);
//       return update;
//     default:
//       return state;
//   }
// };

// const byRoundId = (state = {}, action) => {
//   switch (action.type) {
//     case CREATE_NEW_GAME_START:
//       return {};
//     case CREATE_ROUND_FOR_NEW_GAME_SUCCESS:
//       return { ...state, [action.payload.id]: action.payload };
//     case NEW_GAME_DELETE_ROUND_SUCCESS:
//       const { [action.payload]: removed, ...newState } = state;
//       return newState;
//     default:
//       return state;
//   }
// };
// const game = (state = {}, action) => {
//   switch (action.type) {
//     case CREATE_NEW_GAME_SUCCESS:
//       return action.payload;
//     case UPDATE_GAME_DETAILS_SUCCESS:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const createGame = combineReducers({
//   allRoundIds,
//   byRoundId,
//   game
// });

// export default createGame;
