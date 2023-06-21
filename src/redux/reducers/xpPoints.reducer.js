const xpPointsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_TOTAL_XP_POINTS':
            return action.payload;
        default:
            return state;
    }
}

export default xpPointsReducer;