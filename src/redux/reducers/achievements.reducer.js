import { combineReducers } from 'redux';

const allAchievementsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_ACHIEVEMENTS':
      return action.payload;
    default:
      return state;
  }
}

const userAchievementsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_ACHIEVEMENTS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  allAchievementsReducer,
  userAchievementsReducer,
});