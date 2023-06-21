const avatars = (state = [], action) => {
    switch (action.type) {
      case 'GET_AVATARS':
        return action.payload;
      default:
        return state;
    }
};

 
 
  export default avatars;