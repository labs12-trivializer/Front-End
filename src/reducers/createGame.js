// import { ACTIONS } from "../actions/types";

import { combineReducers } from "redux";

const allRoundIds = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const byRoundId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const game = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const createGame = combineReducers({
  allRoundIds,
  byRoundId,
  game
});

export default createGame;
