const achievementsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACHIEVEMENTS':
      return action.payload;
    default:
      return state;
  }
}

export default achievementsReducer;