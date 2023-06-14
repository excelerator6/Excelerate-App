const userActivitiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_ACTIVITIES':
      return action.payload;
    case 'SET_USER_ACTIVITY_LOG':
      return action.payload;
    default:
      return state;
  }
}

export default userActivitiesReducer;