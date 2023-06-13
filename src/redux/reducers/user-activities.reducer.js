const userActivitiesReducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_USER_ACTIVITIES':
      return action.payload;
    default:
      return state;
  }
}

export default userActivitiesReducer;