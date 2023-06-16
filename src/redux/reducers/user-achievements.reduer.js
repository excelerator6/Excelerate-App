const userAchievementsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_ACHIEVEMENTS':
      return action.payload;
    default:
      return state;
  }
}

export default userAchievementsReducer;